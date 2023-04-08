import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import axios from 'axios'
import { useSelector} from 'react-redux';

const AddCreditDialog = (props) => {
  const [pay,setPay] = useState('')
  const [isShow,setIsShow] = useState(true);
  const url =  useSelector(state=>state.auth.url);

  const save = () =>{
    const data = {
        id:props.id,
        creditAmount:props.credit,
        payAmount:pay}
    axios.put(url+'api/suppliers/pay',data)
    .then(function (response) {
      setIsShow(false);
      window.location.reload(true);
     })
  }
  
  return (
    <div>
        {isShow && <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Pay Credit Amount</b></DialogTitle>
        <DialogContent>
        <div className='row form-group'>
            <div className='col-12'>
            <label htmlFor="">Credit Amount:</label>
            <input type="number" className='form-control' value={props.credit}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Amount:</label>
            <input type="number" className='form-control' onChange={(e)=>setPay(e.target.value)}/>
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

export default AddCreditDialog