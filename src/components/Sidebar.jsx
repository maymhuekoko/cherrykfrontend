import React from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import {FaHome,FaClock,FaUserInjured,FaBars,FaSearch, FaAngleDown,FaListUl,FaRegRegistered,FaCreditCard} from 'react-icons/fa';
import {MdOutlineCardMembership,MdCreate,MdHome} from 'react-icons/md'
import {GoReport} from 'react-icons/go'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import SidebarMenu from './SidebarMenu';

const routes= [
    {
        path : '/',
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
                name : 'Create', 
                icon : <MdCreate/>   ,
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
                path : '/treatment/list',
                name : 'Treatment List', 
                icon : <FaListUl/>   ,
            },
            {
                path : '/treatment/create',
                name : 'Treatment Create', 
                icon : <FaRegRegistered/>   ,
            },
        ],
    },
    
]

const Sidebar = ({children}) => {
  const [isOpen,setIsOpen] = useState(false); 

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
        <motion.div 
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
            className='logo'>Cherry K</motion.h1>}
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
        </motion.div>
        <main>
            {children}
        </main>
    </div>
  )
}

export default Sidebar