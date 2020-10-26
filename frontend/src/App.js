import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CourseScreen from './screens/CourseScreen'

function App() {
  return (
    <div className='App'>
      <Header />
      <Container maxWidth='md'>
        <main>
          <Router>
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
