import React from 'react'
import Nav from "../../components/Navbar"
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
padding: 5px 30px;
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
const Select = styled.select`
padding:5px 7px;
border-radius: 5px;
`
const Option = styled.option`
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

const Create = () => {
  return (
    <div>
        <Nav/>
        <Left><Title>Treatment Unit Create</Title></Left>
        <Div className='card'>
          <Div className='card-body row'>
          <Div className='offset-2 col-8'>
            <Div className='row'>
            <Div className='col-4 form-group '>
                <Label>Treatment Unit Name<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-4 form-group'>
                <Label>Treatment Unit Code<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-4 form-group'>
                <Label>Treatment Times<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-4 form-group mt-3'>
                <Label>Doctor Name<Span>*</Span></Label>
                <Select className='form-control'>
                <Option>Select Doctor</Option>
                <Option value="1">Test Dr.1</Option>
                <Option value="2">Test Dr.2</Option>
                </Select>
            </Div>
            <Div className='col-4 form-group mt-3'>
                <Label>Therapist Name<Span>*</Span></Label>
                <Select className='form-control'>
                <Option>Select Therapist</Option>
                <Option value="1">Test Tp.1</Option>
                <Option value="2">Test Tp.2</Option>
                </Select>
            </Div>
            <Div className='col-6 form-group mt-3'>
                <Label>Procedure Medicine</Label>
                <Select className='form-control'>
                <Option>Select Procedure Medicine</Option>
                <Option value="1">Procedure One</Option>
                <Option value="2">Procedure Two</Option>
                </Select>
            </Div>
            <Div className='col-3 mt-3'>
            <Button>Add</Button>
            </Div>
            <Div className='col-12 mt-3'>
            <Table className='table table-striped'>
            <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Item Name</Th>
              <Th>Qty</Th>
              <Th>Purchase Price</Th>
              <Th>Per Usage Qty</Th>
              <Th>Amount</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Test</Td>
              <Td>10</Td>
              <Td>1000</Td>
              <Td>1</Td>
              <Td>1000</Td>
            </Tr>
            </Tbody>
            </Table>
            </Div>
           <Div className='col-6 form-group mt-3'>
            <Label>Procedure Accessory</Label>
            <Select className='form-control'>
            <Option>Select Procedure Accessory</Option>
            <Option value="1">Accessory One</Option>
            <Option value="2">Accessory Two</Option>
            </Select>
          </Div>
            <Div className='col-3 mt-3'>
            <Button>Add</Button>
            </Div>
            <Div className='col-12 mt-3'>
            <Table className='table table-striped'>
            <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Item Name</Th>
              <Th>Qty</Th>
              <Th>Purchase Price</Th>
              <Th>Per Usage Qty</Th>
              <Th>Amount</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Test</Td>
              <Td>10</Td>
              <Td>1000</Td>
              <Td>1</Td>
              <Td>1000</Td>
            </Tr>
            </Tbody>
            </Table>
            </Div>
            <Div className='col-6 form-group mt-3'>
                <Label>Machine</Label>
                <Select className='form-control'>
                <Option>Select Machine</Option>
                <Option value="1">Machine One</Option>
                <Option value="2">Machine Two</Option>
                </Select>
            </Div>
            <Div className='col-3 mt-3'>
            <Button>Add</Button>
            </Div>
            <Div className='col-12 mt-3'>
            <Table className='table table-striped'>
            <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Item Name</Th>
              <Th>Qty</Th>
              <Th>Purchase Price</Th>
              <Th>Per Usage Qty</Th>
              <Th>Amount</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Test</Td>
              <Td>10</Td>
              <Td>1000</Td>
              <Td>1</Td>
              <Td>1000</Td>
            </Tr>
            </Tbody>
            </Table>
            </Div>
            <Div className='col-4 form-group mt-3'>
                <Label>Estimate Total Price<Span>*</Span></Label>
                <Input type="number" className='form-control'/>
            </Div>
            <Div className='col-2 form-group mt-3'>
                <Label>Percent(%)<Span>*</Span></Label>
                <Input type="number" className='form-control'/>
            </Div>
            <Div className='col-4 form-group mt-3'>
                <Label>Selling Price<Span>*</Span></Label>
                <Input type="number" className='form-control'/>
            </Div>
            <Div className='col-6 form-group mt-3'>
                <Label>Description</Label>
                <Textarea className='form-control'/>
            </Div>
            </Div>
            </Div>
          <Top>
            <Center>
                <Button>Save</Button>
            </Center>
          </Top>
          </Div>
        </Div>
    </div>
  )
}

export default Create