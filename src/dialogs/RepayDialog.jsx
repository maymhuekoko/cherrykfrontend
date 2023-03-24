import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import axios from 'axios'

const RepayDialog = (props) => {
  return (
    <div>
        <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Patient Credit Detail</b></DialogTitle>
        <DialogContent>
        <div className='row form-group'>
            <div className='col-12'>
            <label htmlFor="">Pay Amount:</label>
            <input type="number" className='form-control'/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Date:</label>
            <input type="date" className='form-control'/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Pay Description:</label>
            <textarea className='form-control'></textarea>
            </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button>Pay</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RepayDialog