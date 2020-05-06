import React, { useState } from 'react'
import enLocale from 'date-fns/locale/en-US'
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns'
import { DatePicker, LocalizationProvider } from '@material-ui/pickers'
import { Typography, TextField } from '@material-ui/core'
import { useField } from 'formik'

function DatePickerFormik({ name, label }) {
  const [field, meta, form] = useField(name)
  const [selectedDate, setValue] = useState(field.value ? new Date(field.value) : null)

  const handleDateChange = (date) => {
    const isValid = date && !isNaN(date)
    setValue(date)
    form.setValue(isValid ? date.toISOString() : null)
  }

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={enLocale}>
      <DatePicker
        {...field}
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(props) => <TextField {...props} variant="outlined" />}
        onError={console.warn}
        label={label}
        inputFormat="dd/MM/yyyy"
        mask="__/__/____"
      />

      {meta.error && (
        <Typography variant="caption" color="error">
          {meta.error}
        </Typography>
      )}
    </LocalizationProvider>
  )
}

export default DatePickerFormik
