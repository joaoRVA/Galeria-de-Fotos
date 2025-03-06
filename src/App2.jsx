import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import App from './pages/App'
import NavBar from './components/NavBar'
import SingleFoto from './pages/SingleFoto'
const App2 = () => {
  return <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/foto/:id' element={<SingleFoto/>} />
      </Routes>
  </BrowserRouter>
}

export default App2