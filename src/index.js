const express = require('express')
const morgan = require('morgan')
const port = process.env.PORT || 8000 
const app = express()
require('dotenv').config()

/* Initialize Mongoose Connection */
require('./database.js')
const {
  notFound,
  serverError
} = require('./exceptionHandler.js')

/* Express Middleware */
app.use(express.json())
app.use(
  express.urlencoded({ extended: false })
)

/* Use Logger */
app.use(morgan('tiny'))

const router = require('./router.js')
app.use('/api/v1', router)
/* Root Endpoint */
app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    data: 'Welcome to API'
  })
})

/* Exception Handler */
app.use(serverError)
app.use(notFound)

/* Fire up server */
app.listen(port, () => {
  console.log(`Server started at ${Date()}`)
  console.log(`Listening on port ${port}!`)
})
