import { makeStyles } from '@material-ui/core'
import bgImage from '../assets/images/banner-bg.jpg'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '35h',
    overflow: 'hidden',
  },
  bannerContainer: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    padding: '40px',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    color: '#333',
    background: '#fff',
    maxWidth: '475px',
    padding: '20px',
  },
})

const Banner = ({ text, subText }) => {
  const classses = useStyles()

  return (
    <div className={classses.root}>
      <div className={classses.bannerContainer}>
        <div className={classses.textContainer}>
          <h2>{text}</h2>
          <p>{subText}</p>
        </div>
      </div>
    </div>
  )
}

export default Banner
