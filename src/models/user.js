const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: 'string',
    required: true,
    unique:true
  },
  encrypted_password: {
    type: 'string',
    required: true
  }
})

class User extends mongoose.model('User', userSchema) {

  static register({ email, password, password_confirmation }) {
    return new Promise((resolve, reject) => {
      if (password !== password_confirmation) return reject('Password doesn\'t match')

      let encrypted_password = bcrypt.hashSync(password, 10)

      this.create({
        email, encrypted_password
      })
        .then(data => {
          let token = jwt.sign({
            _id: data._id,
          }, process.env.JWT_SIGNATURE_KEY)
          resolve({
            _id: data._id,
            email: data.email,
            token
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  static authenticate({ email, password }) {
    return new Promise((resolve, reject) => {
      this.findOne({ email })
        .then(data => {
          if (!data) return reject('Email doesn\'t exist')

          let isPasswordValid = bcrypt.compareSync(password, data.encrypted_password)
          if (!isPasswordValid) return reject('Wrong password')

          let token = jwt.sign({ _id: data._id }, process.env.JWT_SIGNATURE_KEY)
          resolve({
            _id: data._id,
            email: data.email,
            token
          })
        }) 
    })
  }

  static me(_id) {
    return new Promise((resolve, reject) => {
      this
        .findById(_id)
        .select('-encrypted_password')
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
      })
  }
}

module.exports = User

