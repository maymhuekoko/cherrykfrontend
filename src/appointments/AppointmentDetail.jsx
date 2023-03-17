import React from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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

const But = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 30px;
border:none;
border-radius:10px;
margin-top: 20px;
`
const Btn = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 30px;
border:none;
border-radius:10px;
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
const Img = styled.img`
`
const Badge = styled.span`
background:rgb(0,7,51);
padding:0px 4px;
color:white;
border:none;
border-radius:4px;
`
const Right = styled.div`
font-weight : normal;
flex: 1;
display : flex;
justify-content: flex-end;
`;

const AppointmentDetail = () => {
  return (
    <div>
      <Nav/>
      <Left><Title>Treatment Unit Create</Title></Left>
        <Div className='card'>
          <Div className='card-body row'>
            <Div className='col-9'>
            <Div className='row'>
            <Div className='col-10'>
            <Div className='row'>
            <Div className='col-3 form-group '>
                <Label>Patient Name<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-3 form-group'>
                <Label>Patient Id<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-3 form-group'>
                <Label>Status<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-3 form-group'>
                <Label>Email Address<Span>*</Span></Label>
                <Input type="email" className='form-control'/>
            </Div>
            <Div className='col-3 form-group '>
                <Label>Member Status<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-3 form-group'>
                <Label>Occupancy<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-3 form-group'>
                <Label>Gender<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
            </Div>
            <Div className='col-3 form-group'>
                <Label>DOB<Span>*</Span></Label>
                <Input type="date" className='form-control'/>
            </Div>
            <Div className='col-12 mt-2'>
                <But>Add Medicine History</But>
            </Div>
            </Div>
            </Div>
            <Div className='col-2'>
              <Img src='' width='150' height='150'/>
            </Div>
            </Div>
             <Div className='col-12 mt-2'>
            <hr/>
            </Div>
            <Div className='row'>
              <Div className='offset-6 col-3  form-group'>
              <Input type="text" className='form-control' style={{marginTop:'35px'}} placeholder="Search..."/>
              </Div>
              <Div className='col-3 mt-3'>
              <But>Start Procedure</But>
              </Div>
            </Div>
            <Table className='table table-hover mt-4'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Treatment Unit Code</Th>
              <Th>Status</Th>
              <Th>Doctor Name</Th>
              <Th>Times</Th>
              <Th>Total Amount</Th>
              <Th>Left-Over Amount</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>T-0001</Td>
              <Td><Badge>Ongoing</Badge></Td>
              <Td>Test Dr.1</Td>
              <Td>3 Times</Td>
              <Td>100000</Td>
              <Td>50000</Td>
              <Td><Btn>Payment</Btn></Td>
            </Tr>
            <tr>
                <td colspan="10">
                  <div>
                    <table className="table bg-light">
                      <tbody>
                      <tr className="text-center">
                          <th>First Appointment</th>
                          <th><Badge>Done</Badge></th>
                          <th>Date/Time</th>
                          <th>No History</th>
                          <th>Medicine Sale Amount</th>
                          <th>Appointment Status</th>
                          <th>Action</th>
                      </tr>
                      <tr className="text-center">
                          <th>Seecond Appointment</th>
                          <th><Badge>Done</Badge></th>
                          <th>Date/Time</th>
                          <th>No History</th>
                          <th>Medicine Sale Amount</th>
                          <th>Appointment Status</th>
                          <th>Action</th>
                      </tr>
                      <tr className="text-center">
                          <th>Third Appointment</th>
                          <th><Badge>Done</Badge></th>
                          <th>Date/Time</th>
                          <th>No History</th>
                          <th>Medicine Sale Amount</th>
                          <th>Appointment Status</th>
                          <th>Action</th>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </Tbody>
          </Table>
          <Top style={{marginTop:'60px'}}>
          <Right>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button>Medicine Sale</Button>
          <Button>Add Treatment History</Button>
          <Button>Item Adjustment</Button>
          <Button>Done</Button>
          </ButtonGroup>
          </Right>
          </Top >
            </Div> 
            <Div className='col-3'>
              <Div className='card'>
                <Div className='card-body row'>
                  <Title>Treatment</Title>
                <Div className='col-12 mt-2 form-group '>
                <Label>Treatment Name<Span>*</Span></Label>
                <Select className='form-control'>
                <Option>Select Treatment Name</Option>
                <Option value="1">Treatment 1</Option>
                <Option value="2">Treatment 2</Option>
                </Select>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Treatment Code<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Payment Method<Span>*</Span></Label>
                <Select className='form-control'>
                <Option>Select Payment Method</Option>
                <Option value="1">Credit</Option>
                <Option value="2">Cash Down</Option>
                </Select>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Bank Information<Span>*</Span></Label>
                <Input type="text" className='form-control'/>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Pay Amount<Span>*</Span></Label>
                <Input type="number" className='form-control'/>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Left-Over Amount<Span>*</Span></Label>
                <Input type="number" className='form-control'/>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Total Amount<Span>*</Span></Label>
                <Input type="number" className='form-control'/>
                </Div>
                <Div className='col-6 mt-3'>
                <But>Submit</But>
                </Div>
                <Div className='col-6 mt-3'>
                <But>Cancel</But>
                </Div>
                </Div>
              </Div>
            </Div>
            
          <Top>
            {/* <Center>
                <Button>Save</Button>
            </Center> */}
          </Top>
          </Div>
          </Div>
    </div>
  )
}

export default AppointmentDetail