const { request, response } = require('express')
const express = require('express')

const app = express()
app.use(express.json())

require('./controllers/redactionController')(app)
app.listen(3333)
require('./controllers/authControllers')(app)
require('./controllers/projectController')(app)

require("./database/index")