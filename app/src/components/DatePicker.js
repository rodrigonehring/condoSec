import React, { useState, useEffect } from 'react'
import enLocale from 'date-fns/locale/en-US'
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns'
import { DatePicker, LocalizationProvider } from '@material-ui/pickers'
import { Typography } from '@material-ui/core'
import { useField } from 'formik'

function DatePickerFormik({ name, label }) {
  const [field, meta, form] = useField(name)
  const [selectedDate, setValue] = useState(field.value ? new Date(field.value) : null)

  const handleDateChange = (date) => {
    const isValid = !isNaN(date)
    setValue(date)
    if (isValid) form.setValue(date.toISOString())
  }

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={enLocale}>
      <DatePicker
        {...field}
        value={selectedDate}
        onChange={handleDateChange}
        label={label}
        error={Boolean(meta.error)}
        variant="outlined"
        placeholder="01/01/2000"
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
