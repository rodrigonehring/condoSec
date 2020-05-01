import React, { useEffect } from 'react'
import { makeStyles, IconButton, Typography, AppBar, Toolbar, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconBack from '@material-ui/icons/ArrowBack'
import { useAppState } from '../AppProvider'

const useStyles = makeStyles(() => ({
  title: { flexGrow: 1 },
  user: { marginRight: 8 }
}))

export default function Layout({ children, pageTitle, backTo }) {
  const classes = useStyles()
  const { state, handleLogout } = useAppState()

  useEffect(() => {
    document.title = `${pageTitle} - condoSec`
  }, [pageTitle])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {backTo && (
            <IconButton component={Link} to={backTo}>
              <IconBack />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {pageTitle}
          </Typography>
          <Typography variant="button" className={classes.user}>
            {state.user.name}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <div>{children}</div>
      </Container>
    </>
  )
}
