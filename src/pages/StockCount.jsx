import React,{useState,useEffect} from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import {MdDoubleArrow} from 'react-icons/md'
import {FaFileExport} from "react-icons/fa"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { ChangeCircleSharp } from '@mui/icons-material'

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

const StockCount = () => {
  const [procedures,setProcedures] = useState([]);
  const [medicines,setMedicines] = useState([]);
  const navigate = useNavigate();
  const url =  useSelector(state=>state.auth.url);

  useEffect(()=>{
    getMedicines();
    getProcedures();
 },[])

 const getMedicines = async () =>{
   const res = await axios.get(url+'api/medicine-items');
   setMedicines(res.data.list);
 }
 const getProcedures = async () =>{
   const res = await axios.get(url+'api/procedure-items');
   setProcedures(res.data.list);
 }
 const change = (id,val,type) => {
   if(type==1){
    const data ={id:id,currentQuantity:val}
    axios.put(url+'api/medicine-item',data)
   .then(function (response){
    Swal.fire({
      title: "Success",
      text: "successfully Changed!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      navigate('/stockcount');
      })
  }).catch(error =>{
    Swal.fire({
      title: "Error",
      text: "Something Wrong !",
      icon: "error",
      confirmButtonText: "CANCEL",
    })
  }) 
   }
   if(type==2){
   const data ={id:id,sellingPrice:val}
   axios.put(url+'api/medicine-item',data)
   .then(function (response){
    Swal.fire({
      title: "Success",
      text: "successfully Changed!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      navigate('/stockcount');
      })
  }).catch(error =>{
    Swal.fire({
      title: "Error",
      text: "Something Wrong !",
      icon: "error",
      confirmButtonText: "CANCEL",
    })
  }) 
   }
   if(type==3){
    const data ={id:id,purchasePrice:val}
    axios.put(url+'api/medicine-item',data)
   .then(function (response){
    Swal.fire({
      title: "Success",
      text: "successfully Changed!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      navigate('/stockcount');
      })
  }).catch(error =>{
    Swal.fire({
      title: "Error",
      text: "Something Wrong !",
      icon: "error",
      confirmButtonText: "CANCEL",
    })
  }) 
   }
 }
 const changeP = (id,val,type) => {
  if(type==1){
   const data ={id:id,currentQuantity:val}
   axios.put(url+'api/procedure-item',data)
  .then(function (response){
   Swal.fire({
     title: "Success",
     text: "successfully Changed!",
     icon: "success",
     confirmButtonText: "OK",
   }).then(function () {
     navigate('/stockcount');
     })
 }).catch(error =>{
   Swal.fire({
     title: "Error",
     text: "Something Wrong !",
     icon: "error",
     confirmButtonText: "CANCEL",
   })
 }) 
  }
  if(type==2){
  const data ={id:id,sellingPrice:val}
  axios.put(url+'api/procedure-item',data)
  .then(function (response){
   Swal.fire({
     title: "Success",
     text: "successfully Changed!",
     icon: "success",
     confirmButtonText: "OK",
   }).then(function () {
     navigate('/stockcount');
     })
 }).catch(error =>{
   Swal.fire({
     title: "Error",
     text: "Something Wrong !",
     icon: "error",
     confirmButtonText: "CANCEL",
   })
 }) 
  }
  if(type==3){
   const data ={id:id,purchasePrice:val}
   axios.put(url+'api/procedure-item',data)
  .then(function (response){
   Swal.fire({
     title: "Success",
     text: "successfully Changed!",
     icon: "success",
     confirmButtonText: "OK",
   }).then(function () {
     navigate('/stockcount');
     })
 }).catch(error =>{
   Swal.fire({
     title: "Error",
     text: "Something Wrong !",
     icon: "error",
     confirmButtonText: "CANCEL",
   })
 }) 
  }
}

  return (
    <div>
        <Nav/>
        <Top>
          <Left><Title>Stock Count & Price List</Title></Left>
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Tabs>
          <TabList>
            <Tab>Medicine Items</Tab>
            <Tab>Procedure Items</Tab>
          </TabList>

          <TabPanel>
          <Top className='mt-4'>
          <Left><Input type="text" placeholder="Search..."/></Left>
          <Right>
            <Btn className='btn btn-outline-success'><FaFileExport/>Excel Export</Btn>
          </Right>
         </Top>
          <Table className='table table-hover mt-4'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Qty</Th>
              <Th>Selling Price ( MMK )</Th>
              <Th>Purchase Price ( MMK )</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            {medicines.map((medicine,i) => (
              <Tr>
              <Td>{++i}</Td>
              <Td>{medicine.code}</Td>
              <Td>{medicine.medicineItemName}</Td>
              <Td><input type="number" placeholder={medicine.currentQuantity} onDoubleClick={(e)=>change(medicine._id,e.target.value,1)}/></Td>
              <Td><input type="number" placeholder={medicine.sellingPrice} onDoubleClick={(e)=>change(medicine._id,e.target.value,2)}/></Td>
              <Td><input type="number" placeholder={medicine.purchasePrice} onDoubleClick={(e)=>change(medicine._id,e.target.value,3)}/></Td>
              <Td><Btn className='btn btn-sm btn-primary'><MdDoubleArrow/></Btn></Td>
            </Tr>
            ))
            }
            </Tbody>
          </Table>
          </TabPanel>
          <TabPanel>
          <Top className='mt-4'>
          <Left><Input type="text" placeholder="Search..."/></Left>
          <Right>
            <Btn className='btn btn-outline-success'><FaFileExport/></Btn>
          </Right>
         </Top>
          <Table className='table table-hover mt-4'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Qty</Th>
              <Th>Selling Price ( MMK )</Th>
              <Th>Purchase Price ( MMK )</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            {procedures.map((procedure,i) => (
              <Tr>
              <Td>{++i}</Td>
              <Td>{procedure.code}</Td>
              <Td>{procedure.procedureItemName}</Td>
              <Td><input type="number" placeholder={procedure.currentQuantity} onDoubleClick={(e)=>changeP(procedure._id,e.target.value,1)}/></Td>
              <Td><input type="number" placeholder={procedure.sellingPrice} onDoubleClick={(e)=>changeP(procedure._id,e.target.value,2)}/></Td>
              <Td><input type="number" placeholder={procedure.purchasePrice} onDoubleClick={(e)=>changeP(procedure._id,e.target.value,3)}/></Td>
              <Td><Btn className='btn btn-sm btn-primary'><MdDoubleArrow/></Btn></Td>
            </Tr>
            ))
            }
            </Tbody>
          </Table>
          </TabPanel>
        </Tabs>
          </Div>
         </Div>
    </div>
  )
}

export default StockCount