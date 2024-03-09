import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Error404 from './pages/Error404'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/signup' element={<SignUp />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/' element={<Home />} /> 
          <Route path='*' element={<Error404 />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App