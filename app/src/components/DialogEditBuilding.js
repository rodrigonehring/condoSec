import React from 'react'
import { Formik, Form } from 'formik'
import { Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

import TextField from './TextField'

function FormBuilding({ initialValues, open, handleClose }) {
  const handleSubmit = console.log

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <DialogTitle>Edit building</DialogTitle>
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
              <Button onClick={handleClose}>cancel</Button>
              <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'sending' : 'update'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default FormBuilding
