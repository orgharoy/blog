import React from 'react'
import { Outlet } from 'react-router-dom';

import TopBar from '../componenets/TopBar.jsx';

const PrimaryLayouts = () => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 shadow-md">
        <TopBar />
      </div>
      <div className="flex-grow pt-5">
        <Outlet />
      </div>
      <div className="h-12 bg-green-500">
        Footer
      </div>
    </div>
  )
}

export default PrimaryLayouts