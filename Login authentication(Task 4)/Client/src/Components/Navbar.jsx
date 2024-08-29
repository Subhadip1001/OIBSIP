import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar'>
        <div className="btn-sec">
            <Link to="/singup" ><button type="button" className="btn btn-primary">Sign up</button></Link>
            <Link to="/login"><button type="button" className="btn btn-success">Login</button></Link>
        </div>
    </div>
  )
}
