import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
import ManageCoursesScreen from './screens/ManageCoursesScreen'
import CourseEditScreen from './screens/CourseEditScreen'
import BrowseScreen from './screens/BrowseScreen'

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <Router>
          {/* Video Learning */}
          <Switch className='video-learning'>
            <>
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
            </>
          </Switch>

          {/* Main Screen */}
          <Switch className='main'>
            <>
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
                <Route path='/course' component={BrowseScreen} exact />
              </Container>
            </>
          </Switch>

          {/* For Admin */}
          <Switch className='admin'>
            <>
              <Container maxWidth='md'>
                <Route
                  path='/admin/courses/:id/edit'
                  component={CourseEditScreen}
                  exact
                />
                <Route
                  path='/admin/courses'
                  component={ManageCoursesScreen}
                  exact
                />
                <Route
                  path='/admin/users/:id/edit'
                  component={UserEditScreen}
                  exact
                />
                <Route
                  path='/admin/users'
                  component={ManageUsersScreen}
                  exact
                />
              </Container>
            </>
          </Switch>

          <Route path='/' component={HomeScreen} exact />
        </Router>
      </main>
      <Footer />
    </div>
  )
}

export default App
