import React,{useState,useEffect} from 'react'
import Nav from '../components/Navbar'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import RepayDialog from '../dialogs/RepayDialog';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Badge = styled.span`
background:rgb(0,7,51);
padding:0px 4px;
color:white;
border:none;
border-radius:4px;
`
const Payment = () => {
  const [isShow,setIsShow] = useState(false);
  const [selection,setSelection] = useState([]);
  const [selectiondone,setSelectionDone] = useState([]);
  const [repayment,setRepayment] = useState([]);
  const [ptId,setPtId] = useState('');
  const [credit,setCredit] = useState('');
  const [hide,setHide] = useState(false);
  const [hide1,setHide1] = useState(false);
  const url =  useSelector(state=>state.auth.url);
  
  useEffect(()=>{
   getSelection();
   getRepayment()
  },[])

  const getSelection = async () =>{
    const res =await axios.get(url+'api/patient-treatments');
    console.log(res.data.data);
    const filter = res.data.list.filter((el)=> el.leftOverAmount != 0);
    const filterd = res.data.list.filter((el)=> el.leftOverAmount == 0);
    setSelection(filter);
    setSelectionDone(filterd);
  }
  const getRepayment = async () => {
    const res =await axios.get(url+'api/repayments');
    console.log(res.data.list[0].relatedPateintTreatment._id);
    setRepayment(res.data.list)
  }

  const toggle = (id) =>{
      if(hide){
      document.getElementById('toggle'+id).removeAttribute('hidden');
      setHide(!hide);
      }else{
        document.getElementById('toggle'+id).setAttribute('hidden','hidden');
      setHide(!hide);
      }
  }
  const toggle1 = (id) =>{
    if(hide1){
    document.getElementById('toggle1'+id).removeAttribute('hidden');
    setHide1(!hide1);
    }else{
      document.getElementById('toggle1'+id).setAttribute('hidden','hidden');
    setHide1(!hide1);
    }
}
  
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
                </thead>
                <tbody>
                {selection.map((select,i)=>(
                <>
                <tr>
                <td>{++i}</td>
                <td>{select.relatedTreatment.treatmentName}</td>
                <td><Badge>Ongoing</Badge></td>
                <td>Test Dr.1</td>
                <td>{select.relatedTreatment.treatmentTimes} Times</td>
                <td>{select.relatedTreatment.sellingPrice}</td>
                <td>{select.leftOverAmount}</td>
                <td>
                <button className='btn btn-m btn-outline-primary'>Detail</button>&nbsp;
                <button className='btn btn-m btn-outline-primary' onClick={()=>toggle(select._id)}>Related</button>&nbsp;
                <button className='btn btn-m btn-outline-primary' onClick={()=>{setIsShow(true);setCredit(select.leftOverAmount);setPtId(select._id)}}>Repay</button>
                </td>
                </tr>
                <tr id={'toggle'+select._id} hidden>
                <td colSpan='8'>
                  <table className='table table-striped'>
                  <thead>
                    <th>NO.</th>
                    <th>Date</th>
                    <th>Pay Amount</th>
                    <th>Description</th>
                  </thead>
                  <tbody>
                  {
                    repayment.map((repay,i)=>(
                      repay.relatedPateintTreatment._id == select._id && 
                      <tr>
                        <td>{++i}</td>
                        <td>{repay.repaymentDate}</td>
                        <td>{repay.repaymentAmount}</td>
                        <td>{repay.description}</td>
                      </tr>
                    ))
                  }
                  </tbody>
                  </table>
                </td>
                </tr>
                  </>
                ))}
                </tbody>
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
                <tbody>
                {selectiondone.map((selectd,i)=>(
                  <>
                <tr>
                <td>{++i}</td>
                <td>{selectd.relatedTreatment.treatmentName}</td>
                <td><Badge>Ongoing</Badge></td>
                <td>Test Dr.1</td>
                <td>{selectd.relatedTreatment.treatmentTimes} Times</td>
                <td>{selectd.relatedTreatment.sellingPrice}</td>
                <td>{selectd.leftOverAmount}</td>
                <td>
                <button className='btn btn-m btn-outline-primary'>Detail</button>&nbsp;
                <button className='btn btn-m btn-outline-primary' onClick={()=>toggle1(selectd._id)}>Related</button>&nbsp;
                <button className='btn btn-m btn-outline-primary' onClick={()=>{setCredit(selectd.leftOverAmount);setPtId(selectd._id)}}>Confirm</button>
                </td>
                </tr>
                <tr id={'toggle1'+selectd._id} hidden>
                <td colSpan='8'>
                  <table className='table table-striped'>
                  <thead>
                    <th>NO.</th>
                    <th>Date</th>
                    <th>Pay Amount</th>
                    <th>Description</th>
                  </thead>
                  <tbody>
                  {
                    repayment.map((repay,i)=>(
                      repay.relatedPateintTreatment._id == selectd._id && 
                      <tr>
                        <td>{++i}</td>
                        <td>{repay.repaymentDate}</td>
                        <td>{repay.repaymentAmount}</td>
                        <td>{repay.description}</td>
                      </tr>
                    ))
                  }
                  </tbody>
                  </table>
                </td>
                </tr>
                 </>
                ))}
                </tbody>
                </table>
            </TabPanel>
            </Tabs>
            </div>
        </div>
        <RepayDialog open={isShow} close={()=>setIsShow(false)} patientTreatmentId={ptId} credit={credit}/>
    </div>
   
  )
}

export default Payment