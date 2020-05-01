import React from 'react'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useField } from 'formik'

const useStyles = makeStyles({
  root: {
    marginBottom: 20
  }
})

function CustomTextField({ name, helperText, label, type, disabled, isSubmitting }) {
  const classes = useStyles()
  const [field, meta] = useField(name)

  return (
    <TextField
      {...field}
      label={label}
      onChange={disabled ? null : field.onChange}
      disabled={disabled || isSubmitting}
      className={classes.root}
      fullWidth
      type={type}
      variant="outlined"
      error={Boolean(meta.error)}
      helperText={meta.error || helperText}
    />
  )
}

export default CustomTextField
