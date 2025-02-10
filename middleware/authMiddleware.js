const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

//ambil file .env
dotenv.config()

//middleware untuk authenthikasi token
const authentikasiToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({message :'Acces Denied'})

    try {
        const conto = token.split(' ')[1]
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified
        next()
      } catch (error) {
        res.status(400).json({ message: 'Invalid token' })
      }
}

//middleware untuk admin
const isadmin = (req, res, next) =>{
  if (req.user.isadmin !== "Y") {
    return res.status(403).json({message : "Akses ditolak, hanya untuk admin"})
    console.log(req.user.isadmin)
  }
  next()
}

module.exports = {authentikasiToken, isadmin}