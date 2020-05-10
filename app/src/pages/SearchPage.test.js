import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SearchPage from './SearchPage'
import { GET_RESIDENTS } from '../graphQueries'

// mock Layout wrapper
jest.mock('../components/LayoutApp', () => (props) => props.children)

afterEach(cleanup)

const mocks = [
  {
    request: { query: GET_RESIDENTS, variables: { q: 'empty' } },
    result: { data: { residents: [] } }
  },
  {
    request: { query: GET_RESIDENTS, variables: { q: 'test' } },
    result: {
      data: {
        residents: [
          {
            id: '000',
            phoneNumber: '000',
            cpf: '111',
            name: 'test',
            email: 'aaa',
            birthdate: new Date().toISOString(),
            liveIn: { id: 'fakebuiding', name: 'fakebuiding' }
          }
        ]
      }
    }
  }
]

it('renders without error and show empty results', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchPage location={{ search: '?q=empty' }} />
    </MockedProvider>,
    { wrapper: MemoryRouter }
  )

  const emptyMessage = await findByText('No results for this search.')
  expect(emptyMessage).toBeInTheDocument()
})

it('renders list', async () => {
  const { findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SearchPage location={{ search: '?q=test' }} />
    </MockedProvider>,
    { wrapper: MemoryRouter }
  )

  const liveInButton = await findByText('live in fakebuiding')
  expect(liveInButton).toBeInTheDocument()
})
