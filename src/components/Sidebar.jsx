import React from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import {FaHome,FaClock,FaUserInjured,FaBars,FaSearch, FaAngleDown,FaListUl,FaRegRegistered,FaCreditCard,FaUserCog} from 'react-icons/fa';
import {MdOutlineCardMembership,MdCreate,MdHome,MdAccountBalance} from 'react-icons/md'
import {HiUserGroup} from 'react-icons/hi'
import {BiPurchaseTag} from 'react-icons/bi'
import {GoReport} from 'react-icons/go'
import {GiReceiveMoney} from 'react-icons/gi'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import { useLocation } from 'react-router-dom';
import { useSelector} from 'react-redux';

const routes= [
    {
        path : '/dashboard',
        name : 'Home', 
        icon : <FaHome/>   ,
    },
    {
        path : '/appointment',
        name : 'Appointment', 
        icon : <FaClock/>   ,
        subRoutes : [
            {
                path : '/appointment/list',
                name : 'List', 
                icon : <FaListUl/>,
            },
            {
                path : '/appointment/create',
                name : 'Register', 
                icon : <FaRegRegistered/>   ,
            },
        ],
    },
    {
        path : '/patient',
        name : 'Patient', 
        icon : <FaUserInjured/>,
        subRoutes : [
            {
                path : '/patient/list',
                name : 'List', 
                icon : <FaListUl/>   ,
            },
            {
                path : '/patient/register',
                name : 'Register', 
                icon : <FaRegRegistered/>   ,
            },
            {
                path : '/patient/member',
                name : 'Member', 
                icon : <MdOutlineCardMembership/>   ,
            },
            {
                path : '/patient/credit_list',
                name : 'Credit', 
                icon : <FaCreditCard/>   ,
            },
        ],
    },
    {
        path : '/admin',
        name : 'Admin', 
        icon : <FaUserCog/>,
        subRoutes : [
            {
                path : '/stockcount',
                name : 'Stock Count & Price', 
                icon : <MdAccountBalance/>   ,
            },
            {
                path : '/purchase',
                name : 'Purchase List', 
                icon : <BiPurchaseTag/>   ,
            },
            {
                path : '/supplier',
                name : 'Supplier List', 
                icon : <HiUserGroup/>   ,
            },
        ],
    },
    {
        path : '/report',
        name : 'Report', 
        icon : <GoReport/>,
        subRoutes : [
            {
                path : '/reports/payment',
                name : 'Payment List', 
                icon : <FaListUl/>   ,
            },
            
        ],
    },
    {
        path : '/master',
        name : 'Master', 
        icon : <MdHome/>,
        subRoutes : [
            {
                path : '/category',
                name : 'Category List', 
                icon : <FaListUl/>   ,
            },
            {
                path : '/subcategory',
                name : 'SubCategory List', 
                icon : <FaListUl/>   ,
            },
            {
                path : '/brand',
                name : 'Brand List', 
                icon : <FaListUl/>   ,
            },
            {
                path : '/medicine',
                name : 'Medicine List', 
                icon : <FaListUl/>   ,
            },
            {
                path : '/procedure_medicine',
                name : 'Procedure Medicine', 
                icon : <FaListUl/> ,
            },
            {
                path : '/procedure_accessory',
                name : 'Procedure Accessory', 
                icon : <FaListUl/> ,
            },
            {
                path : '/machinery',
                name : 'Machinery List', 
                icon : <FaListUl/> ,
            },
            {
                path : '/treatment',
                name : 'Treatment Create', 
                icon : <FaRegRegistered/>   ,
            },
            {
                path : '/treatment/list',
                name : 'Treatment List', 
                icon : <FaListUl/>   ,
            },
            
        ],
    },
    {
        path : 'http://clinicdenovofinance.kwintechnologies.com/',
        name : 'Finance', 
        icon : <GiReceiveMoney/> ,
    },
    
]

const Sidebar = ({children}) => {
  const [isOpen,setIsOpen] = useState(false);
  const location = useLocation().pathname;
  const auth =  useSelector(state=>state.auth.login);

  const toggle = () => setIsOpen(!isOpen);
   
  const inputAnimation = {
    hidden:{
        width:0,
        padding:0,
        opacity:0,
        transition:{
            duration : 0.2,
        },
    },
    show:{
        width: "160px",
        padding: "5px 15px",  
        opacity:1,
        transition:{
            duration : 0.2,
        },
    }
  }

  const showAnimation = {
    hidden:{
        width:0,
        opacity:0,
        transition:{
            duration : 0.5,
        },
    },
    show:{
        width: "auto",
        opacity:1,
        transition:{
            duration : 0.2,
        },
    }
  }

  return (  
    <div className='main-container'>
        {location != '/' && auth && <motion.div 
        animate={{
            width: isOpen ? '200px':'37px',
            transition:{
                duration:0.5,
                type:'spring',
                damping: 11,
            }
        }} 
        className='sidebar'>
        <div className="top_section">
            {isOpen && <motion.h1 
            variants={showAnimation}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='logo'>Clinic Denovo</motion.h1>}
            <div className="bars"><FaBars onClick={toggle}/></div>
        </div>
        <div className="search">
            <div className="search_icon"><FaSearch/></div>
            <AnimatePresence>
            {isOpen && 
            <motion.input type="text" 
            variants={inputAnimation }
            initial='hidden'
            animate='show'
            exit='hidden'
             placeholder='search...'/>}
            </AnimatePresence>
        </div>
        <section className='routes'>
         {
            routes.map((route) => {
                if(route.subRoutes){
                    return (
                    <SidebarMenu showAnimation={showAnimation} route={route} isOpen={isOpen} setIsOpen={setIsOpen} key={route.nan}/>
                    )
                }
                
                return (
                <NavLink activeClassName='active' to={route.path} key={route.name} className='link'>
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                    {isOpen && 
                    <motion.div variants={showAnimation}
                     initial='hidden'
                     animate='show'
                     exit='hidden'
                     className="link_text">{route.name}</motion.div>}
                    </AnimatePresence>
                </NavLink>
                )
})
         }
        </section>
        </motion.div>}
        {location != '/' && !auth ? <img src={require('../../src/401.png')} width='900px'/> :
        <main>
            {children}
        </main>}
        {/* {location = '/' ?  <main>
            {children}
        </main> : <img src={require('../../src/404.png')} width='900px'/>} */}
    </div>
  )
}

export default Sidebar