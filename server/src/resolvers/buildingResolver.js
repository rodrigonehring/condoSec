const ValidationError = require('../utils/ValidationError')

const resolver = {
  Query: {
    async building(_, { id }, { models: { buildingModel } }) {
      const building = await buildingModel.findById({ _id: id }).exec()

      return building
    },

    async buildings(_, { id }, { models: { buildingModel } }) {
      const buldings = await buildingModel.find().exec()

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

      return buildingModel.findById({ _id: id }).exec()
    }
  }
}

module.exports = resolver
