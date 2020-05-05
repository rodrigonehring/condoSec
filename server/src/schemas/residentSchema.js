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
    residents(liveIn: ID!): [Resident!]!
  }

  extend type Mutation {
    createResident(
      name: String!
      birthdate: String!
      phoneNumber: String!
      email: String!
      cpf: String!
      liveIn: ID!
    ): Resident!

    deleteResident(id: ID!): Resident
  }
`
