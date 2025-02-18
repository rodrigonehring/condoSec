import React from 'react'
import { Button } from '@material-ui/core'
import LayoutApp from '../components/LayoutApp'
import ListBuildings from '../components/ListBuildings'
import DialogEditBuilding, { useDialogBuilding } from '../components/DialogBuilding'

export default function AppPage() {
  const dialogState = useDialogBuilding(null, true)

  return (
    <LayoutApp pageTitle="Dashboard">
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={() => dialogState.openDialog()}>
        create building
      </Button>
      <br />
      <br />
      <ListBuildings />
      <DialogEditBuilding {...dialogState} />
    </LayoutApp>
  )
}
