const mongoose = require('../database/index')

const RedactionSchema = new mongoose.Schema({
    theme:{
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    pontuation: {
        type: Object,
        required: false,
    },
    cratedAt:{
        type: Date,
        default: Date.now,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Redaction',RedactionSchema)