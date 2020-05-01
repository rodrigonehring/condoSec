import React from 'react'
import { Button } from '@material-ui/core'
import LayoutApp from '../components/LayoutApp'
import ListBuildings from '../components/ListBuilding'
import DialogEditBuilding, { useDialogBuilding } from '../components/DialogEditBuilding'

export default function AppPage() {
  const dialogState = useDialogBuilding({}, true)

  console.log(dialogState)

  return (
    <LayoutApp pageTitle="Dashboard">
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={dialogState.toggle}>
        create building
      </Button>
      <br />
      <br />
      <ListBuildings />
      <DialogEditBuilding {...dialogState} />
    </LayoutApp>
  )
}
