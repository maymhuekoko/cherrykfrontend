import React,{useState,useEffect} from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import ReactBigCalendar from './ReactBigCalendar';
import axios from 'axios';

const Left = styled.div`
font-weight : normal;
flex: 1;
`;

const Title = styled.h5`
font-weight : bold;
margin-top : 10px;
`
const Top = styled.div`
display : flex;
justify-content: space-between;
margin-top: 50px;
`;

const Center = styled.div`
flex: 1;
display: inline;
text-align: center;
`;

const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 10px;
border:none;
border-radius:10px;
`
const Div = styled.div`
`
const Label = styled.label`
`
const Input = styled.input`
width:100%;
`
const Span = styled.span`
color:red;
`
const Textarea = styled.textarea`
`
const Select = styled.select`
`
const Option = styled.option`
`

const AppointmentCreate = () => {
    const [doctors,setDoctors] = useState([]);
    const [patientName,setPatientName] = useState('');
    const [patientStatus,setPatientStatus] = useState('');
    const [patientPhone,setPatientPhone] = useState('');
    const [doctorId,setDoctorId] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');

    useEffect(()=>{
        getDoctors();
    },[])
    const getDoctors = async () => {
        const res = await axios.get('http://localhost:9000/api/doctors');
        setDoctors(res.data.data);
    }
    const saveAppointment = () => {
        // axios.post('http://localhost:9000/api/appointment',data)
    }
  return (
    <div>
        <Nav/>
        <Left><Title>Appointment Create</Title></Left>
        <Div className='row mt-3'>
        <Div className='card col-4'>
          <Div className='card-body'>
            <Div className='form-group'>
                <Label>Select Patient Status</Label>
                <Select className='form-control' value={(e)=>setPatientStatus(e.target.value)}>
                    <Option>Select Status</Option>
                    <Option value='New'>New</Option>
                    <Option value='Old'>Old</Option>
                </Select>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Patient Name</Label>
                <Input type="text" className='form-control' value={(e)=>setPatientName(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Phone</Label>
                <Input type="number" className='form-control' value={(e)=>setPatientPhone(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Doctor Name</Label>
                <Select className='form-control' value={(e)=>setDoctorId(e.target.value)}>
                    <Option>Select Doctor</Option>
                    {
                        doctors.map((doctor,i)=>(
                            <Option value={doctor._id}>{doctor.name}</Option>
                        ))
                    }
                </Select>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Description</Label>
                <Textarea className='form-control' value={(e)=>setDescription(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Date</Label>
                <Input type="date" className='form-control' value={(e)=>setDate(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Time</Label>
                <Input type="time" className='form-control' value={(e)=>setTime(e.target.value)}/>
            </Div>
            <Top>
            <Center>
                <Button onClick={saveAppointment}>Register</Button>
            </Center>
            </Top>
          </Div>
        </Div>
        <Div className='col-8 card ml-3'>
        <Div className='card-body'>
        <ReactBigCalendar/>
        </Div>
        </Div>
        </Div>
    </div>
  )
}

export default AppointmentCreate