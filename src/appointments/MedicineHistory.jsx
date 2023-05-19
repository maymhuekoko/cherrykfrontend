import React,{useState,useEffect} from 'react'
import Nav from "../components/Navbar"
import styled from 'styled-components'
import {AiOutlinePlus,AiTwotoneFilter,AiFillInfoCircle} from 'react-icons/ai'
import {FaFileExport} from "react-icons/fa"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

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

const MedicineHistory = () => {
  const  [skincare,setSkinCare] = useState([]);
  const [skin,setSkin] = useState('');
  const  [skintype,setSkinType] = useState([]);
  const [type,setType] = useState('');
  const  [skinspot,setSkinSpot] = useState([]);
  const [spot,setSpot] = useState('');
  const  [skinance,setSkinAnce] = useState([]);
  const [ance,setAnce] = useState('');
  const  [skinfat,setSkinFat] = useState([]);
  const [fat,setFat] = useState('');
  const  [skindesign,setSkinDesign] = useState([]);
  const [design,setDesign] = useState('');
  const [drughistory,setDrugHistory] = useState('');
  const [medicalhistory,setMedicalHistory] = useState('');
  const [complaint,setCompliant] = useState('');
  const [allergyhistory,setAllergyHistory] = useState('');
  const [treatmenthistory,setTreatmentHistory] = useState('');
  const patientID = useLocation().pathname.split('/')[2];
  const url =  useSelector(state=>state.auth.url);
  const [physicalexamination,setPhysicalExamination] = useState('');
  const navigate = useNavigate();
  const addSkin = () => {
    const obj = {
      'name' : skin,
      'remark' : '',
    }
    setSkinCare( arr => [...arr, obj]);
  }
  const removeSkin = (name) => {
    setSkinCare(skincare.filter((el,i)=>el.name != name));
  }
  const changeSkin = (name,qty) => {
    let cart = skincare.find((el)=>el.name == name);
    cart.remark = qty;
    console.log(skincare);
  }
  const addType = () => {
    const obj = {
      'name' : type,
      'remark' : '',
    }
    setSkinType( arr => [...arr, obj]);
  }
  const removeType = (name) => {
    setSkinType(skintype.filter((el,i)=>el.name != name));
  }
  const changeType = (name,qty) => {
    let cart = skintype.find((el)=>el.name == name);
    cart.remark = qty;
    console.log(skintype);
  }
  const addSpot = () => {
    const obj = {
      'name' : spot,
      'remark' : '',
    }
    setSkinSpot( arr => [...arr, obj]);
  }
  const removeSpot = (name) => {
    setSkinSpot(skinspot.filter((el,i)=>el.name != name));
  }
  const changeSpot = (name,qty) => {
    let cart = skinspot.find((el)=>el.name == name);
    cart.remark = qty;
    console.log(skinspot);
  }
  const addAnce = () => {
    const obj = {
      'name' : ance,
      'remark' : '',
    }
    setSkinAnce( arr => [...arr, obj]);
  }
  const removeAnce = (name) => {
    setSkinAnce(skinance.filter((el,i)=>el.name != name));
  }
  const changeAnce = (name,qty) => {
    let cart = skinance.find((el)=>el.name == name);
    cart.remark = qty;
    console.log(skinance);
  }
  const addFat = () => {
    const obj = {
      'name' : fat,
      'remark' : '',
    }
    setSkinFat( arr => [...arr, obj]);
  }
  const removeFat = (name) => {
    setSkinFat(skinfat.filter((el,i)=>el.name != name));
  }
  const changeFat = (name,qty) => {
    let cart = skinfat.find((el)=>el.name == name);
    cart.remark = qty;
    console.log(skinfat);
  }
  const addDesign = () => {
    const obj = {
      'name' : design,
      'remark' : '',
    }
    setSkinDesign( arr => [...arr, obj]);
  }
  const removeDesign = (name) => {
    setSkinDesign(skindesign.filter((el,i)=>el.name != name));
  }
  const changeDesign = (name,qty) => {
    let cart = skindesign.find((el)=>el.name == name);
    cart.remark = qty;
    console.log(skindesign);
  }
  const saveHistory = () =>{
    const data = {
    "skinCareAndCosmetic": skincare,
    "drugHistory": drughistory,
    "medicalHistory": medicalhistory,
    "allergyHistory": allergyhistory,
    "treatmentHistory": treatmenthistory,
    "complaint": complaint,
    "relatedPatient":patientID
    }
    axios.post(url+'api/history',data)
     .then(function (response) {
      Swal.fire({
        title: "Success",
        text: "successfully History Create!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        // alert('success')
        navigate('/medicine-history/'+patientID)
        })
     })
  }
  const saveExamination = () => {
    const data1 = {
    "skinType": skintype,
    "acne":skinance,
    "melasmaAndBlackSpot": skinspot,
    "mesoFat": skinfat,
    "facialDesign": skinfat,
    "otherPhysicalExamination": physicalexamination,
    "relatedPatient": patientID
    }
    axios.post(url+'api/physical-examination',data1)
     .then(function (response) {
      Swal.fire({
        title: "Success",
        text: "successfully Physical Examination Create!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        // alert('success')
        navigate('/medicine-history/'+patientID)
        })
     })
  }
  return (
    <div>
        <Nav/>
        <Top>
          <Left><Title>Medical History</Title></Left>
          {/* <Right><Button><AiOutlinePlus style={{marginRight:'7px'}}/>Patient Register</Button></Right> */}
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Tabs>
          <TabList>
            <Tab>History</Tab>
            <Tab>Physical Examination</Tab>
          </TabList>

          <TabPanel>
          <div className='row mt-3'>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Skin Care & Cosmetic</label>
                <select name="" id="" className='form-control' onChange={(e)=>setSkin(e.target.value)}>
                <option value="">Choose Type</option> 
                <option value="Facial Cleaner">Facial Cleaner</option>
                <option value="Toner">Toner</option>
                <option value="SunCream">SunCream</option>
                <option value="Scrub">Scrub</option>
                <option value="Mask">Mask</option>
                <option value="Foundation">Foundation</option>
                <option value="MUR">MUR</option>
                <option value="Other">Other</option>
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addSkin}>+</button>
                </div>
                { skincare.map((skin,i)=>(
                <><div className='col-5'>
                <input type="text" className='form-control mt-3' value={skin.name}/>
                </div>
                <div className='col-5'>
                <input type="text" className='form-control mt-3' placeholder={skin.remark} onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeSkin(skin.name)}>-</button>
                </div></>
                ))}
                </div>
            
            </div>
            <div className='col-6 mt-2'>

            </div>
            <div className='col-6 mt-2'>
            <label htmlFor="">Drug History</label>
            <textarea className='form-control' onChange={(e)=>setDrugHistory(e.target.value)}/>
            </div>
            <div className='col-6 mt-2'>
            <label htmlFor="">Medical History</label>
            <textarea className='form-control' onChange={(e)=>setMedicalHistory(e.target.value)}/>
            </div>
            <div className='col-6 mt-2'>
            <label htmlFor="">History of Allergy</label>
            <textarea className='form-control' onChange={(e)=>setAllergyHistory(e.target.value)}/>
            </div>
            <div className='col-6 mt-2'>
            <label htmlFor="">History of Treatment</label>
            <textarea className='form-control' onChange={(e)=>setTreatmentHistory(e.target.value)}/>
            </div>
            <div className='col-12'>
            <label htmlFor="">Complaint Box</label>
            <textarea className='form-control' onChange={(e)=>setCompliant(e.target.value)}/>
            </div>
            <div className="mt-3 offset-5">
            <button className="btn btn-sm btn-primary" onClick={saveHistory}>Submit</button>
            </div>
          </div>
          </TabPanel>
          <TabPanel>
           <div className='row mt-3'>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Skin Type</label>
                <select name="" id="" className='form-control' onChange={(e)=>setType(e.target.value)}>
                <option value="">Choose Type</option> 
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addType}>+</button>
                </div>
                { skintype.map((type,i)=>(
                <><div className='col-5'>
                <input type="text" className='form-control mt-3' value={type.name}/>
                </div>
                <div className='col-5'>
                <input type="text" className='form-control mt-3' placeholder={type.remark} onChange={(e)=>changeType(type.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeType(type.name)}>-</button>
                </div></>
                ))}
                </div>
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Melsma & Black Spot</label>
                <select name="" id="" className='form-control' onChange={(e)=>setSpot(e.target.value)}>
                <option value="">Choose Type</option> 
                <option value="Epidermal">Epidermal</option>
                <option value="Dermal">Dermal</option>
                <option value="Mixed">Mixed</option>
                <option value="Grading">Grading</option>
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addSpot}>+</button>
                </div>
                { skinspot.map((spot,i)=>(
                <><div className='col-5'>
                <input type="text" className='form-control mt-3' value={spot.name}/>
                </div>
                <div className='col-5'>
                <input type="text" className='form-control mt-3' placeholder={spot.remark} onChange={(e)=>changeSpot(spot.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeSpot(spot.name)}>-</button>
                </div></>
                ))}
                </div>
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Facial Design</label>
                <select name="" id="" className='form-control' onChange={(e)=>setDesign(e.target.value)}>
                <option value="">Choose Design</option> 
                <option value="Upper Face">Upper Face</option>
                <option value="Middle Face">Middle Face</option>
                <option value="Lower Face">Lower Face</option>
                <option value="Double Chin">Double Chin</option>
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addDesign}>+</button>
                </div>
                { skindesign.map((design,i)=>(
                <><div className='col-5'>
                <input type="text" className='form-control mt-3' value={design.name}/>
                </div>
                <div className='col-5'>
                <input type="text" className='form-control mt-3' placeholder={design.remark} onChange={(e)=>changeDesign(design.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeDesign(design.name)}>-</button>
                </div></>
                ))}
                </div>
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Acne</label>
                <select name="" id="" className='form-control' onChange={(e)=>setAnce(e.target.value)}>
                <option value="">Choose Ance</option> 
                <option value="Comedomes">Comedomes</option>
                <option value="Inflammatory Papules">Inflammatory Papules</option>
                <option value="Cystic">Cystic</option>
                <option value="Nodules">Nodules</option>
                <option value="Cystic">Cystic</option>
                <option value="PIH">PIH</option>
                <option value="PAR">PAR</option>
                <option value="Atrophic Scar">Atrophic Scar</option>
                <option value="Hyper Trophic Scar">Hyper Trophic Scar</option>
                <option value="Irritation & Drynese">Irritation & Drynese</option>
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addAnce}>+</button>
                </div>
                { skinance.map((ance,i)=>(
                <><div className='col-5'>
                <input type="text" className='form-control mt-3' value={ance.name}/>
                </div>
                <div className='col-5'>
                <input type="text" className='form-control mt-3' placeholder={ance.remark} onChange={(e)=>changeAnce(ance.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeAnce(ance.name)}>-</button>
                </div></>
                ))}
                </div>
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Meso Fat</label>
                <select name="" id="" className='form-control' onChange={(e)=>setFat(e.target.value)}>
                <option value="Test One">Test One</option>
                <option value="Test Two">Test Two</option>
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addFat}>+</button>
                </div>
                { skinfat.map((fat,i)=>(
                <><div className='col-5'>
                <input type="text" className='form-control mt-3' value={fat.name}/>
                </div>
                <div className='col-5'>
                <input type="text" className='form-control mt-3' placeholder={fat.remark} onChange={(e)=>changeFat(fat.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeFat(fat.name)}>-</button>
                </div></>
                ))}
                </div>
            </div>
            <div className='col-6 mt-2'>
            <label htmlFor="">Other Physical Examination</label>
            <textarea className='form-control' onChange={(e)=>setPhysicalExamination(e.target.value)}/>
            </div>
            <div className="mt-3 offset-5">
            <button className="btn btn-sm btn-primary" onClick={saveExamination}>Submit</button>
            </div>
          </div>
          </TabPanel>
        </Tabs>
          </Div>
         </Div>
    </div>
  )
}

export default MedicineHistory