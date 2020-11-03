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

function App() {
  return (
    <div className='App'>
      <Header />
      <Container maxWidth='md'>
        <main>
          <Router>
            <Route path='/mycourses' component={MyCoursesScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login/:id' component={LoginScreen} exact />
            <Route path='/login' component={LoginScreen} exact />
            <Route path='/profile' component={UserProfileScreen} />
            <Route path='/order/:id' component={ViewOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/cart' component={CartScreen} exact />
            <Route path='/cart/:id' component={CartScreen} exact />
            <Route
              path='/course/:id/learn'
              component={VideoLearningScreen}
              exact
            />
            <Route path='/course/:id' component={CourseScreen} exact />
            <Route path='/' component={HomeScreen} exact />
          </Router>
        </main>
      </Container>
      <Footer />
    </div>
  )
}

export default App
