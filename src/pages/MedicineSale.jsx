import React,{useEffect,useState} from 'react'
import Nav from '../components/Navbar'
import styled from 'styled-components'
import { useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import { addCart,removeCart } from '../redux/medicinesaleRedux';
import {RxCross2} from 'react-icons/rx'
import {MdDiscount} from 'react-icons/md'


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
  const [treatments,setTreatments] = useState([]);
  const [banks,setBanks] = useState([]);
  const [total,setTotal] = useState(0);
  const [grandtotal,setGrandTotal] = useState(0);
  const [change,setChange] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(()=> {
    const getMedicines = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/medicine-items');
        setMedicines(res.data.list);
      }catch(err){}
    };
    const getTreatments = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/treatments');
        setTreatments(res.data.list);
      }catch(err){}
    };
    const getBanks = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/banks');
        console.log(res.data.list);
        setBanks(res.data.list);
      }catch(err){}
    };
    getMedicines();
    getTreatments();
    getBanks();
  },[]);

  const addcart = async (val) =>{
    try{
      const response = await axios.get('http://localhost:9000/api/medicine-item/'+val);
      console.log(response.data.data[0].name.name);
      const cart = {id:response.data.data[0]._id,name:response.data.data[0].name.name,qty:1,unit_price:response.data.data[0].sellingPrice,amount:response.data.data[0].sellingPrice}
      dispatch(addCart(cart));
      setTotal(total+response.data.data[0].sellingPrice);
      setGrandTotal(total+response.data.data[0].sellingPrice);
    }catch(err){}
  }

  const storevou = () => {
    const data = {
    relatedTreatment:'640971058e97e241d889abb5', 
    relatedAppointment:'640ea459495cab76949ba4ec', 
    relatedPatient:'64081b0c60513a528cdaa534',
    remark:'remake',
    totalAmount:50000,
    payAmount:45000,
    change:0,
    paymentMethod:'Cash Down',
    bankInfo:'640e9dc42704f41d3c932694',
    discount:5,
    grandTotal:45000,
    medicineItems:carts,
    }
    const res = axios.post('http://localhost:9000/api/medicine-sale',data)
     .then(function (response) {
      alert('success')
     })
  }

  return (
    <div>
      <Nav/>
      <Top>
        <Right><Button>Refresh</Button></Right>
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
                  <Td>{el.qty}</Td>
                  <Td>{el.unit_price}</Td>
                  <Td><MdDiscount/></Td>
                  <Td>{el.amount}</Td>
                  <Td><RxCross2 onClick={()=>dispatch(removeCart({id:el.id}),setTotal(total-el.amount),setGrandTotal(total-el.amount))}/></Td>
                  </Tr>
                ))
              }
                
              </Tbody>
            </Table>
          </Div>
          <Div className='col-3'>
          <Div className='card-body'>
            <Select>
              <Option>Select Treatment</Option>
            {treatments.map((treatment,i)=>(
              <Option value={treatment._id}>{treatment.treatmentName}</Option>
              ))}
            </Select>
            <Input type="text" placeholder='Customer Name'/>
            <Input type="number" placeholder='Phone Number'/>
            <Textarea placeholder='remark'/>
            <hr />
            <Div className='row'>
            <Div className='col-5'>
              <Label>Total</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'163px'}} value={total} readOnly/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Discount</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'163px'}} value='0'/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Grand Total</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'163px'}} value={grandtotal} readOnly/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Pay Amount</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'163px'}} onChange={(e)=>setChange(e.target.value - grandtotal)}/>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Change</Label>
            </Div>
            <Div className='col-7'>
              <input type='number' placeholder='Amount' style={{width:'163px'}} value={change} readOnly/>
            </Div>
            </Div>
            <hr/>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Payment</Label>
            </Div>
            <Div className='col-7'>
              <select style={{width:'163px'}}>
                <option>Choose Method</option>
                <option value="1">Cash Down</option>
                <option value='2'>Bank Transaction</option>
              </select>
            </Div>
            </Div>
            <Div className='row mt-3'>
            <Div className='col-5'>
              <Label>Bank Info</Label>
            </Div>
            <Div className='col-7'>
              <select style={{width:'163px'}}>
                <option>Choose Bank</option>
                {banks.map((bank,i)=>(
                <option value={bank._id}>{bank.bankName}</option>
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