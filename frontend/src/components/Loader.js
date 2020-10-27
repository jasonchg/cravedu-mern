import React from 'react'
import LoaderGif from '../assets/gifs/loader.gif'
import { Container, Grid } from '@material-ui/core'

const Loader = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <img
            style={{ width: 120, height: 120, margin: 10, opacity: 0.7 }}
            src={LoaderGif}
            alt={'Loader'}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loader
