const bcrypt = require('bcrypt')
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
    required: true,
    unique: true
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
  const hashedPassword = bcrypt.hashSync(this.password, 12)
  this.password = hashedPassword
})

const user = mongoose.model('user', userSchema)

user.validate = (values) => {
  return schema.validate(values)
}

module.exports = user
