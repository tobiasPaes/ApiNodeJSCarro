const express = require('express')
// const cors = require('cors')
const {Pool} = require('pg')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3333

const pool = new Pool({
  
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})

const app = express()

app.use(express.json())

// app.use(cors())

app.get('/', (req, res) => {console.log('ola mundo')})

app.get('/carros', async (req, res) => {
    try{
        const { rows } = await pool.query('SELECT * from carro')
        return res.status(200).send(rows)
    }catch(err){
        return res.status(400).send(err)
    }
})

app.get('/carros/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    try{
        const carro = await pool.query('SELECT * from carro where id = $1', [carro_id])
        return res.status(200).send(carro.rows)
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})

app.post('/carros', async (req, res) => {
    const {modelo, marca} = req.body
    let car = ''
    try {
        car = await pool.query('SELECT * from carro where marca = $1 and modelo = $2', [marca, modelo])
        if (!car.rows[0]) {
            car = await pool.query('INSERT INTO carro (marca, modelo) VALUES ($1, $2) returning *', [marca, modelo])
        }
        return res.status(201).send(car.rows)
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
})

app.patch('/carros/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    const carro = req.body
    try {
        const att = await pool.query('update carro set marca = $1, modelo = $2 where id = $3 returning *', [carro.marca, carro.modelo, carro_id])
        return res.status(200).send(att.rows)
    } catch (err) {
        return res.status(400).send(err)
    }
})

app.delete('/carros/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    try {
        const deletar = await pool.query('delete from carro where id = $1', [carro_id])
        return res.status(200).send(deletar)
    } catch (err) {
        return res.status(400).send(err)
    }
})

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))