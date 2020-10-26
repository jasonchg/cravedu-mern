import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))
const Message = ({ severity, children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Alert severity={severity}>
        <AlertTitle>{severity.toUpperCase()}</AlertTitle>
        {children}
      </Alert>
    </div>
  )
}

Message.defaultProps = {
  severity: 'error',
}

export default Message
