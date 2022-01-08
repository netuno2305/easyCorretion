const express = require('express')
const router = express.Router()
const app = express()
const authMiddleware = require('../middlewares/auth')
const redactionService = require("../services/redactionService")
const themeService = require("../services/themeService")

module.exports = app => app.use('/redaction', router)

router.post("/send", authMiddleware, redactionService.create)

router.post("/process/:id", async (request,response) => {
    
    const result = await require("../services/mainService")(request.params.id)
    
    response.status(200).send(result)
})

router.get("/", authMiddleware, redactionService.list)

router.get("/:id", authMiddleware, redactionService.find)


