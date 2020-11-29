import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core'
import bgImage from '../assets/images/banner-bg.jpg'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '35h',
    overflow: 'hidden',
    margin: '0 -20px',
  },
  bannerContainer: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
  },
  sm: {
    textAlign: 'center',
    height: '100%',
    padding: '20px',
    position: 'relative',
  },
  md: {
    padding: '40px',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    color: '#333',
    background: '#fff',
    maxWidth: '475px',
  },
  textMD: {
    padding: 20,
  },
  textSM: {
    padding: 10,
  },
})

const Banner = ({ text, subText }) => {
  const classses = useStyles()
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={classses.root}>
      <div
        className={`${classses.bannerContainer} ${
          matchesSM ? classses.sm : classses.md
        }`}
      >
        <div
          className={`${classses.textContainer} ${
            matchesSM ? classses.textSM : classses.textMD
          }`}
        >
          <h2>{text}</h2>
          <p>{subText}</p>
        </div>
      </div>
    </div>
  )
}

export default Banner
