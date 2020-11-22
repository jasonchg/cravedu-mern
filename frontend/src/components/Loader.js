import React from 'react'
import LoaderGif from '../assets/gifs/loader.gif'
import { Grid, makeStyles } from '@material-ui/core'
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  spinner: {
    width: 120,
    height: 120,
    margin: 10,
    opacity: 0.7,
  },
  alignCenter: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  alignLeft: {
    alignContent: 'start',
    justifyContent: 'start',
  },
})

const Loader = ({ left }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      className={`${classes.root} ${
        left ? classes.alignLeft : classes.alignCenter
      }`}
    >
      <Grid item xs={12}>
        <img className={classes.spinner} src={LoaderGif} alt={'Loader'} />
      </Grid>
    </Grid>
  )
}

Loader.propsTypes = {
  left: false,
}

export default Loader
