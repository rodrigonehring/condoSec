const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

module.exports = {
  Query: {
    async users(parent, _, { models: { userModel }, me }, info) {
      const users = await userModel.find().exec()
      console.log('users', users)
      return users || []
    },

    user: async (_, { id }, { models: { userModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated')
      }
      const user = await userModel.findById({ _id: id }).exec()
      return user
    },
    login: async (_, { name, password }, { models: { userModel } }, info) => {
      const user = await userModel.findOne({ name }).exec()

      if (!user) {
        throw new AuthenticationError('Invalid credentials')
      }

      const matchPasswords = bcrypt.compareSync(password, user.password)

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials')
      }

      const token = jwt.sign({ id: user.id }, 'SUPER_SECRET_KEY✌', { expiresIn: 24 * 10 * 50 })

      return {
        token
      }
    }
  },
  Mutation: {
    createUser: async (_, { name, password }, { models: { userModel } }, info) => {
      const user = await userModel.create({ name, password })
      return user
    }

    // deleteUser: async (parent, { name, password }, { models: { userModel } }, info) => {
    //   const user = await userModel.create({ name, password })
    //   return user
    // }
  }
  // User: {
  //   posts: async ({ id }, args, { models: { postModel } }, info) => {
  //     const posts = await postModel.find({ author: id }).exec()
  //     return posts
  //   }
  // }
}
