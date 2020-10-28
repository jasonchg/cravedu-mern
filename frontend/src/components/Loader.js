import React from 'react'
import LoaderGif from '../assets/gifs/loader.gif'
import { Grid } from '@material-ui/core'

const Loader = () => {
  return (
    <Grid container direction='row' justify='center' alignItems='center'>
      <Grid item xs={12}>
        <img
          style={{ width: 120, height: 120, margin: 10, opacity: 0.7 }}
          src={LoaderGif}
          alt={'Loader'}
        />
      </Grid>
    </Grid>
  )
}

export default Loader
