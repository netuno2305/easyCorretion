const grammarService = require("./grammarService")
const formatService = require("./formatRedactionService")
const coherenceService = require("./coherenceService")
const connectiveService = require("./connectiveService")
const conclusionService = require("./conclusionService")
const Redaction = require('../models/redaction')
const User = require('../models/user')
const webhooks = require('node-webhooks')


const registerHooks = () => {
    return new webhooks({
        db: {
            'callback_hook': ['https://api.painel.zapfacil.com/api/webhooks/c21d7d86f4814965be6bf6b30af7b060']
        }
    });
}

module.exports = async (id) => {
    
    const { text, theme, userId } = await Redaction.findById(id , ["text","theme", "userId"])
    const { name, email, phone } = await User.findById(userId, ["name", "email", "phone"])

    try {

        const grammarResult = await grammarService(text)
        const formatResult = formatService(text)
        const coherenceResult = await coherenceService(text, theme, formatResult)
        const connectiveResult = await connectiveService(text, formatResult)
        const conclusionResult = await conclusionService(formatResult)
        
        const pontuation = {
            competence1: grammarResult,
            competence2: coherenceResult,
            competence3: ( coherenceResult + connectiveResult)/2,
            competence4: connectiveResult,
            competence5: conclusionResult,
            total: grammarResult + coherenceResult + ( coherenceResult + connectiveResult)/2 + connectiveResult + conclusionResult
        }
        
        const hooks = registerHooks()
        hooks.trigger('callback_hook', { name, email, phone, redactionScore: pontuation})
        await Redaction.findByIdAndUpdate(id, {pontuation})
    } catch(err) {
        console.log(err)
        return "ERROR_IN_GENERATE_PONTUATION"
    }
}