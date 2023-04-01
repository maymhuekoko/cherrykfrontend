import React from 'react'
import {AiOutlineArrowLeft,AiOutlineCalendar,AiOutlineNotification} from "react-icons/ai"
import {FaUserMd,FaUserCircle} from "react-icons/fa"
import {BiDownArrow,BiLogOut} from "react-icons/bi"
import { useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../redux/authRedux';
import Swal from "sweetalert2";

const Navbar = () => {
  const user =  useSelector(state=>state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () =>{
    Swal.fire({
      title: "Success",
      text: "successfully Logout!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
    dispatch(logoutSuccess())
    navigate('/');
    })
  }
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
              {user.name}
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#"><FaUserCircle   className='mr1'/>My Profile</a></li>
              <li><a className="dropdown-item text-danger" href="#">Another Action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#" onClick={logout}><BiLogOut   className='mr1'/>Logout</a></li>
            </ul>
          </div>
        </div>
    </nav>
  )
}

export default Navbar