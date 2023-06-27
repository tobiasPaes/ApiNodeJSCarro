const express = require('express')
// const cors = require('cors')
const {Pool} = require('pg')
// const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3333

// const pool = new Pool({
//     database: process.env.POSTGRES_DATABASE,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     port: process.env.POSTGRES_PORT,
//     host: process.env.POSTGRES_HOST
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

app.get('/listarCarros', async (req, res) => {
    
    const carro = await sql`select * from carro`
    return res.status(200).send(carro)
    // s console.log(carro)
})

app.post('/inserirCarro', async (req, res) => {
    const {marca, modelo} = req.body
    await sql`insert into carro (marca, modelo) values (${marca}, ${modelo})`
    return res.status(201).send('criado')
})

app.delete('/deletarCarro/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    await sql`delete from carro where id = ${carro_id}`
    return res.status(200).send('deletado')
})
    
app.get('/buscarCarro/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    const carro = await sql`select * from carro where id = ${carro_id}`
    return res.status(200).send(carro)
})


app.patch('/MudarCarro/:carro_id', async (req, res) => {
    const {carro_id} = req.params
    const carro = req.body
    await sql`update carro set marca = ${carro.marca}, modelo = ${carro.modelo} where id = ${carro_id}`
    const car = await sql`select * from carro where id = ${carro_id}`
    return res.status(200).send(car)
})


app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))

