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
      const building = await buildingModel.create({ name, number, block })

      return building
    }
  }
}

module.exports = resolver
