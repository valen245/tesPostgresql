const bcyrpt = require('bcryptjs')
const { json } = require('body-parser')
const User = require('../models/users')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const { isadmin } = require('../middleware/authMiddleware')
const response = require("../response")

dotenv.config()


//login
const LoginUser = async(req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({where : {email}})
        if (!user) return res.status(400).json({message : 'User not found'})

        const validPassword = await bcyrpt.compare(password, user.password)
        if (!validPassword) return res.status(400).json({message : 'Email and password not match'})

        const token = jwt.sign({ id: user.id, username: user.username, isadmin: user.isadmin } ,process.env.JWT_SECRET, { expiresIn: '1h' })
        response(200, 'login succesfull', token, res)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}

module.exports = {LoginUser}