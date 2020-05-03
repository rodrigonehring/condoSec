import { gql } from 'apollo-boost'

export const CREATE_BUILDING = gql`
  mutation m($name: String!, $number: String!, $block: String!) {
    createBuilding(name: $name, number: $number, block: $block) {
      name
      id
    }
  }
`

export const UPDATE_BUILDING = gql`
  mutation m($id: ID!, $name: String!, $number: String!, $block: String!) {
    updateBuilding(id: $id, name: $name, number: $number, block: $block) {
      name
      id
      block
      number
      mainResident {
        name
      }
      residents {
        name
      }
    }
  }
`

export const GET_BUILDINGS = gql`
  query {
    buildings {
      name
      id
      block
      number
      mainResident {
        name
      }
      residents {
        name
      }
    }
  }
`

export const GET_BUILDING = gql`
  query M($id: ID!) {
    building(id: $id) {
      name
      id
      block
      number
      mainResident {
        name
        id
      }
    }
  }
`

const resident = `
  name
  id
  cpf
  phoneNumber
  email
  birthDate
  liveIn { name }
`

export const GET_RESIDENT = gql`
  query M($id: ID!) {
    resident(id: $id) {
      ${resident}
    }
  }
`

// M($building: ID!)
export const GET_RESIDENTS = gql`
  query M($liveIn: ID!) {
    residents(liveIn: $liveIn) {
      ${resident}
    }
  }
`

export const DELETE_RESIDENT = gql`
  mutation M($id: ID!) {
    deleteResident(id: $id) {
      id
    }
  }
`

export const SET_MAIN_RESIDENT = gql`
  mutation M($id: ID!, $resident: ID!) {
    setMainResident(id: $id, resident: $resident) {
      id
    }
  }
`

export const CREATE_RESIDENT = gql`
  mutation m(
    $name: String!
    $cpf: String!
    $email: String!
    $phoneNumber: String!
    $birthDate: String!
    $liveIn: ID!
  ) {
    createResident(
      name: $name
      cpf: $cpf
      email: $email
      phoneNumber: $phoneNumber
      birthDate: $birthDate
      liveIn: $liveIn
    ) {
      name
      id
    }
  }
`
