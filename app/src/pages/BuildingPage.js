import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Button, Typography, Grid } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'

import DialogEditBuilding, { useDialogBuilding } from '../components/DialogEditBuilding'
import LayoutApp from '../components/LayoutApp'
import { GET_BUILDING } from '../graphQueries'

function Details({ values }) {
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
    </Grid>
  )
}

export default function BuildingPage({ match }) {
  const dialogState = useDialogBuilding()
  const { loading, error, data } = useQuery(GET_BUILDING, { variables: { id: match.params.id } })

  useEffect(() => {
    console.log('Effect BuildingPage', data)
    if (data) {
      dialogState.setData(data.building)
    }
  }, [data, dialogState.setData])

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
          <Button variant="contained" color="primary" onClick={dialogState.toggle}>
            edit
          </Button>
          <DialogEditBuilding {...dialogState} />
        </>
      )}
    </LayoutApp>
  )
}
