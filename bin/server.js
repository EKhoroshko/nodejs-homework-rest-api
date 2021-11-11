const mongoose = require('mongoose')
const app = require('../app')
require('dotenv').config()

const { PORT = 3000, DB_HOST } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(console.log('Database connection successful'))
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
