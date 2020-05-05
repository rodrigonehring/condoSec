import React, { useState, useMemo, useCallback } from 'react'
import { Formik, Form } from 'formik'
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'

import DatePicker from './DatePicker'
import TextField from './TextField'
import { CREATE_RESIDENT, UPDATE_BUILDING, GET_RESIDENTS } from '../graphQueries'

function numbersOnly(str = '') {
  return (str.match(/\d+/g) || []).join('')
}

export function useDialogResident() {
  const [state, setState] = useState({ open: false, values: null })

  const openDialog = useCallback((values, buildingId) => {
    setState({ createMode: !values, values, open: true, buildingId })
  }, [])

  const toggle = useCallback(() => setState((s) => ({ ...s, open: !s.open })), [setState])
  const setData = useCallback((values) => setState((s) => ({ ...s, values })), [setState])

  const [mutate] = useMutation(state.createMode ? CREATE_RESIDENT : UPDATE_BUILDING, {
    refetchQueries: () => [{ query: GET_RESIDENTS, variables: { liveIn: state.buildingId } }]
  })

  const handleSubmit = useCallback(
    async (values, form) => {
      form.setSubmitting(true)

      const variables = {
        ...values,
        liveIn: state.buildingId,
        cpf: numbersOnly(values.cpf),
        phoneNumber: numbersOnly(values.phoneNumber)
      }

      try {
        const response = await mutate({ variables })
        // props.history.push('/login')

        setState((s) => ({ ...s, open: false }))
      } catch (error) {
        if (error.message.includes('FormError')) {
          form.setErrors(error.graphQLErrors[0].state)
        } else {
          alert(`Unknown error: ${error.message}`)
        }

        form.setSubmitting(false)
      }
    },
    [mutate, state.buildingId]
  )

  return useMemo(() => ({ ...state, toggle, setData, handleSubmit, openDialog }), [
    state,
    toggle,
    openDialog,
    setData,
    handleSubmit
  ])
}

const defaultValues = { name: '', cpf: '', email: '', phoneNumber: '', birthdate: '' }

function FormResident({ values, open, toggle, createMode, handleSubmit }) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={toggle}>
      <Formik initialValues={values || defaultValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle>{createMode ? 'Create' : 'Edit'} resident</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField name="name" label="Name" required />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField name="cpf" label="CPF" required />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField name="email" label="Email" type="email" required />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker name="birthdate" label="Birthdate" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="phoneNumber" label="Phone Number" required />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggle}>cancel</Button>
              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'sending' : createMode ? 'create' : 'update'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default FormResident
