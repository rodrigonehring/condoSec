import React from 'react'
import { makeStyles, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import IconApartment from '@material-ui/icons/Apartment'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_BUILDINGS } from '../graphQueries'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

export default function ListBuildings() {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_BUILDINGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error?... {error.message}</p>

  return (
    <div className={classes.root}>
      <List component="nav">
        {data.buildings.map((i) => (
          <ListItem button key={i.id} component={Link} to={`/app/building/${i.id}`}>
            <ListItemIcon>
              <IconApartment />
            </ListItemIcon>
            <ListItemText primary={i.name} secondary={`Number: ${i.number} - Block: ${i.block}`} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
