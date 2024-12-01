const { login, getUser, logout } = require('../controllers/auth_controller')
const check_token = require('../middleware/check_token')

const Router = require('express').Router

const authRouter = Router()

authRouter.post('/login', login)
authRouter.get('/get-user', check_token, getUser)
authRouter.get('/logout', logout)

module.exports = authRouter