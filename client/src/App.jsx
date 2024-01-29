import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrimaryLayout from './layouts/PrimaryLayouts.jsx'
import './App.css'

import Home from './pages/Home.jsx';
import CreateBlog from './pages/CreateBlog.jsx';
import Blog from './pages/Blog.jsx';
import UpdateBlog from './pages/UpdateBlog.jsx';
import Favourites from './pages/Favourites.jsx';

function App() {
  const [commentsCache, setCommentsCache] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/" element = {<Home />} />
          <Route path="/blogs/favourites" element = {<Favourites />} />
          <Route path="/create-blog" element = {<CreateBlog />} />
          <Route path="/blog/:id" element = {<Blog commentsCache={commentsCache} setCommentsCache = {setCommentsCache}/>} />
          <Route path="/blog/edit/:id" element = {<UpdateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
