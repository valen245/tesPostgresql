const express = require('express')
const sequelize = require('./models/index');
const bcyrpt = require('bcryptjs');
const { error } = require('console');
const { json } = require('body-parser');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')


//inisiate use expree
const app = express()
const port = 3001
app.use(express.json())

//sinkronasi model dengan database
sequelize.sync()
  .then(() => console.log('Database & tables synced'))
  .catch(err => console.error('Sync error:', err))

//Auth
app.use('/auth', authRoutes)

//User
app.use('/user', userRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})