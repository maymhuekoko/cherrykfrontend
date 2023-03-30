import React,{useState,useEffect} from 'react'
import Nav from '../../components/Navbar'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 10px;
border:none;
border-radius:10px;
`

const Category = () => {
  const [code,setCode] = useState('');
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [categories,setCategories] = useState([]);
  const [edit,setEdit] = useState(false);
  const [id,setId] = useState('');

  useEffect(()=>{
    getCategories();
  },[])
  const getCategories = async () =>{
    const res = await axios.get('http://localhost:9000/api/categories');
    setCategories(res.data.data)
  }
  const create = () => {
    const data = {
      code:code, 
      name:name, 
      description:description
    }
    axios.post('http://localhost:9000/api/category',data)
    .then(function (response){
      window.location.reload(true);
    })
  }
  const editt =async (id) =>{
    const res =await axios.get('http://localhost:9000/api/category/'+id);
    console.log(res.data.data[0])
    setCode(res.data.data[0].code);
    setName(res.data.data[0].name);
    setDescription(res.data.data[0].description)
    setId(res.data.data[0]._id)
    setEdit(true);
  }
  const deletee = (id) => {
    axios.delete('http://localhost:9000/api/category/'+id);
    window.location.reload(true);
  }
  const update = () =>{
    const data = {
      id:id,
      code:code, 
      name:name, 
      description:description
    }
    axios.put('http://localhost:9000/api/category',data)
    .then(function (response){
      window.location.reload(true);
    })
  }
  return (
    <div>
        <Nav/>
        <h5 className='font-weight-bold mt-3'>Category List</h5>
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
                <th scope="col">Description</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category,i)=>(<tr>
                <th scope="row">{++i}</th>
                <td>{category.code}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                <IconButton aria-label="delete" onClick={()=>deletee(category._id)}>
                <DeleteIcon className='text-danger'/>
                </IconButton>
                <IconButton aria-label="edit" onClick={()=>editt(category._id)}>
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
              <h5>Create Category</h5>
              <div class='row form-group mt-4'>
              <label htmlFor="">Code</label>
              <input type="text" className='form-control' onChange={(e)=>setCode(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Name</label>
              <input type="text" className='form-control' onChange={(e)=>setName(e.target.value)}/>
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
              <h5>Update Category</h5>
              <div class='row form-group mt-4'>
              <label htmlFor="">Code</label>
              <input type="text" className='form-control' id='code' value={code} onChange={(e)=>setCode(e.target.value)}/>
              </div>
              <div class='row form-group mt-2'>
              <label htmlFor="">Name</label>
              <input type="text" className='form-control' id='name' value={name} onChange={(e)=>setName(e.target.value)}/>
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

export default Category