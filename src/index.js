const { request, response } = require('express')
const express = require('express')

const app = express()
app.use(express.json())

require('./controllers/redactionController')(app)
require('./controllers/themeController')(app)
require('./controllers/authControllers')(app)
require("./database/index")

app.listen(3333)