const mongoose = require('mongoose')
const ValidationError = require('../utils/ValidationError')

const resolver = {
  Query: {
    async resident(_, { id }, { models: { residentModel } }) {
      const resident = await residentModel
        .findById({ _id: id })
        .populate({
          path: 'liveIn',
          model: 'Building'
        })
        .exec()

      return resident
    },

    async residents(_, { liveIn }, { models: { residentModel } }) {
      const residents = await residentModel
        .find({ liveIn })
        .populate({
          path: 'liveIn',
          model: 'Building'
        })
        .exec()

      return residents
    }
  },
  Mutation: {
    async createResident(
      _,
      { name, birthDate, phoneNumber, email, cpf, liveIn },
      { models: { residentModel } }
    ) {
      const exist = await residentModel.findOne({ cpf }).exec()

      if (exist) {
        throw new ValidationError([{ key: 'cpf', message: 'A user with this cpf already exists.' }])
      }

      const { value, error } = residentModel.validate({
        name,
        birthDate,
        phoneNumber,
        email,
        cpf,
        liveIn
      })

      console.log('value', value)
      console.log('validate', error)

      if (error) {
        throw new ValidationError(error.details, true)
      }

      const resdient = await residentModel.create({
        ...value,
        liveIn: mongoose.Types.ObjectId(value.liveIn)
      })

      return resdient
    },

    async deleteResident(_, { id }, { models: { residentModel } }) {
      console.log('delete resident', id)

      const response = await residentModel.findByIdAndDelete(id).exec()

      console.log('re', response)

      return { id }
    }
  }
}

module.exports = resolver
