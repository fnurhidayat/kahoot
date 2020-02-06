const mongoose = require('mongoose')

const dbConnectionString = {
  development: 'mongodb://localhost/quiz-lagi_development',
  test: 'mongodb://localhost/quiz-lagi_test',
  staging: process.env.DB_CONNECTION,
  production: process.env.DB_CONNECTION
}

mongoose.connect(
  dbConnectionString[process.env.NODE_ENV || 'development'],
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
)
  .then(() => {
    console.log(`Database Connected`)
  })
  .catch(() => {
    process.exit(1)
  })
