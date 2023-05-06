import React,{useEffect,useState} from 'react'
import Nav from "../../components/Navbar"
import styled from 'styled-components'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector} from 'react-redux';
import {RxCross2} from 'react-icons/rx'
import { GiMachineGun } from 'react-icons/gi';


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
  const [accitems,setAccItems] = useState([]);
  const [isAccItem,setIsAccItem] = useState(false);
  const [accid,setAccId] = useState('');
  const [macitems,setMacItems] = useState([]);
  const [isMacItem,setIsMacItem] = useState(false);
  const [macid,setMacId] = useState('');
  const [totalPrice,setTotalPrice] = useState('');
  const [percent,setPercent] = useState('');
  const [sellPrice,setSellPrice] = useState('');
  const [description,setDescription] = useState('');
  const [doctorname,setDoctorName] = useState('');
  const [therapistname,setTherapistName] = useState('');
  const [treatmenttime,setTreatmentTime] = useState('');
  const [treatmentCode,setTreatmentCode] = useState('');
  const [treatmentName,setTreatmentName] = useState('');
  const navigate = useNavigate();
  const tname = useLocation().pathname.split('/')[4];
  const name =  useLocation().pathname.split('/')[3];
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
  const addProcedure =  () =>{
    const obj = {
      "item_id":id,
      "quantity":1,
      "perUsageQTY":1,
    }
    setItems( arr => [...arr, obj]);
    setIsItem(true);
  }
  const removeProcedure = (id) => {
    setItems(items.filter((el)=>el.item_id != id));
  }
  const addAccProcedure =  () =>{
    const obj = {
      "item_id":accid,
      "quantity":1,
      "perUsageQTY":1,
    }
    setAccItems( arr => [...arr, obj]);
    setIsAccItem(true);
  }
  const removeaccessory = (id) => {
    setAccItems(accitems.filter((el)=>el.item_id != id));
  }
  const addMacProcedure =  () =>{
    const obj = {
      "item_id":macid,
      "quantity":1,
      "perUsageQTY":1,
    }
    setMacItems( arr => [...arr, obj]);
    setIsMacItem(true);
  }
  const removeMac = (id) => {
    setMacItems(macitems.filter((el)=>el.item_id != id));
  }
  const create = () => {
    const data = {
      "treatmentCode":treatmentCode, 
      "treatmentName":name, 
      "treatmentTimes":treatmenttime,
      "relatedDoctor": doctorname,
      "procedureMedicine":items,
      "procedureAccessory":accitems,
      "machine":macitems,
      "estimateTotalPrice":totalPrice,
      "discount":percent,
      "sellingPrice":sellPrice,
      "description":description,
      "status":true
      }
      const res = axios.post(url+'api/treatment',data)
       .then(function (response) {
        // alert('success')
        navigate(-1);
       })
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
                <Input type="text" className='form-control' onChange={(e)=>setTreatmentName(e.target.value)}/>
            </Div>
            <Div className='col-4 form-group'>
                <Label>Treatment Unit Code<Span>*</Span></Label>
                <Input type="text" className='form-control' onChange={(e)=>setTreatmentCode(e.target.value)}/>
            </Div>
            <Div className='col-4 form-group'>
                <Label>Treatment Times<Span>*</Span></Label>
                <Input type="text" className='form-control' onChange={(e)=>setTreatmentTime(e.target.value)}/>
            </Div>
            <Div className='col-4 form-group mt-3'>
                <Label>Doctor Name<Span>*</Span></Label>
                <Select className='form-control' onChange={(e)=>setDoctorName(e.target.value)}>
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
                <Select className='form-control' onChange={(e)=>setTherapistName(e.target.value)}>
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
            <Button onClick={addProcedure}>Add</Button>
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
              <Th></Th>
            </Tr>
            </Thead>
            {isItem && <Tbody>
                  {items.map((item,index)=>(
                    procedures.map((procedure,i)=>(
                      item.item_id == procedure._id &&
                      <Tr>
                      <Td>{++index}</Td>
                      <Td>{procedure.procedureItemName}</Td>
                      <Td>1</Td>
                      <Td>{procedure.purchasePrice}</Td>
                      <Td>1</Td>
                      <Td>{procedure.purchasePrice}</Td>
                      <Td><RxCross2 onClick={()=>removeProcedure(procedure._id)}/></Td>
                      </Tr>
                    ))
                  ))}
            </Tbody>}
            </Table>
            </Div>
           <Div className='col-6 form-group mt-3'>
            <Label>Procedure Accessory</Label>
            <Select className='form-control' onChange={(e)=>setAccId(e.target.value)}>
            <Option>Select Procedure Accessory</Option>
            {
              accessories.map((accessory,index)=>(
                <Option value={accessory._id}>{accessory.accessoryItemName}</Option>
            ))
             }
            </Select>
          </Div>
            <Div className='col-3 mt-3'>
            <Button onClick={addAccProcedure}>Add</Button>
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
            {isAccItem && <Tbody>
                  {accitems.map((accitem,index)=>(
                    accessories.map((accessory,i)=>(
                      accitem.item_id == accessory._id &&
                      <Tr>
                      <Td>{++index}</Td>
                      <Td>{accessory.accessoryItemName}</Td>
                      <Td>1</Td>
                      <Td>{accessory.purchasePrice}</Td>
                      <Td>1</Td>
                      <Td>{accessory.purchasePrice}</Td>
                      <Td><RxCross2 onClick={()=>removeaccessory(accessory._id)}/></Td>
                      </Tr>
                    ))
                  ))}
            </Tbody>}
            </Table>
            </Div>
            <Div className='col-6 form-group mt-3'>
                <Label>Machine</Label>
                <Select className='form-control' onChange={(e)=>setMacId(e.target.value)}>
                <Option>Select Machine</Option>
                {
                  machines.map((machine,i)=>(
                    <Option value={machine._id}>{machine.name}</Option>
                ))
                  }
                </Select>
            </Div>
            <Div className='col-3 mt-3'>
            <Button onClick={addMacProcedure}>Add</Button>
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
            {isMacItem && <Tbody>
                  {macitems.map((macitem,index)=>(
                    machines.map((machine,i)=>(
                      macitem.item_id == machine._id &&
                      <Tr>
                      <Td>{++index}</Td>
                      <Td>{machine.name}</Td>
                      <Td>1</Td>
                      <Td>{machine.initialPrice}</Td>
                      <Td>1</Td>
                      <Td>{machine.initialPrice}</Td>
                      <Td><RxCross2 onClick={()=>removeMac(machine._id)}/></Td>
                      </Tr>
                    ))
                  ))}
            </Tbody>}
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
                <Button onClick={create}>Save</Button>
            </Center>
          </Top>
          </Div>
        </Div>
    </div>
  )
}

export default Create