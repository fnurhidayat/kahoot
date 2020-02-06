const User = require('../models/user.js')
const {
  success,
  error
} = require('../helpers/response.js')

exports.create = async (req, res) => {
  try {
    let result = await User.register(req.body)
    success(res, result, 201)
  }

  catch(err) {
    error(res, err, 422)
  }
}

exports.login = async (req, res) => {
  try {
    let result = await User.authenticate(req.body)
    success(res, result, 200)
  }

  catch(err) {
    error(res, err, 401)
  }
}

exports.currentUser = async (req, res) => {
  let result = await User.me(req.user._id)
  success(res, result, 200)
}
