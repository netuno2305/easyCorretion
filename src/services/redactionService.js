const Redaction = require('../models/redaction')
const Theme = require('../models/theme')

exports.create = async (request, response) => {
    try{

        const {theme, text} = request.body
        const {userId} = request

        let checksThemeExists = await Theme.findOne({theme: theme}, ["theme"] )
        if(checksThemeExists === null) {
            return response.status(400).send({error: 'Theme not exists'})
        }
    
        var composing = {
            theme,
            text,
            userId,
            pontuation: {}
        }

        const redaction = await Redaction.create(composing)
        return response.status(201).send({redaction})
    }
    catch (err) {
        return response.status(400).send({error: 'Sending failed'})
    }
}

exports.list = async (request, response) => {
    const { userId } = request
    const redactions = await Redaction.find({userId},["id", "theme", "createdAt", "pontuation"])
    return  response.status(200).send({redactions})
}

exports.find = async (request, response) => {
    const { userId } = request
    const redactionId = request.params.id
    const redaction = await Redaction.findOne({_id: redactionId})
    return response.status(200).send({redaction})
}