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

const ProcudureHistory = () => {
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
  const imgchg = () =>{
    // alert('hi');
      let reader = new FileReader();
      reader.onload = (e) => {
       document.getElementsById('preview-image-before-upload').src = e.target.result;
      }
      reader.readAsDataURL(this.files[0]);
  }
  return (
    <div>
        <Nav/>
        <Top>
          <Left><Title>Procedure History</Title></Left>
          {/* <Right><Button><AiOutlinePlus style={{marginRight:'7px'}}/>Patient Register</Button></Right> */}
        </Top>
         <Div className='card'>
          <Div className='card-body'>
          <Tabs>
          <TabList>
            <Tab>Record</Tab>
            <Tab>Usage</Tab>
          </TabList>

          <TabPanel>
          <div className='row mt-3'>
          <div className='col-6 mt-2'>
            <label htmlFor="">Diaganosis</label>
            <textarea className='form-control' onChange={(e)=>setDrugHistory(e.target.value)}/>
            </div>
            <div className='col-6 mt-2'>
            <label htmlFor="">Reamrk</label>
            <textarea className='form-control' onChange={(e)=>setMedicalHistory(e.target.value)}/>
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Medicine</label>
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
                </div>
            
            </div>
            <div className='col-12'>
              <div className='row'>
              { skincare.map((skin,i)=>(
                <>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder={skin.name} onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Qty/Dose" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Dose/Day" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Duration" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-1'>
                <input type="text" className='form-control mt-3' placeholder="TotalQty" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Remark" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-1'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeSkin(skin.name)}>-</button>
                </div>
                
                </>
                ))}
              </div>
            </div>
            <h5 className='mt-3'>Procedure Photo</h5>
            <div class="image-upload-wrap col-6 py-3">
                <input class="file-upload-input" type='file' id="image"  accept="image/*" name="photo" onChange={imgchg}/>
                <div class="drag-text">
                  <h6 class="mt-3"><img src=""  style={{maxHeight:'100px'}} id="preview-image-before-upload" />Before</h6>
                </div>
            </div>
            <div class="image-upload-wrap1 col-6 py-3">
                <input class="file-upload-input1" type='file' id="image1"  accept="image/*" name="photo"/>
                <div class="drag-text">
                  <h6 class="mt-3"><img src=""  style={{maxHeight:'100px'}} id="preview-image-before-upload1" />After</h6>
                </div>
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
                <label htmlFor="">Medicine</label>
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
                </div>
            
            </div>
            <div className='col-12'>
              <div className='row'>
              { skincare.map((skin,i)=>(
                <><div className='col-2'>
                <input type="text" className='form-control mt-3' value={skin.name}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Planned Unit" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Actual Unit" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-3'>
                <input type="text" className='form-control mt-3' placeholder="Remark" onChange={(e)=>changeSkin(skin.name,e.target.value)}/>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeSkin(skin.name)}>-</button>
                </div></>
                ))}
              </div>
            
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Procedure Medicine</label>
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
                </div>
            
            </div>
            <div className='col-12'>
            
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Procedure Accessories</label>
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
                </div>
            
            </div>
            <div className='col-12'>
            
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Machinery</label>
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
                </div>
            
            </div>
            <div className='col-12'>
            
            </div>
            <div className="mt-5 offset-5">
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

export default ProcudureHistory