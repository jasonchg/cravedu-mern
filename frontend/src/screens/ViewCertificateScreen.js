import React from 'react'
import Message from '../components/Message'

const ViewCertificateScreen = ({ match }) => {
  const src = match.params.id

  return src === '' || !src ? (
    <Message>Something went wrong. Please contact support immediately.</Message>
  ) : (
    <div style={{ margin: 10, display: 'flex', justifyContent: 'center' }}>
      <img src={`/certificates/${src}`} style={{ width: 1050 }} alt={src} />
    </div>
  )
}

export default ViewCertificateScreen
