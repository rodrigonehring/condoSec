import React from 'react'
import { Formik, Form } from 'formik'
import { Button, Typography, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import TextField from '../components/TextField'
import { useAppState } from '../AppProvider'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      name
    }
  }
`

export default function LoginPage(props) {
  const appState = useAppState()
  const [login] = useMutation(LOGIN)

  const handleSubmit = async (values, form) => {
    form.setSubmitting(true)

    try {
      const response = await login({ variables: values })

      appState.handleLogin(response.data.login)
      props.history.push('/app')
    } catch (error) {
      console.log('login error', error.message)

      if (error.message.includes('Invalid credentials')) {
        form.setFieldError('username', 'Username or password wrong')
      }

      form.setSubmitting(false)
    }
  }

  return (
    <Container maxWidth="xs">
      <br />
      <br />
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <br />
      <br />

      <Formik initialValues={{ username: 'rodrigo', password: '250592' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <TextField name="username" label="username" required />
            <TextField name="password" type="password" label="password" required />

            <Button type="submit" color="primary" variant="outlined" disabled={isSubmitting}>
              {isSubmitting ? 'sending' : 'login'}
            </Button>

            <br />
            <br />

            <Button component={Link} to="/create-account">
              create account
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
