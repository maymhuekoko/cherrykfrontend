import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import axios from 'axios'

const RepayDialog = (props) => {
  const [amount,setAmount] = useState('')
  const [date,setDate] = useState('')
  const [description,setDescription] = useState('')
  const [isShow,setIsShow] = useState(true);
  console.log(props.credit);

  const save = () =>{
    const data = {
    remaningCredit:props.credit, 
    description:description, 
    relatedPateintTreatment:props.patientTreatmentId,
    repaymentDate:date,
    repaymentAmount:amount}
    axios.post('http://localhost:9000/api/repayment',data)
    .then(function (response) {
      alert('success')
      setIsShow(false);
     })
  }
  
  return (
    <div>
        {isShow && <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Patient Credit Detail</b></DialogTitle>
        <DialogContent>
        <div className='row form-group'>
            <div className='col-12'>
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