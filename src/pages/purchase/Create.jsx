import React,{useState,useEffect} from 'react'
import Nav from '../../components/Navbar'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 10px;
border:none;
border-radius:10px;
`

const Create = () => {
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [categories,setCategories] = useState([]);
  const [subcategories,setSubCategories] = useState([]);
  const [brands,setBrands] = useState([]);
  const [edit,setEdit] = useState(false);
  const [categoryid,setCategoryId] = useState('');
  const [categoryname,setCategoryName] = useState('');
  const [subcategoryid,setSubCategoryId] = useState('');
  const [subcategoryname,setSubCategoryName] = useState('');
  const [id,setId] = useState('');
  const url =  useSelector(state=>state.auth.url);

  useEffect(()=>{
    getCategories();
    getSubCategories();
    getBrands();
  },[])

  const getCategories = async () =>{
    const res = await axios.get(url+'api/categories');
    setCategories(res.data.data)
  }
  const getSubCategories = async () =>{
    const res = await axios.get(url+'api/sub-categories');
    setSubCategories(res.data.data)
  }
  const getBrands = async () =>{
    const res = await axios.get(url+'api/brands');
    setBrands(res.data.data)
  }
  const create = () => {
    const data = {
      code:code, 
      name:name, 
      description:description,
      category:categoryid,
      subCategory:subcategoryid,
    }
    axios.post(url+'api/brand',data)
    .then(function (response){
      window.location.reload(true);
    })
  }
  const editt =async (id) =>{
    const res =await axios.get(url+'api/brand/'+id);
    console.log(res.data.data[0])
    setCode(res.data.data[0].code);
    setName(res.data.data[0].name);
    setCategoryId(res.data.data[0].category._id);
    setCategoryName(res.data.data[0].category.name);
    setSubCategoryId(res.data.data[0].subCategory._id);
    setSubCategoryName(res.data.data[0].subCategory.name);
    setDescription(res.data.data[0].description);
    setId(res.data.data[0]._id)
    setEdit(true);
  }
  const deletee = (id) => {
    axios.delete(url+'api/brand/'+id);
    window.location.reload(true);
  }
  const update = () =>{
    const data = {
      id:id,
      code:code, 
      name:name, 
      description:description,
      category:categoryid,
      subCategory:subcategoryid,
    }
    axios.put(url+'api/brand',data)
    .then(function (response){
      window.location.reload(true);
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
              <input type="date" className='form-control'/>
              </div>
              <div className='col-6'>
              <label htmlFor="">Supplier Name</label>
              <select name="" id="" onChange={(e)=>setSubCategoryId(e.target.value)} className='form-control'>
                <option value="">Choose Related SubCategory</option>
                {
                  subcategories.map((subcategory,k)=>(
                    subcategory.relatedCategory._id == categoryid &&
                    <option value={subcategory._id}>{subcategory.name}</option>
                  ))
                }
              </select>
              </div>
              <div className='col-12 mt-3'>
              <label htmlFor="">Remark</label>
              <textarea className='form-control'/>
              </div>
              <hr className='mt-3'/>
              <div className='offset-1 col-10 mt-3'>
              <table className="table table-hover">
                <thead>			
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Sub Total</th>
                    <th scope='col'>Action</th>
                </tr>
                </thead>

              </table>
              </div>
              <div className='col-6 mt-3'>
              <label htmlFor="">Total Quantity</label>
              <input type="number" className='form-control'/>
              </div>
              <div className='col-6 mt-3'>
              <label htmlFor="">Total Price</label>
              <input type="number" className='form-control'/>
              </div>
              <Button onClick={create} className='mt-4'>Save</Button>
              
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
              <label htmlFor="">Related Category</label>
              <select name="" id="" onChange={(e)=>setCategoryId(e.target.value)} className='form-control'>
                <option value="">Choose Related Category</option>
                {
                  categories.map((category,j)=>(
                    <option value={category._id}>{category.name}</option>
                  ))
                }
              </select>
              </div>
              <div class='row form-group mt-3'>
              <label htmlFor="">Related SubCategory</label>
              <select name="" id="" onChange={(e)=>setSubCategoryId(e.target.value)} className='form-control'>
                <option value="">Choose Related SubCategory</option>
                {
                  subcategories.map((subcategory,k)=>(
                    subcategory.relatedCategory._id == categoryid &&
                    <option value={subcategory._id}>{subcategory.name}</option>
                  ))
                }
              </select>
              </div>
              <div class='row form-group mt-3'>
              <label htmlFor="">Quantity</label>
              <input type="number" className='form-control'/>
              </div>
              <div class='row form-group mt-3'>
              <label htmlFor="">Enter Last Purchase Price</label>
              <input type="number" className='form-control'/>
              </div>
              <div className='row text-center mt-4'>
              <Button onClick={create}>Add</Button>
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