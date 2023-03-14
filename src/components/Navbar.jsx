import React from 'react'
import {AiOutlineArrowLeft,AiOutlineCalendar,AiOutlineNotification} from "react-icons/ai"
import {FaUserMd,FaUserCircle} from "react-icons/fa"
import {BiDownArrow,BiLogOut} from "react-icons/bi"

const Navbar = () => {
  return (
    <nav className="nav">
        <div className="left">
        <AiOutlineArrowLeft  className='mr' style={{marginLeft:15}}/>
        <span>Aesthetic Clinic</span>
        </div>
        <div className="right">
          <AiOutlineCalendar  className='mr'/>
          <AiOutlineNotification className='mr'/>
          <FaUserMd className='mr'/>
        <div className="btn-group">
            <button type="button" className="btn text-white dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Test Dr.2
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#"><FaUserCircle   className='mr1'/>My Profile</a></li>
              <li><a className="dropdown-item text-danger" href="#">Another Action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#"><BiLogOut   className='mr1'/>Logout</a></li>
            </ul>
          </div>
        </div>
    </nav>
  )
}

export default Navbar