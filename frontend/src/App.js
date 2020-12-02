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
import AdminUserEditScreen from './screens/AdminUserEditScreen'
import ManageCoursesScreen from './screens/ManageCoursesScreen'
import AdminCourseEditScreen from './screens/AdminCourseEditScreen'
import BrowseScreen from './screens/BrowseScreen'
import InstructorScreen from './screens/InstructorScreen'
import InstructorCourseEditScreen from './screens/InstructorCourseEditScreen'

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
            <Container>
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
          </Switch>

          {/* For Admin */}
          <Switch className='admin'>
            <Container>
              <Route
                path='/admin/:id/edit'
                component={AdminCourseEditScreen}
                exact
              />
              <Route path='/admin' component={ManageCoursesScreen} exact />
              <Route
                path='/admin/users/:id/edit'
                component={AdminUserEditScreen}
                exact
              />
              <Route path='/admin/users' component={ManageUsersScreen} exact />
            </Container>
          </Switch>

          {/* For Admin */}
          <Switch className='instructor'>
            <Container>
              <Route
                path='/instructor/:id/edit'
                component={InstructorCourseEditScreen}
                exact
              />
              <Route path='/instructor' component={InstructorScreen} exact />
            </Container>
          </Switch>

          <Route path='/' component={HomeScreen} exact />
        </Router>
      </main>
      <Footer />
    </div>
  )
}

export default App
