import React,{useState,useEffect} from 'react'
import Nav from "../../components/Navbar"
import styled from 'styled-components'
import {AiOutlinePlus} from 'react-icons/ai'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddSupplierDialog from '../../dialogs/AddSupplierDialog'
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

const List = () => {
  const [purchases,setPurchases] = useState([]);
  const url =  useSelector(state=>state.auth.url);

  useEffect(()=> {
    const getpurchases = async () =>{
      try{
        const res = await axios.get(url+'api/purchases');
        setPurchases(res.data.list);
      }catch(err){}
    };
    getpurchases();
  },[]);

  return (
    <div>
        <Nav/>
        <Top>
          <Left><Title>Purchase List</Title></Left>
          <Right><Link to={'/create_purchase'}><Button><AiOutlinePlus style={{marginRight:'7px'}}/>Add Purchase</Button></Link></Right>
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Table className='table table-hover mt-4'>
            <Thead> 				
            <Tr>
              <Th>#</Th>
              <Th>Purchase Date</Th>
              <Th>Supplier Name</Th>
              <Th>Total Qty</Th>
              <Th>Total Price</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            {purchases.map((purchase,i) => (
              <Tr>
              <Td>{++i}</Td>
              <Td>{purchase.date}</Td>
              {/* <Td>{purchase.supplierName.name}</Td> */}
              <Td></Td>
              <Td>{purchase.totalQTY}</Td>
              <Td>{purchase.totalPrice}</Td>
              <Td>
              <Link to={'/purchase/'+purchase._id}><Btn className='btn btn-sm btn-primary'>Detail</Btn></Link>
              </Td>
            </Tr>
            ))
            }
            </Tbody>
          </Table>
          </Div>
         </Div>
    </div>
  )
}

export default List