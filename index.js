const PORT = 8000
const axios = require('axios')
const { response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

require('dotenv').config()

app.use(express.json())

const url = process.env.URL

app.get('/', (req,res) => {
    res.json('this is backend')
})

// get all the scores
app.get('/scores' , (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            Accepts: 'applications/json',
            'X-Cassandra-Token': process.env.ASTRA_TOKEN
        }
    }
    axios(`${url}?page-size=20`, options)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({message: err}))
})

app.post('/addscore', (req, res) => {

    const testData= {
        username: 'bob',
        score: 3
    }

    const options = {
        method: "POST",
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': process.env.ASTRA_TOKEN,
            'Content-Type': 'application/json'
        },
        data: testData
    }
    axios(url, options)
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({message: err}))
})

app.listen(PORT, () => console.log(`server runn on ${PORT}`))


