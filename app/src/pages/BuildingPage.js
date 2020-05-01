import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Grid } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import DialogEditBuilding from '../components/DialogEditBuilding'
import LayoutApp from '../components/LayoutApp'

const GET_BUILDINGS = gql`
  query M($id: ID!) {
    building(id: $id) {
      name
      id
      block
      number
      mainResident {
        name
      }
      residents {
        name
      }
    }
  }
`

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
  const [dialogOpen, setDialog] = useState(false)
  const { loading, error, data } = useQuery(GET_BUILDINGS, { variables: { id: match.params.id } })

  if (error) return <p>Error?... {error.message}</p>

  const pageTitle = data ? `Edit Building (${data.building.name})` : 'Edit Building'

  console.log(data && data.building)

  return (
    <LayoutApp pageTitle={pageTitle} loading={loading} backTo="/app">
      {data && (
        <>
          <Details values={data.building} />
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={() => setDialog(true)}>
            edit
          </Button>
          <DialogEditBuilding
            initialValues={data.building}
            open={dialogOpen}
            handleClose={() => setDialog(false)}
          />
        </>
      )}
    </LayoutApp>
  )
}
