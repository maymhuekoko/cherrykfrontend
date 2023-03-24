import React,{useState} from 'react'
import Nav from '../components/Navbar'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import RepayDialog from '../dialogs/RepayDialog';

const Badge = styled.span`
background:rgb(0,7,51);
padding:0px 4px;
color:white;
border:none;
border-radius:4px;
`
const Payment = () => {
  const [isShow,setIsShow] = useState(false);
  return (
    <div>
        <Nav/>
        <div className='card mt-5'>
            <div className='card-body'>
            <Tabs>
            <TabList>
            <Tab>Outstanding</Tab>
            <Tab>Well Done</Tab>
            </TabList>
            <div className='row mt-5'>
                <div className='col-10'>
                <div className='row form-group'>
                <div className='col-4'>
                <label htmlFor="">From Date:</label>
                <input type="date" className='form-control'/>
                </div>
                <div className='col-4'>
                <label htmlFor="">To Date:</label>
                <input type="date" className='form-control'/>
                </div>
                <div className='col-4'>
                <button className='btn btn-m btn-primary mt-4'>Search</button>&nbsp;&nbsp;
                <button className='btn btn-m btn-success mt-4'>Print</button>
                </div>
                </div>
                </div>
                <div className='col-2'>
                <input type="text" placeholder='Search....' className='form-control mt-4'/>
                </div>
            </div>
            <TabPanel>
                <h4 className='mt-4'>Outstanding Report</h4>
                <table className='table table-hover mt-4'>
                <thead>
                <tr>
                <td>#</td>
                <td>treatment Unit Code</td>
                <td>Status</td>
                <td>Doctor Name</td>
                <td>Times</td>
                <td>Total Amount</td>
                <td>Left-Over Amount</td>
                <td>Action</td>
                </tr>
                <tr>
                <td>1</td>
                <td>TM-001</td>
                <td><Badge>Ongoing</Badge></td>
                <td>Test Dr.1</td>
                <td>3 Times</td>
                <td>50000</td>
                <td>30000</td>
                <td>
                <button className='btn btn-m btn-outline-primary'>Detail</button>&nbsp;
                <button className='btn btn-m btn-outline-primary'>Related</button>&nbsp;
                <button className='btn btn-m btn-outline-primary' onClick={()=>setIsShow(true)}>Repay</button>
                </td>
                </tr>
                </thead>
                </table>
            </TabPanel>
            <TabPanel>
                <h4 className='mt-4'>Welldone Report</h4>
                <table className='table table-hover mt-4'>
                <thead>
                <tr>
                <td>#</td>
                <td>treatment Unit Code</td>
                <td>Status</td>
                <td>Doctor Name</td>
                <td>Times</td>
                <td>Total Amount</td>
                <td>Left-Over Amount</td>
                <td>Action</td>
                </tr>
                </thead>
                </table>
            </TabPanel>
            </Tabs>
            </div>
        </div>
        <RepayDialog open={isShow} close={()=>setIsShow(false)}/>
    </div>
   
  )
}

export default Payment