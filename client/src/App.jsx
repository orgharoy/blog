import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrimaryLayout from './layouts/PrimaryLayouts.jsx'
import './App.css'

import Home from './pages/Home.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/" element = {<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
