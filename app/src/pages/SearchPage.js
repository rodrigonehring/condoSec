import React, { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Typography, makeStyles, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import LayoutApp from '../components/LayoutApp'
import { GET_RESIDENTS } from '../graphQueries'

const useStyles = makeStyles((theme) => ({
  list: {},
  item: {
    marginBottom: 32,
    paddingBottom: 16,
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.background.paper}`
    }
  }
}))

export default function SearchPage(props) {
  const classes = useStyles()
  const params = useMemo(() => new URLSearchParams(props.location.search), [props.location.search])
  const q = params.get('q')
  const { loading, data } = useQuery(GET_RESIDENTS, { variables: { q } })

  return (
    <LayoutApp pageTitle="Search" backTo="/app" q={q}>
      {data && data.residents.length > 0 && (
        <div className={classes.list}>
          {data.residents.map((i) => (
            <div key={i.cpf} className={classes.item}>
              <Typography>Name: {i.name}</Typography>
              <Typography variant="caption">
                Email: {i.email} <br />
                CPF: {i.cpf} <br />
              </Typography>
              <br />
              <Button component={Link} to={`/app/building/${i.liveIn.id}`} variant="outlined">
                live in {i.liveIn.name}
              </Button>
            </div>
          ))}
        </div>
      )}
      {!loading && data.residents.length === 0 && (
        <Typography>No results for this search.</Typography>
      )}
    </LayoutApp>
  )
}
