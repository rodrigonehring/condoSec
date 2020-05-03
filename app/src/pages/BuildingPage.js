import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Button, Typography, Grid } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import DialogEditBuilding, { useDialogBuilding } from '../components/DialogEditBuilding'
import DialogResident, { useDialogResident } from '../components/DialogResident'
import LayoutApp from '../components/LayoutApp'
import ListRedisents from '../components/ListRedisents'
import { GET_BUILDING } from '../graphQueries'

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
  const dialogBuilding = useDialogBuilding()
  const dialogResident = useDialogResident()
  const { loading, error, data } = useQuery(GET_BUILDING, { variables: { id: match.params.id } })

  useEffect(() => {
    if (data) {
      dialogBuilding.setData(data.building)
    }
  }, [data, dialogBuilding.setData])

  if (error) return <p>Error?... {error.message}</p>

  const pageTitle = data ? `Edit Building (${data.building.name})` : 'Edit Building'

  return (
    <LayoutApp pageTitle={pageTitle} loading={loading} backTo="/app">
      {data && (
        <>
          <br />
          <br />
          <Details values={data.building} />
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={dialogBuilding.toggle}>
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

          <DialogEditBuilding {...dialogBuilding} />
          <DialogResident {...dialogResident} />
          <br />
          <br />
          <br />
          <ListRedisents building={data.building} onSelect={dialogResident.openDialog} />
        </>
      )}
    </LayoutApp>
  )
}
