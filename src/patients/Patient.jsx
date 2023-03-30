import React,{useState,useEffect} from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import {AiOutlinePlus,AiTwotoneFilter,AiFillInfoCircle} from 'react-icons/ai'
import {FaFileExport} from "react-icons/fa"
import axios from 'axios'

const Top = styled.div`
display : flex;
justify-content: space-between;
margin : 10px 0;
`;

const Left = styled.div`
font-weight : normal;
flex: 1;
`;

const Title = styled.h5`
font-weight : bold;
margin-top : 10px;
`

const Right = styled.div`
font-weight : normal;
flex: 1;
display : flex;
justify-content: flex-end;
`;


const Button = styled.button`
background: rgb(0,7,51);
color: white; 
justify-content: flex-end;
padding: 5px 10px;
border:none;
border-radius:10px;
`

const Btn = styled.button`
padding: 4px 8px;
border-radius:5px;
margin-left : 13px;
`

const Div = styled.div`
`
const Input = styled.input`
width:165px;
border:1px solid grey;
border-radius:12px;
padding:3px;
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
const Select = styled.select`
padding:0px 7px;
border-radius: 5px;
`
const Option = styled.option`
`

const Patient = () => {
  const [patients,setPatients] = useState([]);
  const [allpatients,setAllPatients] = useState([]);
  const [isOpen,setIsOpen] = useState(false);

  useEffect(()=> {
    const getPatients = async () =>{
      try{
        const res = await axios.get('http://localhost:9000/api/patients');
        setPatients(res.data.list);
        setAllPatients(res.data.list);
      }catch(err){}
    };
    getPatients();
  },[]);

  const genderfilter = (val) => {
      if(val == 1){
        setPatients(allpatients.filter((el)=>el.gender==='Male'));
      }
      if(val == 2){
        setPatients(allpatients.filter((el)=>el.gender==='Female'));
      }
  }

  const show = () => setIsOpen(!isOpen);

  return (
    <div>
        <Nav/>
        <Top>
          <Left><Title>Patient List</Title></Left>
          <Right><Button><AiOutlinePlus style={{marginRight:'7px'}}/>Patient Register</Button></Right>
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Top>
          <Left><Input type="text" placeholder="Search..."/></Left>
          <Right>
            {isOpen && <Select onChange={(e)=>genderfilter(e.target.value)}>
              <Option>Gender</Option>
              <Option value="1">Male</Option>
              <Option value="2">Female</Option>
            </Select>}
            <Btn className='btn btn-outline-primary'><AiTwotoneFilter onClick={show}/></Btn>
            <Btn className='btn btn-outline-success'><FaFileExport/></Btn>
          </Right>
         </Top>
          <Table className='table table-hover'>
            <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Patient Id</Th>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Phone</Th>
              <Th>Date of Birth</Th>
              <Th>Gender</Th>
              <Th>Address</Th>
              <Th>Action</Th>
            </Tr>
            </Thead>
            <Tbody>
            {patients.map((patient,i) => (
              <Tr>
              <Td>{++i}</Td>
              <Td>{patient.patientID}</Td>
              <Td>{patient.name}</Td>
              <Td>{patient.age}</Td>
              <Td>{patient.phone}</Td>
              <Td>{patient.dateOfBirth}</Td>
              <Td>{patient.gender}</Td>
              <Td>{patient.address}</Td>
              <Td><Btn className='btn btn-sm btn-primary'>Detail<AiFillInfoCircle style={{marginLeft:'7px'}}/></Btn></Td>
            </Tr>
            ))
            }
            </Tbody>
          </Table>
          </Div>
         </Div>
    </div>
  )
}

export default Patient