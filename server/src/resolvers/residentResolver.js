const resolver = {
  Query: {
    async resident(_, { id }, { models: { residentModel } }) {
      const building = await residentModel.findById({ _id: id }).exec()

      return building
    },

    async residents(_, _2, { models: { residentModel } }) {
      const buldings = await residentModel.find().exec()

      return buldings
    }
  },
  Mutation: {
    async createResident(
      _,
      { name, birthDate, phoneNumber, email, cpf },
      { models: { residentModel } }
    ) {
      const building = await residentModel.create({ name, birthDate, phoneNumber, email, cpf })

      return building
    }
  }
}

module.exports = resolver
