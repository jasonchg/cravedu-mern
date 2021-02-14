import React from 'react'
import { Typography, Container, makeStyles } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Logo from '../assets/images/logo.png'

const useStyles = makeStyles({
  excludeFromPrint: {
    '@media print': {
      display: 'none',
    },
  },
})

const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.excludeFromPrint}>
      <div className='footer'>
        <Container>
          <div className='left-footer'>
            <img src={Logo} alt='' onDragStart={(e) => e.preventDefault()} />
            <p>
              Craving for education. Cravedu allows you to study online,
              interact with other people, receive knowledge and more.
            </p>
          </div>

          <div className='middle1-footer'>
            <Typography variant='h5' component='span'>
              Coorporate
            </Typography>
            <ul>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/'>Browse Course</a>
              </li>
              <li>
                <a href='/'>Cart</a>
              </li>
              <li>
                <a href='/'>About</a>
              </li>
            </ul>
          </div>
          {/* 
          <div className='middle2-footer'>
            <Typography variant='h5' component='span'>
              Coorporate
            </Typography>
            <ul>
              <li>
                <a href='/'>Home</a>
              </li>
              <li>
                <a href='/course'>Browse Course</a>
              </li>
              <li>
                <a href='/cart'>Cart</a>
              </li>
              <li>
                <a href='/'>About</a>
              </li>
            </ul>
          </div> */}

          <div className='right-footer'>
            <Typography variant='h5' component='span'>
              Socials
            </Typography>
            <ul>
              <li>
                <a href='/'>
                  <InstagramIcon /> Cravedu Insta
                </a>
              </li>
              <li>
                <a href='/'>
                  <FacebookIcon /> Cravedu FB
                </a>
              </li>
              <li>
                <a href='/'>
                  <TwitterIcon /> Cravedu Tweet
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      <div className='footer-bottom-container'>
        <div className='footer-bottom'>
          <Container>
            <div>
              <Typography variant='subtitle1' align='center'>
                Copyright &copy; Cravedu.inc
              </Typography>
            </div>
            <div>
              <a href='/'>Privacy Policies</a> |{' '}
              <a href='/'>Terms & Conditions</a>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  )
}

export default Footer
