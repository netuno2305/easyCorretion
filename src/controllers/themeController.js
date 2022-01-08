const express = require('express')
const router = express.Router()
const app = express()
const themeService = require("../services/themeService")

module.exports = app => app.use('/theme', router)

router.get("/", themeService.list)
