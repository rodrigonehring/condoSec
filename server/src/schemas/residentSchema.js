const { gql } = require('apollo-server')

module.exports = gql`
  type Resident {
    id: ID!
    name: String!
    birthdate: String!
    phoneNumber: String!
    email: String!
    cpf: String!
    liveIn: Building
  }

  extend type Query {
    resident(id: ID!): Resident!
    residents(liveIn: ID, q: String): [Resident!]!
  }

  extend type Mutation {
    createResident(
      name: String!
      birthdate: String!
      phoneNumber: String!
      email: String!
      cpf: String!
      liveIn: String!
    ): Resident!

    updateResident(
      id: ID!
      name: String!
      birthdate: String!
      phoneNumber: String!
      email: String!
      cpf: String!
    ): Resident!

    deleteResident(id: ID!): Resident
  }
`
