import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import axios from 'axios'
import { useSelector} from 'react-redux';

const AddSupplierDialog = (props) => {
  const url =  useSelector(state=>state.auth.url);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [isShow,setIsShow] = useState(true);

  const save = () =>{
    const data = {
    phone:phone, 
    name:name, 
    address:address
    }
    axios.post(url+'api/supplier',data)
    .then(function (response) {
      setIsShow(false);
      window.location.reload(true);
     })
  }
  
  return (
    <div>
        {isShow && <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Create New Suppllier</b></DialogTitle>
        <DialogContent>
        <div className='row form-group'>
            <div className='col-12 mt-2'>
            <label htmlFor="">Name:</label>
            <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Phone:</label>
            <input type="number" className='form-control' onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Address:</label>
            <textarea className='form-control' onChange={(e)=>setAddress(e.target.value)}></textarea>
            </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={save}>Create</Button>
        </DialogActions>
      </Dialog>}
    </div>
  )
}

export default AddSupplierDialog