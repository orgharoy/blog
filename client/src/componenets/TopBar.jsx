import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className="container mx-auto flex items-center justify-between h-full">
      <div className="flex items-center h-full">
        <Link to="/" className="font-semibold text-2xl hover:underline transition-all">myBlogs</Link>
      </div>
      <div className="flex items-center h-full">
        Button
      </div>
    </div>
  )
}

export default TopBar