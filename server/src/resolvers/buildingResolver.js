const mongoose = require('mongoose')
const ValidationError = require('../utils/ValidationError')

const resolver = {
  Query: {
    async building(_, { id }, { models: { buildingModel } }) {
      console.log('get building', id)
      const building = await buildingModel
        .findById({ _id: id })
        .populate({
          path: 'mainResident',
          model: 'Resident'
        })
        .exec()

      return building
    },

    async buildings(_, { id }, { models: { buildingModel } }) {
      const buldings = await buildingModel
        .find()
        .populate({
          path: 'mainResident',
          model: 'Resident'
        })
        .exec()

      return buldings
    }
  },

  Mutation: {
    async createBuilding(_, { name, number, block }, { models: { buildingModel } }) {
      const { value, error } = buildingModel.validate({ name, number, block })

      console.log('validate', error)

      if (error) {
        throw new ValidationError(error.details, true)
      }

      const building = await buildingModel.create(value)

      return building
    },

    async updateBuilding(_, { id, name, number, block }, { models: { buildingModel } }) {
      const building = await buildingModel.findById({ _id: id }).exec()

      if (!building) {
        throw new Error('Building not found')
      }

      const { value, error } = buildingModel.validate({ name, number, block })

      console.log('validate', error)

      if (error) {
        throw new ValidationError(error.details, true)
      }

      await buildingModel.updateOne({ _id: id }, { $set: value })

      return buildingModel
        .findById({ _id: id })
        .populate({
          path: 'mainResident',
          model: 'Resident'
        })
        .exec()
    },

    async setMainResident(_, { id, resident }, { models: { buildingModel } }) {
      await buildingModel.updateOne(
        { _id: id },
        { $set: { mainResident: mongoose.Types.ObjectId(resident) } }
      )

      console.log('setMainResident', id, resident)
      return { id, resident }
    }
  }
}

module.exports = resolver
