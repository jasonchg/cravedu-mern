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

function App() {
  return (
    <div className='App'>
      <Header />
      <Container maxWidth='md'>
        <main>
          <Router>
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/cart' component={CartScreen} exact />
            <Route path='/cart/:id' component={CartScreen} exact />
            <Route path='/course/:id' component={CourseScreen} />
            <Route path='/' component={HomeScreen} exact />
          </Router>
        </main>
      </Container>
      <Footer />
    </div>
  )
}

export default App
