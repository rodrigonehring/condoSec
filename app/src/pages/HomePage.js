import React, { useEffect } from 'react'
import { Button, Typography, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  useEffect(() => {
    document.title = 'condoSec'
  }, [])

  return (
    <Container maxWidth="md">
      <Typography gutterBottom variant="h3">
        Landing Page Content
      </Typography>
      <Button component={Link} to="/app">
        enter app
      </Button>
    </Container>
  )
}
