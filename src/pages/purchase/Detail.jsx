import React,{useEffect,useState} from 'react'
import Nav from '../../components/Navbar'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector} from 'react-redux';

const Detail = () => {
    const [purchase,setPurchase] = useState([]);
    const [medicine,setMedicine] = useState([]);
    const [procedure,setProcedure] = useState([]);
    const purchaseid = useLocation().pathname.split("/")[2];
    const url =  useSelector(state=>state.auth.url);
    useEffect(()=>{
        getpurchase();
    },[]);
    const getpurchase = async () => {
        const res = await axios.get(url+'api/purchase/'+purchaseid);
        console.log(res.data.data[0]);
        setPurchase(res.data.data[0]);  
        setMedicine(res.data.data[0].medicineItems);
        setProcedure(res.data.data[0].procedureItems);
    }
  return (
    <div>
        <Nav/>
        <h5 className='font-weight-bold mt-3'>Purchase Detail</h5>
        <div className='row'>
            <div className='col-5'>
                <div className='card'>
                    <div className='card-body p-3'>
                        <div className='row'>
                            <div className='col-6'>
                            <span>Purchase Date</span><br></br>
                            <span>Supplier Name</span><br></br>
                            <span>Total Quantity</span><br></br>
                            <span>Total Price</span><br></br>
                            <h6 className='mt-2'>Remark</h6>
                            <span></span>
                            </div>
                            <div className='col-6'>
                            <span></span><br></br>
                            <span></span><br></br>
                            <span></span><br></br>
                            <span> MMK</span>
                            </div>
                            <div className='offset-3 col-6 mt-4'>
                            <Link to={'/edit_purchase/'+purchase._id}><button className='btn btn-sm btn-warning'>Edit</button></Link>&nbsp;&nbsp;&nbsp;
                            <button className='btn btn-sm btn-danger'>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-7'>
            <div className='card'>
            <div className='card-body'>
                <h5>Purchase Unit List</h5>
            <table class="table table-hover">
            <thead>			
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Item Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Sub Total</th>
              </tr>
            </thead>
            {/* <tbody>
              {medicine.map((med,i)=>(
              <tr>
                <td scope="row">{++i}</td>
                <td>{med.item_id.medicineItemName}</td>
                <td>{med.qty}</td>
                <td>{med.price}</td>
                <td>{med.subTotal}</td>
              </tr>
              ))}
              {procedure.map((med,i)=>(
                <tr>
                  <td scope="row">{++i}</td>
                  <td>{med.item_id.procedureItemName}</td>
                  <td>{med.qty}</td>
                  <td>{med.price}</td>
                  <td>{med.subTotal}</td>
                </tr>
                ))}
            </tbody> */}
          </table>
            </div>
          </div>
            </div>
        </div>
    </div>
  )
}

export default Detail