const Theme = require('../models/theme')

exports.list = async (request, response) => {
    const themes = await Theme.find({},["theme"])
    return  response.status(200).send({themes})
}