const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const schema = Joi.object()
  .options({ abortEarly: false, stripUnknown: true })
  .keys({
    name: Joi.string().min(3).max(30).required(),
    number: Joi.string().required().min(1).max(10),
    block: Joi.string().required().min(1).max(30),

    mainResident: Joi.string().allow(null),
    residents: Joi.array().allow(null)
  })

const buildingModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  number: {
    type: String,
    required: true
  },

  block: {
    type: String,
    required: true
  },

  residentCount: Number,

  mainResident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident'
  },

  residents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resident'
    }
  ]
})

const building = mongoose.model('Building', buildingModel)

building.validate = (values) => {
  return schema.validate(values)
}

module.exports = building
