const bcyrpt = require('bcryptjs')
const User = require('../models/users')


const getUser = async(req,res) =>{
  try {
    const users = await User.findAll()
    res.status(200).json({
      status : 'succes get all user',
      length : users.length,
      data : users
  })
  } catch (error) {
    res.status(500).json({message:'Eror fetching data'})
  }
}

const regisUser = async(req,res) =>{
    try {
        const {username, email, password, isadmin} = req.body
        const hashedPassword = await bcyrpt.hash(password, 10)
        const checkUsername = await User.findOne({where :{email}})
        //check email
        if(checkUsername) return res.status(401).json({w : 'Email sudah terdaftar'})

        const newUser = await User.create({username, email, password : hashedPassword, isadmin}) 
        res.json({message: 'User registered', username : username})
    } catch (err) {
        res.status(500).json({message : err.message})
        console.log()
    }
}

const updateUser =  async(req, res) => {
    try {
      const {username, email} = req.body
      const user = await User.findByPk(req.params.id)
      console.log(user)
      if(!user)return res.status(401).json({message : 'User not found'})

      const checkUsername = await User.findOne({where :{email}})
        //check email
      if(checkUsername) return res.status(401).json({message : 'Email sudah terdaftar'})
    
      user.username = username || user.username
      user.email = email || user.email
      await user.save()

      res.status(200).json({message : 'Update Successfully' ,user})
    } catch (error) {
      res.status(400).json({message : 'Invalid Token'})
    }  
}

const deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) return res.status(404).json({ message: 'User not found' })
  
      await user.destroy()
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
  

module.exports = {regisUser, updateUser, deleteUser, getUser}