import NotificationsIcon from '@material-ui/icons/Notifications'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'

const NotificationIcon = ({ unRead = [] }) => {
  return unRead ? (
    unRead.length > 0 ? (
      <>
        <NotificationsActiveIcon style={{ color: '#f8e825', marginRight: 7 }} />{' '}
        {unRead.length}
      </>
    ) : (
      <NotificationsIcon />
    )
  ) : (
    <NotificationsIcon />
  )
}

export default NotificationIcon
