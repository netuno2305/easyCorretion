const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authconfig = require('../config/auth.json')

const User = require('../models/user')

const router = express.Router()

function generateToken(config){
    const payload = {id: config.id}
    return jwt.sign(payload, authconfig.secret, {
        expiresIn: 86400
    })
}

router.post('/register', async (request, response) => {
    const { email } = request.body
    try {
        if(await User.findOne({ email })){
            return response.status(400).send({error: 'USER_ALREDY_EXISTS'})
        }
        const user = await User.create(request.body)

        user.password = undefined

        return response.send({
            user,
            token: generateToken ({ id: user.id })
        })
    } catch (err) {
        return response.status(400).send({ error: 'REGISTRATION_FAILED' })
    }
})

router.post('/authenticate', async (request, response) => {
    const { email, password } = request.body

    const user = await User.findOne({ email }).select("+password")

    if(!user){
        return response.status(400).send({error: "USER_NOT_FOUND"})
    }

    if(!await bcrypt.compare(password, user.password)) {
        return response.status(400).send({error: "INVALID_PASSWORD"})
    }

    user.password = undefined

    response.send({
        user,
        token: generateToken ({ id: user.id })
    })
})

module.exports = app => app.use('/auth', router)