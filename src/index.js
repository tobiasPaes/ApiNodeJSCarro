const express = require('express')
// const cors = require('cors')
const {Pool} = require('pg')
// const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3333

// const pool = new Pool({
<<<<<<< HEAD
//     database: process.env.POSTGRES_DATABASE,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     port: process.env.POSTGRES_PORT,
//     host: process.env.POSTGRES_HOST
=======
  
//     database: process.env.POSTGRES_DATABASE,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     port: process.env.POSTGRES_PORT
>>>>>>> 0576f1da03c85c593ee66afd55ec7624be375e0b
// })

const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

async function getPgVersion() {
  const result = await sql`select version()`;
//   console.log(result);
}

getPgVersion();

const app = express()

app.use(express.json())



// app.use(cors())

<<<<<<< HEAD
app.get('/listarCarros', async (req, res) => {
    
    const carro = await sql`select * from carro`
    return res.status(200).send(carro)
    // s console.log(carro)
=======
app.get('/carros', async (req, res) => {
    const carro = await sql`select * from carro`
    return res.status(200).send(carro)
  // try{
    //     const { rows } = await pool.query('SELECT * from carro')
    //     return res.status(200).send(rows)
    // }catch(err){
    //     return res.status(400).send(err)
    // }
>>>>>>> 0576f1da03c85c593ee66afd55ec7624be375e0b
})

app.post('/inserirCarro', async (req, res) => {
    const {marca, modelo} = req.body
    await sql`insert into carro (marca, modelo) values (${marca}, ${modelo})`
    return res.status(201).send('criado')
})

app.delete('/deletarCarro/:carro_id', async (req, res) => {
    const {carro_id} = req.params
<<<<<<< HEAD
    await sql`delete from carro where id = ${carro_id}`
    return res.status(200).send('deletado')
})
    
app.get('/buscarCarro/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    const carro = await sql`select * from carro where id = ${carro_id}`
    return res.status(200).send(carro)
})

=======
    const carro = await sql`select * from carro where id = ${carro_id}`
    return res.status(200).send(carro)
    // try{
    //     const carro = await pool.query('SELECT * from carro where id = $1', [carro_id])
    //     return res.status(200).send(carro.rows)
    // }catch(err){
    //     console.log(err)
    //     return res.status(400).send(err)
    // }
})

app.post('/carros', async (req, res) => {
    const {modelo, marca} = req.body
    await sql`insert into carro (marca, modelo) values (${marca}, ${modelo})`
    return res.status(201).send('criado')
    // let car = ''    
    // try {
    //     car = await pool.query('SELECT * from carro where marca = $1 and modelo = $2', [marca, modelo])
    //     if (!car.rows[0]) {
    //         car = await pool.query('INSERT INTO carro (marca, modelo) VALUES ($1, $2) returning *', [marca, modelo])
    //     }
    //     return res.status(201).send(car.rows)
    // } catch (err) {
    //     console.log(err)
    //     return res.status(400).send(err)
    // }
})
>>>>>>> 0576f1da03c85c593ee66afd55ec7624be375e0b

app.patch('/MudarCarro/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    const carro = req.body
    await sql`update carro set marca = ${carro.marca}, modelo = ${carro.modelo} where id = ${carro_id}`
    const car = await sql`select * from carro where id = ${carro_id}`
    return res.status(200).send(car)
<<<<<<< HEAD
})


app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))

=======
    // try {
    //     const att = await pool.query('update carro set marca = $1, modelo = $2 where id = $3 returning *', [carro.marca, carro.modelo, carro_id])
    //     return res.status(200).send(att.rows)
    // } catch (err) {
    //     return res.status(400).send(err)
    // }
})

app.delete('/carros/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    await sql`delete from carro where id = ${carro_id}`
    return res.status(200).send('deletado')
    // try {
    //     const deletar = await pool.query('delete from carro where id = $1', [carro_id])
    //     return res.status(200).send(deletar)
    // } catch (err) {
    //     return res.status(400).send(err)
    // }
})

app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))
>>>>>>> 0576f1da03c85c593ee66afd55ec7624be375e0b
