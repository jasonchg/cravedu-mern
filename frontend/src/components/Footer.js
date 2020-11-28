import React from 'react'
import { Typography, Container } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Logo from '../assets/images/logo.png'
const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <Container>
          <div className='left-footer'>
            <img src={Logo} alt='' />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              perferendis voluptates, dicta est odit accusamus?
            </p>
          </div>

          <div className='middle1-footer'>
            <Typography variant='h5' component='span'>
              Coorporate
            </Typography>
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Browse Course</a>
              </li>
              <li>
                <a>Cart</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>

          <div className='middle2-footer'>
            <Typography variant='h5' component='span'>
              Coorporate
            </Typography>
            <ul>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Browse Course</a>
              </li>
              <li>
                <a>Cart</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>

          <div className='right-footer'>
            <Typography variant='h5' component='span'>
              Socials
            </Typography>
            <ul>
              <li>
                <a>
                  <InstagramIcon /> Cravedu Insta
                </a>
              </li>
              <li>
                <a>
                  <FacebookIcon /> Cravedu FB
                </a>
              </li>
              <li>
                <a>
                  <TwitterIcon /> Cravedu Tweet
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </div>

      <Typography className='footer-bottom' variant='subtitle1' align='center'>
        Copyright &copy; Cravedu.inc
      </Typography>
    </footer>
  )
}

export default Footer
