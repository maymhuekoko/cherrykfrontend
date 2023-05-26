import React,{useState,useEffect} from 'react'
import Nav from '../components/Navbar'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import RepayDialog from '../dialogs/RepayDialog';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector} from 'react-redux';

const Badge = styled.span`
background:rgb(0,7,51);
padding:0px 4px;
color:white;
border:none;
border-radius:4px;
`
const Payment = () => {
  const [isShow,setIsShow] = useState(false);
  const patient_id = useLocation().pathname.split('/')[2];
  const treatment_selection_id = useLocation().pathname.split('/')[3];
  const [selection,setSelection] = useState([]);
  const [select,setSelect] = useState([]);
  const [selectiondone,setSelectionDone] = useState([]);
  const [repayment,setRepayment] = useState([]);
  const [tamount,setTamount] = useState(0);
  const [appointments,setAppointments] = useState([]);
  const [pmethod, setPmethod] = useState('');
  const [tid,setTid] = useState('');
  const [ptId,setPtId] = useState('');
  const [credit,setCredit] = useState('');
  const [hide,setHide] = useState(false);
  const [hide1,setHide1] = useState(false);
  const url =  useSelector(state=>state.auth.url);
  
  useEffect(()=>{
   getSelection();
   getSelect();
   getRepayment()
  },[])

  const getSelection = async () =>{
    const data = {
      relatedPatient:patient_id,
    }
    axios.post(url+'api/treatment-vouchers/filter',data)
     .then(function (response) {
      
         setSelection(response.data.data.filter((el)=>el.relatedTreatmentSelection._id  == treatment_selection_id));
     })
    // const filterd = res.data.list.filter((el)=>el.relatedPatient._id == patient_id && el.leftOverAmount == 0);
    
    // setSelectionDone(filterd);
  }
   const getSelect = async () =>{
    const data = {
      relatedPatient:patient_id,
    }
    axios.post(url+'api/treatment-selections/filter',data)
     .then(function (response) {
      console.log('select');
      console.log(response.data.data);
         setSelect(response.data.data.filter((el)=>el._id  == treatment_selection_id));
     })
    // const filterd = res.data.list.filter((el)=>el.relatedPatient._id == patient_id && el.leftOverAmount == 0);
    
    // setSelectionDone(filterd);
  }
  const getRepayment = async () => {
    const res =await axios.get(url+'api/repayments');
    console.log('hoho')
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
            <h4 className='mt-2'>Treatment Payment Report</h4>
            <div className='row mt-3'>
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
            <div className='row'> 
            <div className='offset-10'>  
            <button className='btn btn-m btn-outline-primary  mt-3' onClick={()=>{setIsShow(true);setCredit(select[0].leftOverAmount);setPtId(select[0]._id);setTid(select[0].relatedTreatment._id);setAppointments(select[0].relatedAppointments);setPmethod(select[0].paymentMethod);setTamount(select[0].totalAmount)}}>Repayment</button>
            </div>
            
            </div>
            
                <table className='table table-hover mt-4'>
                <thead>
                <tr>
                <td>#</td>
                <td>Code</td>
                <td>Amount</td>
                {/* <td>Doctor Name</td> */}
                <td>Pay Method</td>
                <td>Type</td>
                <td>Date</td>
                {/* <td></td> */}
                </tr>
                </thead>
                <tbody>
                {selection.map((sel,i)=>(
                <>
                <tr>
                <td>{++i}</td>
                <td>{sel.code}</td>
                <td>{sel.amount}</td>
                {/* <td>Test Dr.1</td> */}
                <td>{sel.paymentMethod}</td>
                <td>{sel.paymentType}</td>
                <td>{sel.createdAt}</td>     
                </tr>
                
                  </>
                ))}
                </tbody>
                </table>
           
            </div>
        </div>
        <RepayDialog open={isShow} close={()=>setIsShow(false)} patientTreatmentId={ptId} credit={credit} tid={tid} pid={patient_id} appointments={appointments} method={pmethod} total={tamount}/>
    </div>
   
  )
}

export default Payment