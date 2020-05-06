import React, { useState, useMemo, useCallback } from 'react'
import { Formik, Form } from 'formik'
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import TextField from './TextField'
import { CREATE_BUILDING, UPDATE_BUILDING, GET_BUILDINGS } from '../graphQueries'

export function useDialogBuilding() {
  const history = useHistory()
  const [state, setState] = useState({ open: false, values: null })

  const openDialog = useCallback((values) => {
    setState({ createMode: !values, values, open: true })
  }, [])

  const toggle = useCallback(() => setState((s) => ({ ...s, open: !s.open })), [setState])

  const [mutate] = useMutation(state.createMode ? CREATE_BUILDING : UPDATE_BUILDING, {
    refetchQueries: () => [{ query: GET_BUILDINGS }]
  })

  const handleSubmit = useCallback(
    async (variables, form) => {
      form.setSubmitting(true)

      console.log('submit form', state, variables)

      try {
        const response = await mutate({ variables })
        state.createMode && history.push(`/app/building/${response.data.createBuilding.id}`)
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
    [mutate, state, history]
  )

  console.log('Dialog render', state)

  return useMemo(() => ({ ...state, toggle, handleSubmit, openDialog }), [
    state,
    toggle,
    handleSubmit,
    openDialog
  ])
}

const defaultValues = { name: '', block: '', number: '' }

function FormBuilding({ values, open, toggle, createMode, handleSubmit }) {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={toggle}>
      <Formik initialValues={values || defaultValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle>{createMode ? 'Create' : 'Edit'} building</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField name="name" label="name" required />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField name="block" label="block" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="number" label="number" required />
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

export default FormBuilding
