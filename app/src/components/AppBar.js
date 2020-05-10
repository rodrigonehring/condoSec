import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import Logo from '@material-ui/icons/VerifiedUser'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import { useAppState } from '../AppProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    marginLeft: 8,
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  userName: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 8,
    marginRight: 8,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

export default function SearchAppBar({ pageTitle, q }) {
  const history = useHistory()
  const { state, handleLogout } = useAppState()
  const [value, setValue] = useState(q || '')
  const classes = useStyles()

  const handleChange = (e) => setValue(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (value.length > 2) history.push(`/app/search?q=${value}`)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Typography className={classes.title} variant="h6" noWrap>
            {pageTitle}
          </Typography>
          <div className={classes.search}>
            <form onSubmit={handleSubmit}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search resident…"
                value={value}
                onChange={handleChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
          </div>
          <Typography variant="button" className={classes.userName}>
            {state.user.name && state.user.name.split(' ')[0]}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
