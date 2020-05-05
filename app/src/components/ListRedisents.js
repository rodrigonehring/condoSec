import React from 'react'
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Tooltip
} from '@material-ui/core'
import IconPerson from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'
import EditIcon from '@material-ui/icons/Edit'
import SupervisorIcon from '@material-ui/icons/SupervisorAccount'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_RESIDENTS, GET_BUILDING, DELETE_RESIDENT, SET_MAIN_RESIDENT } from '../graphQueries'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

function IconAction({ Icon, handleClick, label, disabled }) {
  return (
    <Tooltip title={label}>
      <span>
        <IconButton onClick={handleClick} disabled={disabled} aria-label={label}>
          <Icon />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default function ListResidents({ building, onSelect }) {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_RESIDENTS, { variables: { liveIn: building.id } })
  const [mutateDelete] = useMutation(DELETE_RESIDENT, {
    refetchQueries: () => [{ query: GET_RESIDENTS, variables: { liveIn: building.id } }]
  })
  const [mutateMainResident] = useMutation(SET_MAIN_RESIDENT, {
    refetchQueries: () => [{ query: GET_BUILDING, variables: { id: building.id } }]
  })

  const handleDelete = (item) => {
    if (window.confirm(`Delete ${item.name}?`)) mutateDelete({ variables: { id: item.id } })
  }

  const handleSetMainResident = (item) => {
    if (window.confirm(`Turn ${item.name} into main resident?`))
      mutateMainResident({ variables: { id: building.id, resident: item.id } })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error?... {error.message}</p>

  if (data.residents.length === 0) {
    return <Typography>No residents created.</Typography>
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        {data.residents.map((i) => (
          <ListItem key={i.id}>
            <ListItemIcon>
              {building.mainResident && building.mainResident.id === i.id ? (
                <StarIcon />
              ) : (
                <IconPerson />
              )}
            </ListItemIcon>
            <ListItemText primary={i.name} secondary={`cpf: ${i.cpf} - email: ${i.email}`} />
            <ListItemSecondaryAction>
              <IconAction
                Icon={SupervisorIcon}
                handleClick={() => handleSetMainResident(i)}
                label="set main resident"
                disabled={building.mainResident && building.mainResident.id === i.id}
              />
              <IconAction Icon={EditIcon} handleClick={() => onSelect(i)} label="edit resident" />
              <IconAction
                Icon={DeleteIcon}
                handleClick={() => handleDelete(i)}
                label="delete resident"
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
