import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import axios from 'axios'
import { useSelector} from 'react-redux';

const AddItemDialog = (props) => {
  const url =  useSelector(state=>state.auth.url);
  const [brands,setBrands] = useState([]);
  const [brandid,setBrandId] = useState('');
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [isShow,setIsShow] = useState(true);

  useEffect(()=>{
    getBrands();
  },[])

  const getBrands = async () =>{
    const res = await axios.get(url+'api/brands');
    setBrands(res.data.data)
  }

  const save = () =>{
    const data = {
    code:code, 
    name:name, 
    relatedBrand:brandid,
    description:description
    }
    axios.post(url+'api/medicine-list',data)
    .then(function (response) {
      setIsShow(false);
      window.location.reload(true);
     })
  }
  
  return (
    <div>
        {isShow && <Dialog open={props.open} onClose={props.close}>
        <DialogTitle  className='text-center'><b>Create New Item</b></DialogTitle>
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
            <label htmlFor="">Brand:</label>
            <select name="" id="" onChange={(e)=>setBrandId(e.target.value)} className='form-control'>
                <option value="">Choose Related Brand</option>
                {
                  brands.map((brand,j)=>(
                    <option value={brand._id}>{brand.name}</option>
                  ))
                }
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

export default AddItemDialog