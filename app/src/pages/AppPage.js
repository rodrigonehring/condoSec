import React from 'react'
import LayoutApp from '../components/LayoutApp'
import ListBuildings from '../components/ListBuilding'
// import { Button, Typography, Container } from '@material-ui/core'
// import { Link } from 'react-router-dom'

export default function AppPage() {
  return (
    <LayoutApp pageTitle="Dashboard">
      <br />
      <br />
      AppPage - listar residentes e edificios
      <br />
      <br />
      <br />
      <br />
      <ListBuildings />
    </LayoutApp>
  )
}
