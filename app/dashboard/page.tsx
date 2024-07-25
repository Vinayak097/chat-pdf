import React from 'react'
import Navbar from '../components/Navbar'
import Documents from '../components/Documents'
Documents
function dashboard() {
  return (
    <div className='m-auto items-center bg-gray-100'>
        <h1 className={`text-3xl p-5 bg-gray-100 font-extralight text-amber-500 max-w-7xl`}>
        My Documents</h1>        
        <Documents></Documents>
    </div>
  )
}

export default dashboard