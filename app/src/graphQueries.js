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

export const GET_BUILDING = gql`
  query M($id: ID!) {
    building(id: $id) {
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
