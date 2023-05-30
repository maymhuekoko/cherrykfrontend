import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import axios from 'axios'
import { useSelector} from 'react-redux';

const RepayDialog = (props) => {
  const [amount,setAmount] = useState('')
  const [date,setDate] = useState('')
  const [description,setDescription] = useState('')
  const [isShow,setIsShow] = useState(true);
  const [isCash,setIsCash] = useState(false);
  const [accounts,setAccounts] = useState([]);
  const [accountings,setAccountings] = useState([]);
  const [bankacc,setBankAcc] = useState('');
  const [method,setMethod] = useState('');
  const [aid,setAid] = useState();
  const [isAppointment,setIsAppointment] = useState('');
  const [isPrint,setIsPrint] = useState(false);
  const [remain,setRemain] = useState(0);
  const url =  useSelector(state=>state.auth.url);
  console.log(props.credit);
  const navigate = useNavigate();
 
  useEffect(()=>{
    const getAccounts = async () =>{
      try{
        const res = await axios.get(url+'api/accounting-lists');
        setAccounts(res.data.list);
        setAccountings(res.data.list);
        console.log(res.data.list);
      }catch(err){}
    };
    getAccounts();
  },[])

  const getPaymentType = (type) => {
    if(type == 1){
      setIsAppointment(false);
    }
    if(type == 2){
      setIsAppointment(true);
    }
  }

  const save = () =>{
    const data = {
    paidAmount:amount,
    relatedTreatment:props.tid, 
    relatedAppointment:aid,
    relatedPatient:props.pid,
    relatedBank:bankacc, //must be bank acc from accounting accs
    paymentType:method, //enum: ['Bank','Cash'],
    relatedCash:bankacc, //must be cash acc from accounting accs
    id:props.patientTreatmentId
    }

    axios.put(url+'api/treatment-selections/payment',data)
    .then(function (response) {
      setIsShow(false);
      if(isPrint){
        navigate('/voucher/'+response.data.treatmentVoucherResult._id,
        {
          state: {
              left: remain,
          },
      });
      }else{
        window.location.reload(true);
      }
      // 
      
     })
  }
  const getPaymentMethod = (val) => {
    // alert(val);
    setMethod(val);
      if(val == 'Cash'){setAccounts(accountings.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash In Hand'))}
      if(val == 'Bank'){setAccounts(accountings.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash At Bank'))}
      setIsCash(true);
      // document.getElementById('paid').value = 0;
  }
  const print = () =>{
    if(document.getElementById('print').checked){
      setIsPrint(true);
    }else{
      setIsPrint(false);
    }
  }
  
  return (
    <div>
        {isShow && <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Patient Credit Detail</b></DialogTitle>
        <DialogContent>
        <div className='row form-group'>
            {/* <div className='col-12 mt-2 form-group '>
            <label>Payment Type<span>*</span></label>
            <select className='form-control' onChange={(e)=>getPaymentType(e.target.value)}>
            <option>Select Payment Type</option>
            <option value="1">Lumpsam</option>
            <option value="2">By Appointment</option>
            </select>
            </div> */}
            <div className='col-12 mt-2 form-group'>
            <label>Select Appointment<span>*</span></label>
            <select className='form-control' onChange={(e)=>setAid(e.target.value)}>
            <option>Select Appointment</option>
            {props.appointments.map((app,i)=>(
            <option value={app._id}>{app.originalDate}</option>
            ))}
            </select>
            </div>
            {props.method != 'Cash Down' && <div className='col-12 mt-2 form-group '>
            <label>Payment Method<span>*</span></label>
            <select className='form-control' onChange={(e)=>getPaymentMethod(e.target.value)}>
            <option>Select Payment Method</option>
    
            <option value="Cash">Cash Down</option>
            <option value="Bank">Bank</option>
            </select>
            </div>}
            {isCash && <div className='col-12 mt-2 form-group'>
            <label>Bank Information<span>*</span></label>
            <select className='form-control' onChange={(e)=>setBankAcc(e.target.value)}>
            <option>Select Account</option>
            {accounts.map((account,i)=>(
            <option value={account._id}>{account.name}</option>
            ))}
            </select>
            </div>}
            
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Amount:  </label>
            {props.credit != 0 &&<input type="number" className='form-control' onChange={(e)=>{setAmount(e.target.value);setRemain(props.credit-e.target.value);}}/>}
            {props.credit == 0 &&<input type="number" className='form-control' onChange={(e)=>{setAmount(e.target.value-props.total);setRemain(props.total-e.target.value);}}/>}
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Remaining Amount:</label>
            <input type="number" className='form-control' value={remain}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Date:</label>
            <input type="date" className='form-control' onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Description:</label>
            <textarea className='form-control' onChange={(e)=>setDescription(e.target.value)}></textarea>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Print</label>
            <input type="checkbox" className='ml-3' name="print"  id="print" onClick={print}/>
            </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={save}>Pay</Button>
        </DialogActions>
      </Dialog>}
    </div>
  )
}

export default RepayDialog