const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    id: ID!
    username: String!
    name: String!
  }

  type Token {
    username: String!
    name: String!
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    users: [User!]!
  }

  extend type Mutation {
    createUser(name: String!, username: String!, password: String!): User!
    login(username: String!, password: String!): Token!
  }
`
