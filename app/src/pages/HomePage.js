import React, { useEffect } from 'react'
import { Button, Typography, Container, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Logo from '@material-ui/icons/VerifiedUser'

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
    padding: 32
  },
  logo: {
    fontSize: '120px',
    marginBottom: 32
  }
}))

export default function LoginPage() {
  const classes = useStyles()

  useEffect(() => {
    document.title = 'condoSec'
  }, [])

  return (
    <Container maxWidth="md" className={classes.container}>
      <Logo className={classes.logo} color="primary" />
      <Typography variant="h3">condoSec</Typography>
      <Typography gutterBottom variant="caption">
        security systems
      </Typography>

      <br />
      <br />
      <br />
      <Button component={Link} to="/app" variant="contained" color="primary">
        enter app
      </Button>
    </Container>
  )
}
