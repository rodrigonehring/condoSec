const mongoose = require('mongoose')

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

module.exports = building
