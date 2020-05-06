const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')
const ValidationError = require('../utils/ValidationError')

module.exports = {
  Query: {
    async users(parent, _, { models: { userModel }, me }, info) {
      const users = await userModel.find().exec()
      return users || []
    },

    async user(_, { id }, { models: { userModel }, me }) {
      if (!me) {
        throw new AuthenticationError('You are not authenticated')
      }
      const user = await userModel.findById({ _id: id }).exec()
      return user
    }
  },

  Mutation: {
    async createUser(_, { name, password, username }, { models: { userModel } }) {
      console.log('createUser', name, username)
      const exist = await userModel.findOne({ username }).exec()

      if (exist) {
        throw new ValidationError([
          { key: 'username', message: 'A user with this username already exists.' }
        ])
      }

      const { value, error } = userModel.validate({ name, password, username })

      if (error) {
        throw new ValidationError(error.details, true)
      }

      const user = await userModel.create(value).catch(console.error)

      return user
    },
    async login(_, { username, password }, { models: { userModel } }) {
      const user = await userModel.findOne({ username }).exec()

      if (!user) {
        throw new AuthenticationError('Invalid credentials')
      }

      const matchPasswords = bcrypt.compareSync(password, user.password)

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials')
      }

      const token = jwt.sign({ id: user.id }, 'SUPER_SECRET_KEY✌', { expiresIn: 24 * 10 * 50 })

      return {
        name: user.name,
        username: user.username,
        token
      }
    }
  }
}
