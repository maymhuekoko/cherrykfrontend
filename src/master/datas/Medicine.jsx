import React,{useState,useEffect} from 'react'
import Nav from "../../components/Navbar"
import styled from 'styled-components'
import {AiOutlinePlus} from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddItemDialog from '../../dialogs/AddItemDialog'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Top = styled.div`
display : flex;
justify-content: space-between;
margin : 10px 0;
`;

const Left = styled.div`
font-weight : normal;
flex: 1;
`;

const Title = styled.h5`
font-weight : bold;
margin-top : 10px;
`

const Right = styled.div`
font-weight : normal;
flex: 1;
display : flex;
justify-content: flex-end;
`;


const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: flex-end;
padding: 5px 10px;
border:none;
border-radius:10px;
`

const Btn = styled.button`
padding: 4px 8px;
border-radius:5px;
margin-left : 13px;
`

const Div = styled.div`
`
const Input = styled.input`
width:165px;
border:1px solid grey;
border-radius:12px;
padding:3px;
`
const Table = styled.table`
`
const Thead = styled.thead`
`
const Tbody = styled.tbody`
`
const Tr= styled.tr`
text-align:center;
`
const Th=styled.th`
font-size:15px;
`
const Td=styled.td`
font-size:14px;
`
const Select = styled.select`
padding:0px 7px;
border-radius: 5px;
`
const Option = styled.option`
`

const Medicine = () => {
  const [items,setItems] = useState([]);
  const [isShow,setIsShow] = useState(false);
  const [isUnit,setIsUnit] = useState(false);
  const url =  useSelector(state=>state.auth.url);

  useEffect(()=> {
    const getItems = async () =>{
      try{
        const res = await axios.get(url+'api/medicine-lists');
        setItems(res.data.list);
      }catch(err){}
    };
    getItems();
  },[]);

  return (
    <div>
        <Nav/>
        <Top>
          <Left><Title>Item List</Title></Left>
          <Right><Button  onClick={()=>setIsShow(true)}><AiOutlinePlus style={{marginRight:'7px'}}/>Add Item</Button></Right>
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Top className='mt-4'>
          <Left><Input type="text" placeholder="Search..."/></Left>
         </Top>
          <Table className='table table-hover mt-4'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Related Brand</Th>
              <Th>Description</Th>
              <Th>Unit</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            {items.map((item,i) => (
              <Tr>
              <Td>{++i}</Td>
              <Td>{item.code}</Td>
              <Td>{item.name}</Td>
              <Td>{item.relatedBrand.name}</Td>
              <Td>{item.description}</Td>
              <Td><Link to={'/medicine/'+item._id+'/'+item.name}><Button>Unit</Button></Link></Td>
              <Td>
              <IconButton aria-label="delete">
                <DeleteIcon className='text-danger'/>
                </IconButton>
                <IconButton aria-label="edit">
                <EditIcon className='text-warning'/>
                </IconButton>
              </Td>
            </Tr>
            ))
            }
            </Tbody>
          </Table>
          </Div>
         </Div>
         <AddItemDialog open={isShow} close={()=>setIsShow(false)}/>
    </div>
  )
}

export default Medicine