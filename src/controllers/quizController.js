const {
  success,
  error
} =  require('../helpers/response.js')
const Quiz = require('../models/quiz.js')
const Question = require('../models/question.js')

exports.create = async (req, res) => {
  try {
    let quizParams = {
      name: req.body.name,
      owner: req.user._id
    }

    let result = await Quiz.create(quizParams)
    success(res, result, 201)
  }

  catch(err) {
    error(res, err, 422) 
  }
}

exports.findMyQuiz = async (req, res) => {
  let result = await Quiz
    .find({ owner: req.user._id })
    .select(["-__v", "-owner"])
  success(res, result, 200)
}

exports.findQuiz = async (req, res) => {
  try {
    let quiz = await Quiz
      .findById(req.params._id)
      .select(["-__v"])
      .populate({
        path: 'owner',
        select: ["-__v", "-encypted_password"]
      })

    let questions = await Question
      .find({ quiz: req.params._id })
      .select([
        "-answer",
        "-__v",
        "-quiz"
      ])


    success(res, {
      _id: quiz._id,
      name: quiz.name,
      owner: quiz.owner,
      questions
    }, 200)
  }

  catch(err) {
    error(res, err, 404)
  }
}

exports.answer = async (req, res) => {
  try {
    let questions = await Question
      .find({ quiz: req.body.quiz_id })
      .select(["_id", "answer"])

    let score = 0;

    questions.forEach(i => {
      let userAnswer = req.body.questions.find(question => question._id == i._id)
      console.log(userAnswer)
      let isAnswerCorrect = userAnswer.answer == i.answer
      if (isAnswerCorrect) return score += 10
    })

    success(res, {
      score,
      of: questions.length * 10 
    }, 200)
  }

  catch(err) {
    error(res, err, 422)
  }
}
