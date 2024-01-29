import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrimaryLayout from './layouts/PrimaryLayouts.jsx'
import './App.css'

import Home from './pages/Home.jsx';
import CreateBlog from './pages/CreateBlog.jsx';
import Blog from './pages/Blog.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/" element = {<Home />} />
          <Route path="/create-blog" element = {<CreateBlog />} />
          <Route path="/blog/:id" element = {<Blog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
