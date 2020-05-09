const mongoose = require('mongoose')
const ValidationError = require('../utils/ValidationError')

function parseResident(item) {
  item._doc.birthdate = item._doc.birthdate.toISOString()
  return item
}

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

      return parseResident(resident)
    },

    async residents(_, { liveIn, q }, { models: { residentModel } }) {
      console.log('get residents', q)

      let query

      if (liveIn) {
        query = { liveIn }
      }

      if (q) {
        const reg = new RegExp(q, 'i')
        query = { $or: [{ name: reg }, { cpf: reg }, { email: reg }] }
      }

      const residents = await residentModel
        .find(query)
        .populate({
          path: 'liveIn',
          model: 'Building'
        })
        .exec()

      return residents.map(parseResident)
    }
  },
  Mutation: {
    async createResident(
      _,
      { name, birthdate, phoneNumber, email, cpf, liveIn },
      { models: { residentModel, buildingModel } }
    ) {
      const exist = await residentModel.findOne({ cpf }).exec()

      if (exist) {
        throw new ValidationError([{ key: 'cpf', message: 'A user with this cpf already exists.' }])
      }

      const { value, error } = residentModel.validate({
        name,
        birthdate,
        phoneNumber,
        email,
        cpf
      })

      console.log('value', value)
      console.log('validate', error)

      if (error) {
        throw new ValidationError(error.details, true)
      }

      const resdient = await residentModel.create({
        ...value,
        liveIn: mongoose.Types.ObjectId(liveIn)
      })

      await buildingModel.updateOne({ _id: liveIn }, { $inc: { residentCount: 1 } })

      return resdient
    },

    async updateResident(
      _,
      { id, name, birthdate, phoneNumber, email, cpf, liveIn },
      { models: { residentModel } }
    ) {
      const { value, error } = residentModel.validate({
        name,
        birthdate,
        phoneNumber,
        email,
        cpf
      })

      if (error) {
        throw new ValidationError(error.details, true)
      }

      await residentModel.updateOne({ _id: id }, { $set: value })

      return residentModel
        .findById({ _id: id })
        .populate({
          path: 'liveIn',
          model: 'Building'
        })
        .exec()
    },

    async deleteResident(_, { id }, { models: { residentModel, buildingModel } }) {
      const resident = await residentModel.findById({ _id: id }).exec()

      console.log('delete resident', id, resident)

      // @todo: ao deletar, verificar se é mainResident e atualizar o building
      const response = await residentModel.findByIdAndDelete(id).exec()

      await buildingModel.updateOne({ _id: resident.liveIn }, { $inc: { residentCount: -1 } })

      return { id }
    }
  }
}

module.exports = resolver
