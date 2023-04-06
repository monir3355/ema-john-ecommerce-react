import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import Shop from './Components/Shop/Shop'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  )
}

export default App
