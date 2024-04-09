const KafkaConfig = require('./config')

class KafkaController {
    async sendMessageToKafka(req, res){
        try{
            const {message} = req.body
            const messages = [{key: "key1", value: message}]
            KafkaConfig.produce("my-topic", messages)
            res.status(200).json({
                status: "ok",
                message: "Message succesfully sent"
            })
        }
        catch(error){
            console.log(error)
        }
    }

    async getMessageFromKafka(req, res){
        try{
            KafkaConfig.consume('my-topic', (err, value) => {
                if(err){
                    res.status(500).json({error: "Internal Server Error"})
                    return
                }
                res.status(200).json(value)
            })
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = new KafkaController