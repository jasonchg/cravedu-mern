import { Avatar, makeStyles } from '@material-ui/core'
import CraveduLogo from '../assets/images/logo-black.png'
const useStyle = makeStyles((theme) => ({
  aboutInstructor: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
    background: '#f1faee',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 20,
    marginTop: 20,
    boxShadow: theme.shadows[5],
  },
}))

const InsturctorCard = ({ instructor }) => {
  const classes = useStyle()
  return (
    <div className={classes.aboutInstructor}>
      <p>Instructor Card</p>
      <span
        style={{
          background: '#1d3557',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}
      >
        <Avatar
          style={{
            marginRight: 10,
            width: 50,
            height: 50,
            background: '#457b9d',
          }}
        >
          <h3>{instructor.charAt(0)}</h3>
        </Avatar>
        <h2 style={{ color: '#fff' }}>{instructor}</h2>
      </span>
      <img src={CraveduLogo} width='80' style={{ marginTop: 20 }} />
    </div>
  )
}

export default InsturctorCard
