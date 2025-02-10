const Sequelize = require('sequelize');
const dotenv = require('dotenv')

//inisiate file .env
dotenv.config()

//koneksi database
const sequelize = new Sequelize(process.env.DB_URI, {
    dialect: 'postgres',
    logging: false,
  })

//cek database 
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err))

  module.exports = sequelize