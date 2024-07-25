import React from 'react'
import Navbar from '../components/Navbar';

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <Navbar></Navbar>
        {children}
    </div>
  )
}

export default layout