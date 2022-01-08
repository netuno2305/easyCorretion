const mongoose = require('../database/index')

const ConclusionStructuresSchema = new mongoose.Schema({
    agents: {
        type: Array,
        required: true,
    },
    completionconnectives: {
        type: Array,
        required: true,
    },
    closingsentences: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("ConclusionStructures", ConclusionStructuresSchema)