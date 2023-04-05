import React,{useEffect,useState} from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link,useLocation } from 'react-router-dom';
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
  const [patient,setPatient] = useState('');
  const [doctor,setDoctor] = useState('');
  const [isopen,setIsOpen] = useState(false);
  const [isCash,setIsCash] = useState(false);
  const [leftAmount,setLeftAmount] = useState('');
  const [treatments,setTreatments] = useState([]);
  const [selections,setSelections] = useState([]);
  const [accounts,setAccounts] = useState([]);
  const [accountings,setAccountings] = useState([]);
  const [treatmentCode,setTreatmentCode] = useState('');
  const [treatmentId,setTreatmentId] = useState('');
  const [totalAmount,setTotalAmount] = useState('');
  const [treatmentName,setTreatmentName] = useState('');
  const [method,setMethod] = useState('');
  const [bankacc,setBankAcc] = useState('');
  const url =  useSelector(state=>state.auth.url);
  const appointmentid = useLocation().pathname.split("/")[2];
  console.log(appointmentid);
  useEffect(()=>{
    const getTreatments = async () =>{
      try{
        const res = await axios.get(url+'api/treatments');
        setTreatments(res.data.list);
      }catch(err){}
    };
   
    const getAccounts = async () =>{
      try{
        const res = await axios.get(url+'api/accounting-lists');
        setAccounts(res.data.list);
        setAccountings(res.data.list);
      }catch(err){}
    };
    getAccounts();
    getTreatments();
    getpatient();
  },[])
  const getpatient = async () => {
    const res = await axios.get(url+'api/appointment/'+appointmentid);
    setPatient(res.data.data[0].relatedPatient);
    setDoctor(res.data.data[0].relatedDoctor);
    // setTreatmentName(res.data.treatment[0])
    // res.data.data[0].relatedTreatmentSelection.map((el)=>{
    //   selections.push(el);
    // })
    // const uniqueTags = [];
    res.data.data[0].relatedTreatmentSelection.map((item) => {
      var findItem = selections.find((x) => x._id === item._id);
      if (!findItem) selections.push(item);
    });
        
  }
  const getTreatmentCode = async (id) => {
    const res = await axios.get(url+'api/treatment/'+id);
    // console.log(res.data.data[0].treatmentCode);
    setTreatmentCode(res.data.data[0].treatmentCode);
    setTreatmentId(id);
    setTotalAmount(res.data.data[0].sellingPrice)
  }
  const getPaymentMethod = (val) => {
    if(val == 'Credit'){
     document.getElementById('paid').value = 0;
     setLeftAmount(totalAmount);
     setIsCash(false);
    }else{
      if(val == 'Cash'){setAccounts(accountings.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash In Hand'))}
      if(val == 'Bank'){setAccounts(accountings.filter((el)=>el.relatedType.name == 'Assets' && el.relatedHeader.name == 'Cash At Bank'))}
      setIsCash(true);
      document.getElementById('paid').value = 0;
      setLeftAmount('');
    }
    setMethod(val);
  }
  const storeTreatmentSelection = () => {
    var paid = document.getElementById('paid').value;
    const data = {
      paymentMethod:method,relatedBank:bankacc,appointment:appointmentid,
      paidAmount:paid,totalAmount:totalAmount,relatedTreatment:treatmentId,
      relatedPatient:patient._id,relatedDoctor:doctor._id,phone:patient.phone,
    }
    const res = axios.post(url+'api/treatment-selection',data)
     .then(function (response) {
         console.log('success');
         const data1 = {
          relatedPatient:patient._id,
          relatedTreatment: treatmentId,
          leftOverAmount:leftAmount,
          paidAmount:paid,
          relatedTreatmentSelection:response.data.data._id,
          fullyPaid:true,
          }
          const res = axios.post(url+'api/patient-treatment',data1)
          .then(function (response) {
            alert('successs');setTotalAmount(0);
            setLeftAmount(0);
            document.getElementById('paid').value = 0;
            setIsOpen(false);
            getpatient();
          })
         
     })
  }
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
            <Div className='col-6 form-group '>
                <h6>Patient Name - {patient.name}</h6>
                <h6>Patient Id - {patient.patientID}</h6>
                <h6>Status - {patient.patientStatus}</h6>
                <h6>Email - {patient.email}</h6>
            </Div>
            <Div className='col-6 form-group '>
                <h6>Member Status - {patient.patientStatus}</h6>
                <h6>Occupation - {patient.occupation}</h6>
                <h6>Gender - {patient.gender}</h6>
                <h6>DOB - {patient.dateOfBirth}</h6>
            </Div>
            <Div className='col-12 mt-2'>
                <But>Add Medicine History</But>
            </Div>
            </Div>
            </Div>
            <Div className='col-2'>
              <Img src='' width='120' height='150'/>
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
              <But onClick={()=>setIsOpen(true)}>Start Procedure</But>
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
              {selections.map((treat,i)=>(
                <> 
                <Tr key={treat._id}>
                <Td>{++i}</Td>
                <Td>{treat.relatedTreatment}</Td>
                <Td><Badge>Ongoing</Badge></Td>
                <Td>Test Dr.1</Td>
                <Td>{treat.relatedAppointments.length}Times</Td>
                <Td>{treat.totalAmount}</Td>
                <Td>{treat.leftOverAmount}</Td>
                <Td><Link to={'/single_payment/'+patient._id}><Btn>Payment</Btn></Link></Td>
              </Tr>
              <tr>
                  <td colspan="10">
                    <div>
                      <table className="table bg-light">
                        <tbody>
                        {treat.relatedAppointments.map((app,index)=>(<tr className="text-center">
                            <th>{++index}</th>
                            <th><Badge>Ongoing</Badge></th>
                            <th>Date/Time</th>
                            <th>No History</th>
                            <th>Medicine Sale Amount</th>
                            <th>Appointment Status</th>
                            <th>Action</th>
                        </tr>))}
                        <tr>
                          <td colSpan='1'></td>
                          <td colSpan='6'>
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Link to={'/medicine_sale/'+appointmentid+'/'+treat.relatedTreatment}><Button>Medicine Sale</Button></Link>
                            <Button>Add Treatment History</Button>
                            <Button>Item Adjustment</Button>
                            <Button>Ongoing</Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
              </tr>
              </>
              ))}
            
            </Tbody>
          </Table>
          
            </Div> 
            {isopen && <Div className='col-3'>
              <Div className='card'>
                <Div className='card-body row'>
                  <Title>Treatment</Title>
                <Div className='col-12 mt-2 form-group '>
                <Label>Treatment Name<Span>*</Span></Label>
                <Select className='form-control' onChange={(e)=>getTreatmentCode(e.target.value)}>
                <Option>Select Treatment Name</Option>
                {treatments.map((treatment,i)=>(
                <Option value={treatment._id}>{treatment.treatmentName}</Option>
                ))}
                </Select>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Treatment Code<Span>*</Span></Label>
                <Input type="text" className='form-control' value={treatmentCode}/>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Payment Method<Span>*</Span></Label>
                <Select className='form-control' onChange={(e)=>getPaymentMethod(e.target.value)}>
                <Option>Select Payment Method</Option>
                <Option value="Credit">Credit</Option>
                <Option value="Cash">Cash</Option>
                <Option value='Bank'>Bank</Option>
                </Select>
                </Div>
                {isCash && <Div className='col-12 mt-2 form-group'>
                <Label>Bank Information<Span>*</Span></Label>
                <Select className='form-control' onChange={(e)=>setBankAcc(e.target.value)}>
                <Option>Select Account</Option>
                {accounts.map((account,i)=>(
                <Option value={account._id}>{account.name}</Option>
                ))}
                </Select>
                </Div>}
                <Div className='col-12 mt-2 form-group '>
                <Label>Paid Amount<Span>*</Span></Label>
                <Input type="number" className='form-control' id='paid' onChange={(e)=>setLeftAmount(totalAmount-e.target.value)}/>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Left-Over Amount<Span>*</Span></Label>
                <Input type="number" className='form-control' value={leftAmount}/>
                </Div>
                <Div className='col-12 mt-2 form-group '>
                <Label>Total Amount<Span>*</Span></Label>
                <Input type="number" className='form-control' value={totalAmount}/>
                </Div>
                <Div className='col-6 mt-3'>
                <But onClick={storeTreatmentSelection}>Submit</But>
                </Div>
                <Div className='col-6 mt-3'>
                <But onClick={()=>setIsOpen(false)}>Cancel</But>
                </Div>
                </Div>
              </Div>
            </Div>}
            
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