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
    const [patientEmail,setPatientEmail] = useState('');
    const [doctorId,setDoctorId] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [patients,setPatients] = useState([]);


    useEffect(()=>{
        getDoctors();
        getPatients();
    },[])
    const getDoctors = async () => {
        const res = await axios.get('http://localhost:9000/api/doctors');
        setDoctors(res.data.data);
    }
    const getPatients = async () =>{
        try{
          const res = await axios.get('http://localhost:9000/api/patients');
          setPatients(res.data.list);
        }catch(err){}
      };
    
    const getPatientPhone = async (id) =>{
        try{
            setPatientName(id);
            const res = await axios.get('http://localhost:9000/api/patient/'+id);
            setPatientPhone(res.data.data.phone);
            setPatientEmail(res.data.data.email);
          }catch(err){}
    }
    
    const saveAppointment = () => {
      if(patientStatus == 'Old'){
        const data = { 
        relatedDoctor:doctorId,
        date: date,
        time: time,
        description:description,
        status:patientStatus,
        relatedPatient:patientName,
        }
        axios.post('http://localhost:9000/api/appointment',data)
        .then(function (response) {
            alert('success')
        })
      }else{
        const data = {
            relatedDoctor:doctorId,
            date: date,
            time: time,
            phone:patientPhone,
            description:description,
            name:patientName,
            status:patientStatus,
            email:patientEmail}
        axios.post('http://localhost:9000/api/appointment',data)
        .then(function (response) {
            alert('success')
        })
      }
        
      
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
                <Select className='form-control' onChange={(e)=>setPatientStatus(e.target.value)}>
                    <Option>Select Status</Option>
                    <Option value='New'>New</Option>
                    <Option value='Old'>Old</Option>
                </Select>
            </Div>
            {patientStatus == 'Old' && <>
            <Div className='form-group mt-3'>
                <Label>Patient Name</Label>
                <Select className='form-control' onChange={(e)=>getPatientPhone(e.target.value)}>
                    <Option>Select Patient</Option>
                    {
                        patients.map((patient,i)=>(
                            <Option value={patient._id}>{patient.name}</Option>
                        ))
                    }
                </Select>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Phone</Label>
                <Input type="number" className='form-control' value={patientPhone}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Email</Label>
                <Input type="email" className='form-control' value={patientEmail}/>
            </Div></>}
            {patientStatus == 'New' && <>
            <Div className='form-group mt-3'>
                <Label>Patient Name</Label>
                <Input type="text" className='form-control' onChange={(e)=>setPatientName(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Phone</Label>
                <Input type="number" className='form-control' onChange={(e)=>setPatientPhone(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Email</Label>
                <Input type="number" className='form-control' onChange={(e)=>setPatientEmail(e.target.value)}/>
            </Div></>}
            <Div className='form-group mt-3'>
                <Label>Doctor Name</Label>
                <Select className='form-control' onChange={(e)=>setDoctorId(e.target.value)}>
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
                <Textarea className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Date</Label>
                <Input type="date" className='form-control' onChange={(e)=>setDate(e.target.value)}/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Time</Label>
                <Input type="time" className='form-control' onChange={(e)=>setTime(e.target.value)}/>
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