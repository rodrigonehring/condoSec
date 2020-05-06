import React from 'react'
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from '@material-ui/core'
import IconApartment from '@material-ui/icons/Apartment'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import IconPerson from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'
import { GET_BUILDINGS } from '../graphQueries'
import IconAction from './IconAction'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

export default function ListBuildings() {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_BUILDINGS)

  const handleDelete = (item) => {
    if (window.confirm(`Delete ${item.name}?`)) console.warn({ variables: { id: item.id } })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error?... {error.message}</p>

  if (data.buildings.length === 0) {
    return <Typography>No building created.</Typography>
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        {data.buildings.map((i) => (
          <ListItem button key={i.id} component={Link} to={`/app/building/${i.id}`}>
            <ListItemIcon>
              <IconApartment />
            </ListItemIcon>
            <ListItemText primary={i.name} secondary={`Number: ${i.number} - Block: ${i.block}`} />
            <ListItemSecondaryAction>
              <IconAction
                Icon={IconPerson}
                badgeContent={i.residentCount}
                label={`${i.residentCount} residents`}
                color="primary"
                style={{ margin: 16 }}
              />
              <IconAction
                Icon={DeleteIcon}
                onClick={() => handleDelete(i)}
                label="delete building and residents"
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
