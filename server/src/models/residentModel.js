const mongoose = require('mongoose')

const buildingModel = new mongoose.Schema({
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

  liveIn: mongoose.Schema.Types.ObjectId
})

const building = mongoose.model('Resident', buildingModel)

module.exports = building
