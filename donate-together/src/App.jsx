import { Outlet } from 'react-router-dom'
import './App.css'
import Button from './components/Button'
import Main from './components/Main'
import Header from './Header'
import Footer from './Footer'

function App() {

  return (
    <>
     <Header/>
     <Main>
      <Outlet/>
     </Main>
     <Footer/>
    </>
  )
}

export default App
