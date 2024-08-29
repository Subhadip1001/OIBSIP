import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar';

export default function Home() {

  return (
    <div>
        <Navbar/>
        <h1>Welcome! to this login page</h1>
    </div>
  )
}
