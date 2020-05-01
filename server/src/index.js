const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')

const schemas = require('./schemas')
const resolvers = require('./resolvers')

const userModel = require('./models/userModel')
const buildingModel = require('./models/buildingModel')
const residentModel = require('./models/residentModel')

const app = express()
app.use(cors())

const getUser = async (req) => {
  const token = req.headers['token']

  if (token) {
    try {
      return await jwt.verify(token, 'SUPER_SECRET_KEY✌')
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req)

      return {
        me,
        models: {
          userModel,
          buildingModel,
          residentModel
        }
      }
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen(5000, () => {
  mongoose.connect('mongodb://localhost:27017/condoSec', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })

  console.log('\n\n🚀 Server running on https://localhost:5000 🚀\n\n')
})
