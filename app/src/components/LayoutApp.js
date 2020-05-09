import React, { useEffect } from 'react'
import { IconButton, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'

import IconBack from '@material-ui/icons/ArrowBack'

import AppBar from './AppBar'

export default function Layout({ children, pageTitle, backTo, q }) {
  useEffect(() => {
    document.title = `${pageTitle} - condoSec`
  }, [pageTitle])

  return (
    <>
      <AppBar position="static" pageTitle={pageTitle} q={q} />
      {backTo && (
        <IconButton component={Link} to={backTo}>
          <IconBack />
        </IconButton>
      )}

      <Container maxWidth="md">
        <div>{children}</div>
      </Container>
    </>
  )
}
