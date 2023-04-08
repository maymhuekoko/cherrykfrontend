import React,{useState,useEffect} from 'react'
import Nav from "../../components/Navbar"
import styled from 'styled-components'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom'
import AddCreditDialog from '../../dialogs/AddCreditDialog'

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
const Badge = styled.span`
background:rgb(0,7,51);
padding:0px 4px;
color:white;
border:none;
border-radius:4px;
`

const List = () => {
  const [suppliers,setSuppliers] = useState([]);
  const [isShow,setIsShow] = useState(false);
  const [supid,setSupId]  = useState('');
  const [credit,setCredit] = useState('');
  const url =  useSelector(state=>state.auth.url);
  const id = useLocation().pathname.split('/')[2];

  useEffect(()=> {
    const getSuppliers = async () =>{
      try{
        const res = await axios.get(url+'api/suppliers');
        setSuppliers(res.data.list.filter((el)=>el._id == id));
      }catch(err){}
    };
    getSuppliers();
  },[]);
  const getsup = (id,credit) =>{
    setIsShow(true);
    setSupId(id);
    setCredit(credit);
  }

  return (
    <div>
        <Nav/>
        <Top>
          <Left><Title>Supplier Credit Detail</Title></Left>
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Table className='table table-hover mt-4'>
            <Thead> 				
            <Tr>
              <Th>#</Th>
              <Th>Supplier Name</Th>
              <Th>Phone</Th>
              <Th>Purchase Amount</Th>
              <Th>Credit Amount</Th>
              <Th>Status</Th>
              <Th>Pay Credit</Th>
            </Tr>
            </Thead>
            <Tbody>
            {suppliers.map((supplier,i) => (
              <Tr>
              <Td>{++i}</Td>
              <Td>{supplier.name}</Td>
              <Td>{supplier.phone}</Td>
              <Td>{supplier.purchaseAmount}</Td>
              <Td>{supplier.creditAmount}</Td>
              <Td><Badge>Unpaid</Badge></Td>
              <Td>
              <Button variant="outlined" onClick={()=>getsup(supplier._id,supplier.creditAmount)}>Pay Credit</Button>
              </Td> 
            </Tr>
            ))
            }
            </Tbody>
          </Table>
          </Div>
         </Div>
         <AddCreditDialog open={isShow} close={()=>setIsShow(false)} id={supid} credit={credit}/>
    </div>
  )
}

export default List