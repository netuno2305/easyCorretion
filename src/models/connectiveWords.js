const mongoose = require('../database/index')

const ConnectiveWordsSchema = new mongoose.Schema({
    words: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("connectiveWords", ConnectiveWordsSchema)