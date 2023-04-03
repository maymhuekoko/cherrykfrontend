import React,{useEffect,useState} from 'react'
import Nav from '../components/Navbar'
import styled from 'styled-components'
import { useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import { addCart,removeCart,changeQty,resetCart } from '../redux/medicinesaleRedux';
import {RxCross2} from 'react-icons/rx'
import {MdDiscount} from 'react-icons/md'
import { useLocation } from 'react-router-dom';


const Top = styled.div`
display : flex;
justify-content: space-between;
margin : 20px 30px;
`;

const Right = styled.div`
font-weight : normal;
flex: 1;
display : flex;
justify-content: flex-end;
`;

const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: center;
padding: 5px 30px;
border:none;
border-radius:10px;
`
const Div = styled.div`
`
const Textarea = styled.textarea`
margin-top:20px;
width:100%;
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
const Select  = styled.select`
width:100%;
padding:6px 5px;
border-radius: 7px;
`
const Input = styled.input`
width:100%;
margin-top:20px;
`
const Label = styled.label`
`

const Option = styled.option``

const MedicineSale = () => {
  const carts =  useSelector(state=>state.medicinesale.carts);
  const [medicines,setMedicines] = useState([]);
  const [treatments,setTreatments] = useState('');
  const [tname,setTname] = useState('');
  const [tphone,setTphone] = useState('');
  const [patientId,setPatientId] = useState('');
  const [remark,setRemark] = useState('');
  const [banks,setBanks] = useState([]);
  const [accounts,setAccounts] = useState([]);
  const total = useSelector(state=>state.medicinesale.total);
  const grandtotal = useSelector(state=>state.medicinesale.grandTotal);
  const [change,setChange] = useState(0);
  const [payamount,setPayamount] = useState(0);
  const [method,setMethod] = useState('');
  const [bankinfo,setBankInfo] = useState('');
  const url =  useSelector(state=>state.auth.url);
  const dispatch = useDispatch();
  const appointment_id = useLocation().pathname.split('/')[2];  
  const treatment_id = useLocation().pathname.split('/')[3];  
  
  useEffect(()=> {
    const getMedicines = async () =>{
      try{
        const res = await axios.get(url+'api/medicine-items');
        setMedicines(res.data.list);
      }catch(err){}
    };
    const getTreatments = async () =>{
      try{
        const res = await axios.get(url+'api/treatment/'+treatment_id);
        setTreatments(res.data.data[0]);
        setTname(res.data.data[0].relatedPatient.name);
        setTphone(res.data.data[0].relatedPatient.phone);
        setPatientId(res.data.data[0].relatedPatient._id);
      }catch(err){}
    };
    const getBanks = async () =>{
      try{
        const res = await axios.get(url+'api/accounting-lists');
        setAccounts(res.data.list);
        setBanks(res.data.list);
      }catch(err){}
    };
    getMedicines();
    getTreatments();
    getBanks();
  },[]);

  const addcart = async (val) =>{
    try{
      const response = await axios.get(url+'api/medicine-item/'+val);
      console.log(response.data.data[0].name.name);
      const cart = {id:response.data.data[0]._id,name:response.data.data[0].name.name,qty:1,unit_price:response.data.data[0].sellingPrice,amount:response.data.data[0].sellingPrice}
      dispatch(addCart(cart));
    }catch(err){}
  }

  const storevou = () => {
    const data = {
    relatedTreatment:treatment_id, 
    relatedAppointment:appointment_id, 
    relatedPatient:patientId,
    remark:remark,
    totalAmount:total,
    payAmount:payamount,
    change:change,
    paymentMethod:method,
    bankInfo:bankinfo,
    discount:0,
    grandTotal:grandtotal,
    medicineItems:carts,
    }
    const res = axios.post(url+'api/medicine-sale',data)
     .then(function (response) {
      alert('success')
     })
  }
  const changeBank = (val) =>{
    setMethod(val);
    if(val == 'Cash Down'){setBanks(accounts.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash In Hand'))}
    if(val == 'Bank'){setBanks(accounts.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash At Bank'))}
  }

  return (
    <div>
      <Nav/>
      <Top>
        <Right><Button onClick={()=>dispatch(resetCart())}>Refresh</Button></Right>
      </Top>
      <Div className='card'>
        <Div className='card-body row'>
          <Div className='col-9'>
            <Div className='row'>
              <Div className='col-10'>
                <Select onChange={(e)=>addcart(e.target.value)}>
                  <Option>Select Medicine</Option>
              {medicines.map((medicine,index)=>(
              <Option value={medicine._id}>{medicine.name.name}</Option>
              ))}
                </Select>
              </Div>
              <Div className='col-2'>
                  <Button>Add</Button>
              </Div>
            </Div>
            <Table className='table table-hover mt-4'>
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Item Name</Th>
                  <Th>Qty</Th>
                  <Th>Unit Price</Th>
                  <Th>Discount</Th>
                  <Th>Amount</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
              {
                carts.map((el,index)=>(
                  <Tr key={index}>
                  <Td>{++index}</Td>
                  <Td>{el.name}</Td>
                  <Td><input type="text" placeholder={el.qty} style={{border:'none'}} onChange={(e)=>dispatch(changeQty({id:el.id,qty:e.target.value,unit_price:el.unit_price}))}/></Td>
                  <Td>{el.unit_price}</Td>
                  <Td><MdDiscount/></Td>
                  <Td>{el.amount}</Td>
                  <Td><RxCross2 onClick={()=>dispatch(removeCart({id:el.id,amount:el.amount}))}/></Td>
                  </Tr>
                ))
              }
                
              </Tbody>
            </Table>
          </Div>
          <Div className='col-3'>
          <Div className='card-body'>
            <Input type='text'  value={treatments.treatmentName}/>
            <Input type="text" placeholder='Customer Name' value={tname}/>
            <Input type="number" placeholder='Phone Number' value={tphone}/>
            <Textarea placeholder='remark' onChange={(e)=>setRemark(e.target.value)}/>
            <hr />
            <Div className='row'>
            <Div className='col-5'>
              <Label>Total</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'137px'}} value={total} readOnly/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Discount</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'137px'}} value='0'/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Grand Total</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'137px'}} value={grandtotal} readOnly/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Pay Amount</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'137px'}} onChange={(e)=>{setChange(e.target.value - grandtotal);setPayamount(e.target.value);}}/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Change</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'137px'}} value={change} readOnly/>
            </Div>
            </Div>
            <hr/>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Payment</Label>
            </Div>
            <Div className='col-7'>
              <select style={{width:'137px'}} onChange={(e)=>changeBank(e.target.value)}>
                <option>Choose Method</option>
                <option value="Cash Down">Cash Down</option>
                <option value='Bank'>Bank Transaction</option>
              </select>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Bank Info</Label>
            </Div>
            <Div className='col-7'>
              <select style={{width:'137px'}} onChange={(e)=>setBankInfo(e.target.value)}>
                <option>Choose Bank</option>
                {banks.map((bank,i)=>(
                <option value={bank._id}>{bank.name}</option>
                ))}
              </select>
            </Div>
            <Div className='row mt-5'>
              <Div className='col-5'>
              <Button>Print</Button>
              </Div>
              <Div className='offset-1 col-6'>
                <Button onClick={storevou}>Store</Button>
              </Div>
            </Div>
            </Div>
          </Div>
          </Div>
        </Div>
      </Div>
    </div>
  )
}

export default MedicineSale