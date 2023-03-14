import React from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'

const Top = styled.div`
display : flex;
justify-content: space-between;
margin : 20px 30px;
`;

const Left = styled.div`
font-weight : normal;
flex: 1;
display:flex;
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
margin-top: 20px;
`

const Title = styled.h5`
font-weight : bold;
margin-top : 10px;
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
const DivF = styled.div`
    display: flex;
    flex-direction: row;
    align-item: center;
    justify-content: center;
    margin-top:15px;
`

const Register = () => {
  return (
    <div>
        <Nav/>
          <Left><Title>Patient Register</Title></Left>
        <Div className='card'>
          <Div className='card-body'>
          <Div className='row'>
            <Div className='offset-2 col-4 form-group '>
                <Label>Name<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-4 form-group'>
                <Label>Email</Label>
                <Input type="text" className='form-control'/>
            </Div>
          </Div>
          <Div className='row mt-3'>
          <Div className='offset-2 col-4 form-group'>
                <Label>Phone<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-4 form-group'>
                <Label>Date of Birth<Span>*</Span></Label>
                <Input type="date" className='form-control'/>
            </Div>
          </Div>
          <Div className='row mt-3'>
          <Div className='offset-2 col-4 form-group'>
                <Label>Age<Span>*</Span></Label>
                <Input type="number" className='form-control'/>
            </Div>
            <Div className='col-4 form-group'>
                <Label>Gender<Span>*</Span></Label>
                <DivF>
                Male<Input  type="radio" name="genderdata"/>
                Female<Input  type="radio" name="genderdata"/>
                </DivF>
            </Div>
          </Div>
          <Div className='row mt-3'>
            <Div className='offset-2 col-8 form-group'>
                <Label>Occupation</Label>
                <Input type="number" className='form-control'/>
            </Div>
          </Div>
          <Div className='row mt-3'>
            <Div className='offset-2 col-8 form-group'>
                <Label>Address<Span>*</Span></Label>
                <Textarea className='form-control'/>
            </Div>
          </Div>
          <Div className='row mt-3'>
            <Div className='offset-2 col-8 form-group'>
                <Label>Photo</Label>
                <Input type="file" className='form-control'/>
            </Div>
          </Div>
          <Top>
            <Center>
                <Button>Register</Button>
            </Center>
          </Top>
          </Div>
        </Div>
    </div>
  )
}

export default Register