const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const quizSchema = new Schema({
  name: {
    type: 'string',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Quiz', quizSchema)
