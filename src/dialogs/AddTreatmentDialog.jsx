import React, { useState} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import { useSelector} from 'react-redux';


const AddTreatmentDialog = (props) => {
  const url =  useSelector(state=>state.auth.url);
  const [brands,setBrands] = useState([]);
  const [bodypart,setBodyParts] = useState('');
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [isShow,setIsShow] = useState(true);

  const save = () =>{
    const data = {
    code:code, 
    name:name, 
    bodyParts:bodypart,
    description:description
    }
    axios.post(url+'api/treatment-list',data)
    .then(function (response) {
      setIsShow(false);
      window.location.reload(true);
     })
  }
  
  return (
    <div>
        {isShow && <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Create New Treatment</b></DialogTitle>
        <DialogContent>
        <div className='row form-group'>
            <div className='col-12'>
            <label htmlFor="">Code:</label>
            <input type="text" className='form-control' onChange={(e)=>setCode(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Name:</label>
            <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Body Parts:</label>
            <select name="" id="" onChange={(e)=>setBodyParts(e.target.value)} className='form-control'>
                <option value="">Choose Body Part</option>
                <option value="Face">Face</option>
                <option value="Body">Body</option>
                <option value="Body Injection">Body Injection</option>
            </select>
            </div>
            <div className='col-12 mt-2'>
            <label htmlFor="">Description:</label>
            <textarea className='form-control' onChange={(e)=>setDescription(e.target.value)}></textarea>
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

export default AddTreatmentDialog