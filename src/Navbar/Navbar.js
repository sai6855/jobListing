import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <div className='navbar'>
            <ul>
                <Link to='/jobs'>
                <li>Create a job</li>
                </Link>
                <Link to='/applicants'>
                <li>Applicant Form</li>
                </Link>
            </ul>
        </div>
    )
}

export default Navbar
