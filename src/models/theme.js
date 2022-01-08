const mongoose = require('../database/index')

const ThemeSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true,
    },
    keywords: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Theme", ThemeSchema)