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
      return jwt.verify(token, 'SUPER_SECRET_KEY✌')
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  formatError: (error) => ({
    message: error.message,
    state: error.originalError && error.originalError.state,
    locations: error.locations,
    path: error.path
  }),
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

server.applyMiddleware({
  app,
  path: '/graphql'
})

app.listen(5000, () => {
  mongoose.set('debug', true)

  mongoose
    .connect(`mongodb://mongodb_container:27017/condoSec`, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true
    })
    .catch(console.log)

  console.log('\n\n🚀 Server running on https://localhost:5000 🚀\n\n')
})
