const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@easycorreting.cvy43.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.Promise = global.Promise;

module.exports = mongoose;