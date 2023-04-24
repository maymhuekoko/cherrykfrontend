import React,{useState,useEffect} from 'react'
import Nav from '../../components/Navbar'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {RxCross2} from 'react-icons/rx'
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 10px;
border:none;
border-radius:10px;
`

const Create = () => {
  const [units,setUnits] = useState([]);
  const [qty,setQty] = useState(0);
  const [price,setPrice] = useState('');
  const [medicines,setMedicines] = useState([]);
  const [procedures,setProcedures] = useState([]);
  const [suppliers,setSuppliers] = useState([]);
  const [value,setValue] = useState('');
  const [id,setId] = useState('');
  const [supId,setSupId] = useState('');
  const [date,setDate] = useState('');
  const [remark,setRemark] = useState('');
  const [totqty,setTotQty] = useState(0);
  const [totprice,setTotPrice] = useState(0);
  const url =  useSelector(state=>state.auth.url);
  const navigate = useNavigate();
  
  useEffect(()=> {
    const getBanks = async () =>{
      try{
        const res = await axios.get(url+'api/suppliers');
        setSuppliers(res.data.list);
        console.log('supp');
        console.log(suppliers);
      }catch(err){}
    };
    getBanks();
  },[]);

  const chgItem = (val) =>{
    if(val == 1){
      getMedicines();
    }
    if(val == 2){
      getProcedures();
    }
  }
  const getMedicines = async () =>{
    const res = await axios.get(url+'api/medicine-items');
    console.log(res.data.list);
    setUnits(res.data.list);
    setValue(1);
  }
  const getProcedures = async () =>{
    const res = await axios.get(url+'api/procedure-items');
    setUnits(res.data.list);
    setValue(2);
  }
  const chgQty =async (val) =>{
    const res = units.filter((el)=>el._id == val);
    console.log('hi');
    console.log(res[0]);
    setPrice(res[0].purchasePrice);
    setId(val);
  }
  const addPurchase = async () => {
    const res = units.filter((el)=>el._id == id);
    if(value==1){
      const obj = {
        "item_id":id,
        "name":res[0].medicineItemName,
        "qty":qty,
        "price":res[0].purchasePrice,
        "subTotal":res[0].purchasePrice * qty
      }
      setMedicines( arr => [...arr, obj]);
    }
    if(value==2){
      const obj = {
        "item_id":id,
        "name":res[0].procedureItemName,
        "qty":qty,
        "price":res[0].purchasePrice,
        "subTotal":res[0].purchasePrice * qty
      }
      setProcedures( arr => [...arr, obj]);
    }
    setTotQty(totqty+qty);
    setTotPrice(totprice+res[0].purchasePrice * qty);
  }
  const del = (id,val) =>  {
    if(val == 1){
      const res = medicines.filter((el)=>el.item_id == id)
      setTotQty(totqty-res.qty);
      setTotPrice(totprice-res.purchasePrice * qty);
      setMedicines(medicines.filter((el)=>el.item_id != id))
    }
    if(val == 2){
      const res = procedures.filter((el)=>el.item_id == id)
      setTotQty(totqty-res.qty);
      setTotPrice(totprice-res.purchasePrice * qty);
      setProcedures(procedures.filter((el)=>el.item_id != id))
    }
    
  }
  const save = () =>{
    const data = {
      "purchaseDate": date,
      "supplierName": supId,
      "remark": remark,
      "medicineItems": medicines,
    "procedureItems": procedures,
    "totalQTY": totqty,
    "totalPrice": totprice
      }
      const res = axios.post(url+'api/purchase',data)
       .then(function (response) {
        alert('success')
        navigate(-1);
       })
  }
  return (
    <div>
        <Nav/>
        <h5 className='font-weight-bold mt-3'>Purchase Create Form</h5>
        <div className='row mt-3'>
          <div className='col-9'>
          <div className='card'>
            <div className='card-body'>
            <div className='p-2'>
            <div className='row'>
              <div className='col-6'>
              <label htmlFor="">Purchase Date</label>
              <input type="date" className='form-control' onChange={(e)=>setDate(e.target.value)}/>
              </div>
              <div className='col-6'>
              <label htmlFor="">Supplier Name</label>
              <select name="" id="" className='form-control' onChange={(e)=>setSupId(e.target.value)}>
                <option value="">Choose Supplier</option>
                {
                  suppliers.map((sup,i)=>(
                    <option value={sup._id}>{sup.name}</option>
                  ))
                }
              </select>
              </div>
              <div className='col-12 mt-3'>
              <label htmlFor="">Remark</label>
              <textarea className='form-control' onChange={(e)=>setRemark(e.target.value)}/>
              </div>
              <hr className='mt-3'/>
              <div className='offset-1 col-10 mt-3'>
              <table className="table table-hover">
                <thead>			
                <tr>
                    <th>#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Sub Total</th>
                    <th scope='col'>Action</th>
                </tr>
                </thead>
                <tbody>
                {medicines.map((med,index)=>(<tr>
                    <th>{++index}</th>
                    <th>{med.name}</th>
                    <th>{med.qty}</th>
                    <th>{med.price}</th>
                    <th>{med.subTotal}</th>
                    <th><RxCross2 onClick={()=>del(med.item_id,1)}/></th>
                </tr>))}
                {procedures.map((pro,index)=>(<tr>
                  <th>{++index}</th>
                    <th>{pro.name}</th>
                    <th>{pro.qty}</th>
                    <th>{pro.price}</th>
                    <th>{pro.subTotal}</th>
                    <th><RxCross2 onClick={()=>del(pro.item_id,2)}/></th>
                </tr>))}
                </tbody>
              </table>
              </div>
              <div className='col-6 mt-3'>
              <label htmlFor="">Total Quantity</label>
              <input type="number" className='form-control'  value={totqty}/>
              </div>
              <div className='col-6 mt-3'>
              <label htmlFor="">Total Price</label>
              <input type="number" className='form-control'  value={totprice}/>
              </div>
              <Button className='mt-4' onClick={save}>Save</Button>
              
            </div>
            </div>
            </div>
          </div>
          </div>
          <div className='col-3'>
          <div className='card'>
            <div className='card-body'>
              <div className='p-2'>
              <div class='row form-group'>
              <label htmlFor="">Select Category</label>
              <select name="" id="" onChange={(e)=>chgItem(e.target.value)} className='form-control'>
                <option value="">Choose  Category</option>
                  <option value="1">Medicine</option>
                  <option value="2">Procedure Medicine</option>
              </select>
              </div>
              <div class='row form-group mt-3'>
              <label htmlFor="">Select Item</label>
              <select name="" id="" onChange={(e)=>chgQty(e.target.value)} className='form-control'>
                <option value="">Choose Item</option>
                {
                  units.map((unit,i)=>(
                    <option value={unit._id}>{unit.medicineItemName ? unit.medicineItemName:unit.procedureItemName}</option>
                  ))
                }
              </select>
              </div>
              <div class='row form-group mt-3'>
              <label htmlFor="">Quantity</label>
              <input type="number" className='form-control' onChange={(e)=>setQty(e.target.value)}/>
              </div>
              <div class='row form-group mt-3'>
              <label htmlFor="">Enter Last Purchase Price</label>
              <input type="number" className='form-control' value={price} onChange={(e)=>setPrice(e.target.value)}/>
              </div>
              <div className='row text-center mt-4'>
              <Button onClick={addPurchase}>Add</Button>
              </div>
              </div>
            </div>

          </div>
          </div>
        </div>
    </div>
  )
}

export default Create