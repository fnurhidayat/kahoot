const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  question: {
    type: 'string',
    required: true
  },
  options: {
    "A": {
      type: 'string',
      required: true
    },
    "B": {
      type: 'string',
      required: true
    },
    "C": {
      type: 'string',
      required: true
    },
    "D": {
      type: 'string',
      required: true
    }
  },
  answer: {
    type: "string",
    enum: ["A", "B", "C", "D"],
    required: true
  }
})

class Question extends mongoose.model('Question', questionSchema) {
  /*
   * Ask this params from controller or whoever call me
   * quiz_id: ObjectID
   * question: string
   * answer: string
   * option: {
   *  A: string,
   *  B: string,
   *  C: string,
   *  D: string
   * }
   *
   * */
  static new({ quiz_id, question, options, answer}) {
    return new Promise((resolve, reject) => {
      this.create({
        quiz: quiz_id,
        question,
        answer,
        options
      }) 
        .then(data => {
          resolve(data) 
        })
        .catch(err => {
          reject(err)
        })  
    })
  }
}

module.exports = Question
