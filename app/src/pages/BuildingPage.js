import React from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'

import DialogEditBuilding, { useDialogBuilding } from '../components/DialogBuilding'
import DialogResident, { useDialogResident } from '../components/DialogResident'
import LayoutApp from '../components/LayoutApp'
import ListResidents from '../components/ListResidents'
import { GET_BUILDING } from '../graphQueries'

const useStyles = makeStyles((theme) => ({
  bar: {
    marginTop: 16,
    display: 'flex'
  }
}))

function Details({ values }) {
  const mainResident = values.mainResident && values.mainResident.name

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="caption">Name:</Typography>
        <br />
        <Typography variant="body1">{values.name}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="caption">Number:</Typography>
        <br />
        <Typography variant="body2">{values.number}</Typography>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Typography variant="caption">Block:</Typography>
        <br />
        <Typography variant="body2">{values.block}</Typography>
      </Grid>

      <Grid item sm={6}>
        <Typography variant="caption">Main resident:</Typography>
        <br />
        <Typography variant="body2" color={mainResident ? 'textPrimary' : 'error'}>
          {mainResident || 'Need a main resident!'}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default function BuildingPage({ match }) {
  const classes = useStyles()
  const dialogBuilding = useDialogBuilding()
  const dialogResident = useDialogResident()
  const { loading, error, data } = useQuery(GET_BUILDING, { variables: { id: match.params.id } })

  if (error) return <p>Error?... {error.message}</p>

  const pageTitle = data ? `Edit Building (${data.building.name})` : 'Edit Building'

  return (
    <LayoutApp pageTitle={pageTitle} loading={loading} backTo="/app">
      {data && (
        <>
          <Details values={data.building} />

          <div className={classes.bar}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dialogBuilding.openDialog(data.building)}
            >
              edit building
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 8 }}
              onClick={() => dialogResident.openDialog(false, data.building.id)}
            >
              add resident
            </Button>
          </div>

          <DialogEditBuilding {...dialogBuilding} />
          <DialogResident {...dialogResident} />
          <br />
          <br />
          <br />
          <ListResidents building={data.building} onSelect={dialogResident.openDialog} />
        </>
      )}
    </LayoutApp>
  )
}
