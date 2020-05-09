const { gql } = require('apollo-server')

module.exports = gql`
  type Building {
    id: ID!
    name: String!
    number: String!
    block: String!
    mainResident: Resident
    residentCount: Int!
  }

  extend type Query {
    building(id: ID!): Building!
    buildings: [Building!]!
  }

  extend type Mutation {
    createBuilding(name: String!, number: String!, block: String!): Building!
    updateBuilding(id: ID!, name: String!, number: String!, block: String!): Building!
    setMainResident(id: ID!, resident: ID!): Building!
    deleteBuilding(id: ID!): Building
  }
`
