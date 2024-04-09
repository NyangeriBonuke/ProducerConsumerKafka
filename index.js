const express = require('express')
const app = express()
const KafkaController = require('./controller')

app.use(express.json())

app.post('/api/send', KafkaController.sendMessageToKafka())

app.listen('8000', () => {
    console.log('Listening on port 8000')
})