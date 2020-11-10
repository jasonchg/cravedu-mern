import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CourseScreen from './screens/CourseScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import MyCoursesScreen from './screens/MyCoursesScreen'
import ViewOrderScreen from './screens/ViewOrderScreen'
import VideoLearningScreen from './screens/VideoLearningScreen'
import ManageUsersScreen from './screens/ManageUsersScreen'
import UserEditScreen from './screens/UserEditScreen'

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Router>
          {/* Video Learning */}
          <div className='video-learning'>
            <Route
              path='/course/:id/learn?:chapter'
              component={VideoLearningScreen}
              exact
            />
            <Route
              path='/course/:id/learn'
              component={VideoLearningScreen}
              exact
            />
          </div>

          {/* Main Screen */}
          <Container maxWidth='md'>
            <Route path='/mycourses' component={MyCoursesScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login/:id' component={LoginScreen} exact />
            <Route path='/login' component={LoginScreen} exact />
            <Route path='/profile' component={UserProfileScreen} />
            <Route path='/order/:id' component={ViewOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/cart' component={CartScreen} exact />
            <Route path='/cart/:id' component={CartScreen} exact />
            <Route path='/course/:id' component={CourseScreen} exact />
          </Container>

          {/* For Admin */}
          <Container maxWidth='md'>
            <Route
              path='/admin/users/:id/edit'
              component={UserEditScreen}
              exact
            />
            <Route path='/admin/users' component={ManageUsersScreen} exact />
          </Container>

          {/* Default */}
          <Container maxWidth='md'>
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </Router>
      </main>
      <Footer />
    </div>
  )
}

export default App
