const { gql } = require('apollo-server')
const buildingSchema = require('./buildingSchema')
const userSchema = require('./userSchema')
const residentSchema = require('./residentSchema')

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

module.exports = [linkSchema, buildingSchema, userSchema, residentSchema]
