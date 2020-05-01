import React from 'react'
import { Formik, Form } from 'formik'
import { Button, Typography, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import TextField from '../components/TextField'

const CREATE_USER = gql`
  mutation createUser($name: String!, $username: String!, $password: String!) {
    createUser(name: $name, username: $username, password: $password) {
      name
    }
  }
`

export default function CreateAccountPage(props) {
  const [createUser] = useMutation(CREATE_USER)

  const handleSubmit = async (variables, form) => {
    form.setSubmitting(true)

    try {
      await createUser({ variables })
      props.history.push('/login')
      alert('User created!')
    } catch (error) {
      if (error.message.includes('FormError')) {
        form.setErrors(error.graphQLErrors[0].state)
      } else {
        alert(`Unknown error: ${error.message}`)
      }

      form.setSubmitting(false)
    }
  }

  return (
    <Container maxWidth="xs">
      <br />
      <br />
      <Typography variant="h3" gutterBottom>
        Create account
      </Typography>
      <br />
      <br />

      <Formik initialValues={{ name: '', username: '', password: '' }} onSubmit={handleSubmit}>
        <Form>
          <TextField name="name" label="name" required />
          <TextField name="username" label="username" required />
          <TextField name="password" type="password" label="password" required />

          <Button type="submit" color="primary" variant="outlined">
            Create account
          </Button>

          <br />
          <br />

          <Button component={Link} to="/login">
            login
          </Button>
        </Form>
      </Formik>
    </Container>
  )
}
