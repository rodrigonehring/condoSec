import { gql } from 'apollo-boost'

export const CREATE_BUILDING = gql`
  mutation m($name: String!, $number: String!, $block: String!) {
    createBuilding(name: $name, number: $number, block: $block) {
      name
      id
      residentCount
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
        id
      }
      residentCount
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
      residentCount
      mainResident {
        name
        id
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
      residentCount
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
  birthdate
  liveIn { name, id }
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
  query M($liveIn: ID, $q: String) {
    residents(liveIn: $liveIn, q: $q) {
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

export const DELETE_BUILDING = gql`
  mutation M($id: ID!) {
    deleteBuilding(id: $id) {
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
  mutation createResident(
    $name: String!
    $cpf: String!
    $email: String!
    $phoneNumber: String!
    $birthdate: String!
    $liveIn: String!
  ) {
    createResident(
      name: $name
      cpf: $cpf
      email: $email
      phoneNumber: $phoneNumber
      birthdate: $birthdate
      liveIn: $liveIn
    ) {
      name
      id
    }
  }
`

export const UPDATE_RESIDENT = gql`
  mutation updateResident(
    $id: ID!
    $name: String!
    $cpf: String!
    $email: String!
    $phoneNumber: String!
    $birthdate: String!
  ) {
    updateResident(
      id: $id
      name: $name
      cpf: $cpf
      email: $email
      phoneNumber: $phoneNumber
      birthdate: $birthdate
    ) {
      name
      id
    }
  }
`
