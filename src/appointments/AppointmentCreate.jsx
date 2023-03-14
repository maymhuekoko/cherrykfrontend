import React from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import ReactBigCalendar from './ReactBigCalendar';

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
  return (
    <div>
        <Nav/>
        <Left><Title>Appointment Create</Title></Left>
        <Div className='row mt-3'>
        <Div className='card col-4'>
          <Div className='card-body'>
            <Div className='form-group'>
                <Label>Select Patient Status</Label>
                <Select className='form-control'>
                    <Option>Select Status</Option>
                    <Option>New</Option>
                    <Option>Old</Option>
                </Select>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Patient Name</Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Phone</Label>
                <Input type="number" className='form-control'/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Doctor Name</Label>
                <Select className='form-control'>
                    <Option>Select Doctor</Option>
                    <Option>Test Dr. 1</Option>
                    <Option>Test Dr. 2</Option>
                </Select>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Description</Label>
                <Textarea className='form-control'/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Date</Label>
                <Input type="date" className='form-control'/>
            </Div>
            <Div className='form-group mt-3'>
                <Label>Time</Label>
                <Input type="time" className='form-control'/>
            </Div>
            <Top>
            <Center>
                <Button>Register</Button>
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