const mongoose = require('mongoose')

const Joi = require('@hapi/joi')

const schema = Joi.object()
  .options({ abortEarly: false, stripUnknown: true })
  .keys({
    name: Joi.string().min(3).max(30).required(),
    birthDate: Joi.string(),
    phoneNumber: Joi.string().required(),
    cpf: Joi.string().required(),
    email: Joi.string().required().email(),
    liveIn: Joi.string().required()
  })

const residentModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  birthDate: {
    type: Date,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true
  },

  cpf: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true
  },

  liveIn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Building'
  }
})

const resident = mongoose.model('Resident', residentModel)

resident.validate = (values) => {
  return schema.validate(values)
}

module.exports = resident
