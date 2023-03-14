import React from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import {AiOutlinePlus,AiTwotoneFilter,AiFillInfoCircle} from 'react-icons/ai'
import {FaFileExport} from "react-icons/fa"

const Top = styled.div`
display : flex;
justify-content: space-between;
margin : 20px 0;
`;

const Left = styled.div`
font-weight : normal;
flex: 1;
`;

const Title = styled.h5`
font-weight : bold;
margin-top : 10px;
`
const Span = styled.span`
`
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
const Badge = styled.span`
background:rgb(0,7,51);
padding:0px 4px;
color:white;
border:none;
border-radius:4px;
`

const Appointment = () => {
  return (
    <div>
        <Nav/>
          <Left><Title>Appointment List</Title></Left>
         <Div className='card'>
          <Div className='card-body'>
          <Table className='table table-hover'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Patient Name</Th>
              <Th>Phone</Th>
              <Th>Doctor Name</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>2023-03-08</Td>
              <Td>15:40</Td>
              <Td>Pyae Phyo Ko Ko</Td>
              <Td>09449032379</Td>
              <Td>Test Dr. 2</Td>
              <Td>Patient</Td>
              <Td><Badge>New</Badge></Td>
              <Td><Btn className='btn btn-sm btn-primary'>Detail<AiFillInfoCircle style={{marginLeft:'7px'}}/></Btn></Td>
            </Tr>
            </Tbody>
          </Table>
          </Div>
         </Div>
    </div>
  )
}

export default Appointment