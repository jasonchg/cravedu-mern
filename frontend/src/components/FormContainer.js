import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    marginTop: 10,
    marginBottom: 10,
    width: '100% ',
  },
}))

const FormContainer = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

export default FormContainer
