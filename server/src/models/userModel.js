const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const schema = Joi.object()
  .options({ abortEarly: false, stripUnknown: true })
  .keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().required().min(3).max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
    // unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function () {
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

const user = mongoose.model('User', userSchema)

user.validate = (values) => {
  return schema.validate(values)
}

module.exports = user
