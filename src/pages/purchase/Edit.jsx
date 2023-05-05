import React,{useState,useEffect} from 'react'
import Nav from '../../components/Navbar'
import {useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector} from 'react-redux';

const Edit = () => {
    const [purchase,setPurchase] = useState([]);
    const [suppliers,setSuppliers] = useState([]);
    const [date,setDate] = useState('');
    const [remark,setRemark] = useState('');
    const purchaseid = useLocation().pathname.split("/")[2];
    const url =  useSelector(state=>state.auth.url);
    useEffect(()=>{
        getpurchase();
        getsuppliers();
    },[]);
    const getpurchase = async () => {
        const res = await axios.get(url+'api/purchase/'+purchaseid);
        console.log(res.data.data[0].remark);
        setRemark(res.data.data[0].remark);
        setPurchase(res.data.data[0]);  
        setDate(res.data.data[0].purchaseDate.split("T")[0]);  
    }
    const getsuppliers = async () => {
        const res = await axios.get(url+'api/suppliers');
        setSuppliers(res.data.list);  
    }
    const update = () => {
        // const data = {
        //     id:id,
        //     code:code, 
        //     name:name, 
        //     description:description
        //   }
        //   axios.put(url+'api/purchase/',data)
        //   .then(function (response){
        //     window.location.reload(true);
        //   })
    }
  return (
    <div>
        <Nav/>
        <h5 className='font-weight-bold mt-3'>Purchase Detail</h5>
        <div className='card'>
        <div className='card-body p-3'>
        <h6 className='font-weight-bold mt-3'>Purchase Detail</h6>
        <div className='row mt-3'>
        <div className='col-6'>
        <label htmlFor="">Purchase Date</label>
        <input type="date" className='form-control' value={date} onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className='col-6'>
        <label htmlFor="">Supplier Name</label>
        <select name="" id="" className='form-control'>
        {/* <option value="">{purchase.supplierName.name}</option> */}
        {
            suppliers.map((sup,i)=>(
                <option value={sup._id}>{sup.name}</option>
            ))
        }
        </select>
        </div>
        <div class='col-12  mt-3'>
            <label htmlFor="">Remark</label>
            <textarea name=""  cols="30" rows="4" className='form-control' onChange={(e)=>setRemark(e.target.value)} value={remark}/>
        </div>
        <div className='offset-5 col-4 mt-4'>
        <button className='btn btn-sm btn-primary' onClick={update}>Update</button>&nbsp;&nbsp;&nbsp;
        <button className='btn btn-sm btn-secondary'>Cancel</button>
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Edit