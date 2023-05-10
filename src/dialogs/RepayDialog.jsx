import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom';
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
  const url =  useSelector(state=>state.auth.url);
  console.log(props.credit);
 
  useEffect(()=>{
    const getAccounts = async () =>{
      try{
        const res = await axios.get(url+'api/accounting-lists');
        setAccounts(res.data.list);
        setAccountings(res.data.list);
      }catch(err){}
    };
    getAccounts();
  },[])

  const save = () =>{
    const data = {
    remaningCredit:props.credit, 
    description:description, 
    relatedPateintTreatment:props.patientTreatmentId,
    repaymentDate:date,
    repaymentAmount:amount,
    relatedBank:bankacc,
    relatedCash:bankacc
    }

    axios.post(url+'api/repayment',data)
    .then(function (response) {
      setIsShow(false);
      window.location.reload(true);
     })
  }
  const getPaymentMethod = (val) => {
      if(val == 'Cash'){setAccounts(accountings.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash In Hand'))}
      if(val == 'Bank'){setAccounts(accountings.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash At Bank'))}
      setIsCash(true);
      document.getElementById('paid').value = 0;
  }
  
  return (
    <div>
        {isShow && <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Patient Credit Detail</b></DialogTitle>
        <DialogContent>
        <div className='row form-group'>
            <div className='col-12 mt-2 form-group '>
            <label>Payment Method<span>*</span></label>
            <select className='form-control' onChange={(e)=>getPaymentMethod(e.target.value)}>
            <option>Select Payment Method</option>
            {/* <option value="Credit">Credit</option> */}
            <option value="Cash">Cash</option>
            <option value='Bank'>Bank</option>
            </select>
            </div>
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
            <label htmlFor="">Pay Amount:</label>
            <input type="number" className='form-control' onChange={(e)=>setAmount(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Date:</label>
            <input type="date" className='form-control' onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Description:</label>
            <textarea className='form-control' onChange={(e)=>setDescription(e.target.value)}></textarea>
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