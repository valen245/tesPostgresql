const express = require('express')
const {regisUser, updateUser, deleteUser, getUser} = require('../controllers/userControllers')
const {authentikasiToken, isadmin} = require('../middleware/authMiddleware')
const router = express.Router()

//routes regis
router.post('/register', regisUser)

//routes Update
router.put('/updateUser/:id', authentikasiToken, updateUser)

//routes delete
router.delete('/deleteUser/:id', authentikasiToken, deleteUser)

//routes getAll User
router.get('/getAllUser', authentikasiToken, isadmin, getUser)

module.exports = router