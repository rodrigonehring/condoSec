import React from 'react'
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3498db'
    }
  },
  status: {
    danger: orange[500]
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: 'none'
      }
    }
  }
})

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
