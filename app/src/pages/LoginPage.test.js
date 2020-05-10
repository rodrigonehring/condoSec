import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/react-testing'
import { render, cleanup, fireEvent, act, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginPage from './LoginPage'
import { LOGIN } from '../graphQueries'

jest.mock('../AppProvider', () => ({ useAppState: jest.fn(() => ({ handleLogin: jest.fn() })) }))

afterEach(cleanup)

const mocks = [
  {
    request: { query: LOGIN, variables: { username: 'test-user', password: 'test-pass' } },
    newData: jest.fn(() => ({ data: { login: { name: 'aaa', token: 'fake' } } }))
  }
]

it('renders without error', async () => {
  const history = { push: jest.fn() }
  let rendered

  act(() => {
    rendered = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage history={history} />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    )
  })

  const { getByTestId } = rendered
  const inputUser = getByTestId('username')
  const inputPass = getByTestId('password')
  const submit = getByTestId('submit')

  expect(inputUser).toBeInTheDocument()
  expect(inputPass).toBeInTheDocument()

  await act(async () => {
    fireEvent.change(inputUser, { target: { value: 'test-user' } })
    fireEvent.change(inputPass, { target: { value: 'test-pass' } })
  })

  await act(async () => {
    fireEvent.click(submit)
  })

  const mock = mocks[0].newData
  await wait(() => expect(mock).toHaveBeenCalled())

  expect(history.push).toBeCalled()
  expect(history.push).toBeCalledWith('/app')
})
