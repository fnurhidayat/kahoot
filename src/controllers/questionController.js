const Question = require('../models/question.js')
const {
  success,
  error
} = require('../helpers/response.js')

exports.create = async (req, res) => {
  try {
    let result = await Question.new(req.body) 
    success(res, result, 200)
  }

  catch(err) {
    error(res, err, 422)
  } 
}
