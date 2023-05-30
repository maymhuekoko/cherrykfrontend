import React,{useState,useEffect}  from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import {AiOutlinePlus,AiTwotoneFilter,AiFillInfoCircle} from 'react-icons/ai'
import {FaFileExport} from "react-icons/fa"
import axios from 'axios'
import { useSelector} from 'react-redux';
import { Link } from 'react-router-dom'

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
  const [appointments,setAppointments] = useState([]);
  const url =  useSelector(state=>state.auth.url);

  useEffect(()=> {
    const getAppointments = async () =>{
      try{
        const res = await axios.get(url+'api/appointments/today');
        setAppointments(res.data.data);
      }catch(err){}
    };
    getAppointments();
  },[]);

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
            {appointments.map((appointment,i) => (
              <Tr key={appointment.id}>
              <Td>{++i}</Td>
              <Td>{appointment.originalDate.split('T')[0]}</Td>
              <Td>{appointment.time}</Td>
              <Td>{appointment.relatedPatient.name}</Td>
              <Td>{appointment.relatedPatient.phone}</Td>
              <Td>{appointment.relatedDoctor.name}</Td>
              <Td>{appointment.description}</Td>
              <Td><Badge>{appointment.relatedPatient.patientStatus}</Badge></Td>
              <Td><Link to={'/appointment/'+appointment._id}><Btn className='btn btn-sm btn-primary'>Detail<AiFillInfoCircle style={{marginLeft:'7px'}}/></Btn></Link></Td>
            </Tr> ))}
            </Tbody>
          </Table>
          </Div>
         </Div>
    </div>
  )
}

export default Appointment