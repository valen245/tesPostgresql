const {LoginUser} = require('../controllers/authController')
const express = require('express')
const router = express.Router()

//Route Login
router.post('/login', LoginUser)

module.exports = router