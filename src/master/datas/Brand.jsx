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

const Brand = () => {
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
    console.log('ha');
    console.log(res.data.data);
  }
  const getSubCategories = async () =>{
    const res = await axios.get(url+'api/sub-categories');
    setSubCategories(res.data.data)
  }
  const getBrands = async () =>{
    const res = await axios.get(url+'api/brands');
    setBrands(res.data.data)
    console.log('ho');
    console.log(res.data.data);
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
        <h5 className='font-weight-bold mt-3'>Brand List</h5>
        <div className='row mt-3'>
          <div className='col-9'>
          <div className='card'>
            <div className='card-body'>
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col">Related Category</th>
                <th scope="col">Related SubCategory</th>
                <th scope="col">Description</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((Brand,i)=>(
                Brand.category.name &&
              <tr>
                <th scope="row">{++i}</th>
                <td>{Brand.code}</td>
                <td>{Brand.name}</td>
                <td>{Brand.category.name}</td>
                <td>{Brand.subCategory.name}</td>
                <td>{Brand.description}</td>
                <td>
                <IconButton aria-label="delete" onClick={()=>deletee(Brand._id)}>
                <DeleteIcon className='text-danger'/>
                </IconButton>
                <IconButton aria-label="edit" onClick={()=>editt(Brand._id)}>
                <EditIcon className='text-warning'/>
                </IconButton>
                </td>
              </tr>))}
            </tbody>
          </table>
            </div>
          </div>
          </div>
          <div className='col-3'>
          <div className='card'>
            <div className='card-body'>
              {!edit && <div className='p-2'>
              <h5>Create Brand</h5>
              <div class='row form-group mt-4'>
              <label htmlFor="">Code</label>
              <input type="text" className='form-control' onChange={(e)=>setCode(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Name</label>
              <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
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
              <div class='row form-group mt-2'>
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
              <div class='row form-group mt-2'>
              <label htmlFor="">Description</label>
              <textarea name="" id="" cols="30" rows="4" className='form-control' onChange={(e)=>setDescription(e.target.value)}></textarea>
              </div>
              <div className='row text-center mt-4'>
              <Button onClick={create}>Save</Button>
              </div>
              </div>}
              {edit && <div className='p-2'>
              <h5>Update Brand</h5>
              <div class='row form-group mt-4'>
              <label htmlFor="">Code</label>
              <input type="text" className='form-control' id='code' value={code} onChange={(e)=>setCode(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Name</label>
              <input type="text" className='form-control' id='name' value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Related Category</label>
              <select name="" id="" onChange={(e)=>setCategoryId(e.target.value)} className='form-control'>
                <option value={categoryid}>{categoryname}</option>
                {
                  categories.map((category,j)=>(
                    <option value={category._id}>{category.name}</option>
                  ))
                }
              </select>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Related SubCategory</label>
              <select name="" id="" onChange={(e)=>setSubCategoryId(e.target.value)} className='form-control'>
                <option value={subcategoryid}>{subcategoryname}</option>
                {
                  subcategories.map((subcategory,j)=>(
                    subcategory.relatedCategory._id == categoryid &&
                    <option value={subcategory._id}>{subcategory.name}</option>
                  ))
                }
              </select>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Description</label>
              <textarea name="" id="description" cols="30" rows="4" className='form-control' onChange={(e)=>setDescription(e.target.value)}>{description}</textarea>
              </div>
              <div className='row text-center mt-4'>
                <div className='offset-1 col-5'>
                <Button onClick={update}>Update</Button>
                </div>
                <div className='col-5'>
                <Button onClick={()=>setEdit(false)}>Cancel</Button>
                </div>
              </div>
              </div>}
            </div>

          </div>
          </div>
        </div>
    </div>
  )
}

export default Brand