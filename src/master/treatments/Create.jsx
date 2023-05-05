import React,{useEffect,useState} from 'react'
import Nav from "../../components/Navbar"
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector} from 'react-redux';


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
  const [doctors,setDoctors] = useState([]);
  const [therapists,setTherapists] = useState([]);
  const [procedures,setProcedures] = useState([]);
  const [machines,setMachines] = useState([]);
  const [accessories,setAccessories] = useState([]);
  const [items,setItems] = useState([]);
  const [isItem,setIsItem] = useState(false);
  const [id,setId] = useState('');
  const [totalPrice,setTotalPrice] = useState('');
  const [percent,setPercent] = useState('');
  const [sellPrice,setSellPrice] = useState('');
  const [description,setDescription] = useState('');
  const tname = useLocation().pathname.split('/')[4];
  const url =  useSelector(state=>state.auth.url);

  useEffect(()=>{
     getDoctors();
     getTherapists();
     getProcedures();
     getAccessories();
     getMachines();
  },[])
  const getDoctors = async () =>{
    const res = await axios.get(url+'api/doctors');
    setDoctors(res.data.data);
  }
  const getTherapists = async () =>{
    const res = await axios.get(url+'api/therapists');
    setTherapists(res.data.data);
  }
  const getProcedures = async () =>{
    const res = await axios.get(url+'api/procedure-items');
    setProcedures(res.data.list);
  }
  const getAccessories = async () =>{
    const res = await axios.get(url+'api/accessory-items');
    setAccessories(res.data.list);
  }
  const getMachines = async () =>{
    const res = await axios.get(url+'api/fixed-assets');
    setMachines(res.data.list.filter((el) => el.type == 'Medical Equipment' || el.type == 'Surgery Equipment' || el.type == 'Medical Machinery'));
  }
  const chgItem = async () =>{
    const obj = {
      "item_id":id,
      "quantity":1,
      "perUsageQTY":1,
    }
    setItems( arr => [...arr, obj]);
    console.log(3);
    console.log(items);
    setIsItem(true);
  }
  return (
    <div>
        <Nav/>
        <Left><Title>Treatment Unit Create</Title></Left>
        <Div className='card'>
          <Div className='card-body row'>
            <h6>{tname}'s Unit</h6>
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
                {
                  doctors.map((doctor,i)=>(
                      <Option value={doctor._id}>{doctor.name}</Option>
                  ))
                }
                </Select>
            </Div>
            <Div className='col-4 form-group mt-3'>
                <Label>Therapist Name<Span>*</Span></Label>
                <Select className='form-control'>
                <Option>Select Therapist</Option>
                {
                  therapists.map((therapist,i)=>(
                      <Option value={therapist._id}>{therapist.name}</Option>
                  ))
                }
                </Select>
            </Div>
            <Div className='col-6 form-group mt-3'>
                <Label>Procedure Medicine</Label>
                <Select className='form-control' onChange={(e)=>setId(e.target.value)}>
                <Option>Select Procedure Medicine</Option>
                {
                  procedures.map((procedure,index)=>(
                      <Option value={procedure._id}>{procedure.procedureItemName}</Option>
                  ))
                }
                </Select>
            </Div>
            <Div className='col-3 mt-3'>
            <Button onClick={chgItem}>Add</Button>
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
            {isItem && <Tbody>
            {procedures.map((procedure,index)=>(
                items.map((item,i)=>{
                  procedure._id == item.item_id &&
                  <Tr>
                    <Td>{++i}</Td>
                    <Td>{procedure.procedureItemName}</Td>
                    <Td>1</Td>
                    <Td>{procedure.purchasePrice}</Td>
                    <Td>1</Td>
                    <Td>{procedure.purchasePrice}</Td>
                  </Tr>
                })
              ))
            }
            </Tbody>}
            </Table>
            </Div>
           <Div className='col-6 form-group mt-3'>
            <Label>Procedure Accessory</Label>
            <Select className='form-control'>
            <Option>Select Procedure Accessory</Option>
            {
              accessories.map((accessory,index)=>(
                <Option value={accessory._id}>{accessory.accessoryItemName}</Option>
            ))
             }
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
                {
                  machines.map((machine,i)=>(
                    <Option value={machine._id}>{machine.name}</Option>
                ))
                  }
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
                <Input type="number" className='form-control' onChange={(e)=>setTotalPrice(e.target.value)}/>
            </Div>
            <Div className='col-2 form-group mt-3'>
                <Label>Percent(%)<Span>*</Span></Label>
                <Input type="number" className='form-control' onChange={(e)=>setPercent(e.target.value)}/>
            </Div>
            <Div className='col-4 form-group mt-3'>
                <Label>Selling Price<Span>*</Span></Label>
                <Input type="number" className='form-control' onChange={(e)=>setSellPrice(e.target.value)}/>
            </Div>
            <Div className='col-6 form-group mt-3'>
                <Label>Description</Label>
                <Textarea className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
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