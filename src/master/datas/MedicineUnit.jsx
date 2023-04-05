import React,{useState,useEffect} from 'react'
import Nav from '../../components/Navbar'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";

const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 10px;
border:none;
border-radius:10px;
`

const MedicineUnit = () => {
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [currqty,setCurrQty] = useState('');
  const [reqty,setReQty] = useState('');
  const [from,setFrom] = useState('');
  const [to,setTo] = useState('');
  const [purchase,setPurchasePrice] = useState('');
  const [sell,setSellPrice] = useState('');
  const [percent,setPercent] = useState('');
  const [units,setUnits] = useState([]);
  const url =  useSelector(state=>state.auth.url);
  const itemid = useLocation().pathname.split('/')[2];
  const itemname = useLocation().pathname.split('/')[3];


  useEffect(()=>{
    getUnits();
    
  },[])
  const getUnits = async () =>{
    const res = await axios.get(url+'api/medicine-items');
    console.log(res.data.list);
    setUnits(res.data.list.filter((el)=>el.name._id == itemid));
  }
  const create = () =>{
    const data={
      code:code, 
      name:itemid, 
      medicineItemName:name,
      currentQuantity:currqty,
      reorderQuantity:reqty,
      purchasePrice:purchase,
      sellingPrice:sell,
      description:description,
      fromUnit:from,
      toUnit:to,
    }
    axios.post(url+'api/medicine-item',data)
    .then(function (response){
      Swal.fire({
        title: "Success",
        text: "successfully Login!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.reload(true);
        })
    }).catch(error =>{
      Swal.fire({
        title: "Error",
        text: "Something Wrong!",
        icon: "error",
        confirmButtonText: "CANCEL",
      })
    }) 
  }

  return (
    <div>
        <Nav/>
        <h5 className='font-weight-bold mt-3'>Medicine Unit List</h5>
        <div className='row mt-3'>
          <div className='col-9'>
          <div className='card'>
            <div className='card-body'>
              <h6>{itemname}'s Unit</h6>
            <div className='table-responsive'>
            <table className="table table-hover" style={{width:'1200px'}}>
            <thead>
              <tr>
              <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Current Qty</th>
                <th scope="col">Reorder Qty</th>
                <th scope="col">Purchase Price</th>
                <th scope="col">Selling Price</th>
                <th scope="col">Unit Convention</th>
                <th scope="col">Description</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                units.map((unit,i)=>(
                    <tr key={unit._id}>
                     <td>{++i}</td>
                     <td>{unit.code}</td>
                     <td>{unit.medicineItemName}</td>
                     <td>{unit.currentQuantity}</td>
                     <td>{unit.reOrderQuantity}</td>
                     <td>{unit.purchasePrice}</td>
                     <td>{unit.sellingPrice}</td>
                     <td>1</td>
                     <td>{unit.description}</td>
                     <td>
                    <IconButton aria-label="delete">
                    <DeleteIcon className='text-danger'/>
                    </IconButton>
                    <IconButton aria-label="edit">
                    <EditIcon className='text-warning'/>
                    </IconButton>
                    </td>

                    </tr>
                ))
              }
            </tbody>
          </table>
          </div>
            </div>
          </div>
          </div>
          <div className='col-3'>
          <div className='card'>
            <div className='card-body'>
               <div className='p-2'>
              <h5>Create Item</h5>
              <div class='row form-group mt-4'>
              <label htmlFor="">Code</label>
              <input type="text" className='form-control' onChange={(e)=>setCode(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Name</label>
              <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div class='row form-group mt-4'>
              <label htmlFor="">Current Quantity</label>
              <input type="number" className='form-control' onChange={(e)=>setCurrQty(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Reorder Quantity (optional)</label>
              <input type="number" className='form-control' onChange={(e)=>setReQty(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Unit Convertion (optional)</label>
              <div className='col-7'>
              <input type="number" className='form-control' placeholder='From' onChange={(e)=>setFrom(e.target.value)}/>
              </div>
              <div className='col-5'>
              <input type="number" className='form-control' placeholder='To' onChange={(e)=>setTo(e.target.value)}/>
              </div>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Purchase Price</label>
              <input type="number" className='form-control' onChange={(e)=>setPurchasePrice(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Selling Price</label>
              <div className='col-7'>
              <input type="number" className='form-control' onChange={(e)=>setSellPrice(e.target.value)}/>
              </div>
              <div className='col-5'>
              <input type="number" className='form-control' placeholder='%' onChange={(e)=>setPercent(e.target.value)}/>
              </div>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Description</label>
              <textarea name="" id="" cols="30" rows="3" className='form-control' onChange={(e)=>setDescription(e.target.value)}></textarea>
              </div>
              <div className='row text-center mt-4'>
              <Button onClick={create}>Save</Button>
              </div>
              </div>
              
            </div>

          </div>
          </div>
        </div>
    </div>
  )
}

export default MedicineUnit