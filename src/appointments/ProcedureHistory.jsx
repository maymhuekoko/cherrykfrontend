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
  const  [pmedicine,setPmedicine] = useState([]);
  const  [amedicine,setAmedicine] = useState([]);
  const [medicine,setMedicine] = useState('');
  const  [paccessory,setPaccessory] = useState([]);
  const  [aaccessory,setAaccessory] = useState([]);
  const [accessory,setAccessory] = useState('');
  const  [pmachine,setPmachine] = useState([]);
  const  [amachine,setAmachine] = useState([]);
  const [machine,setMachine] = useState('');
  const tselectionID = useLocation().pathname.split('/')[2];
  const appointmentID = useLocation().pathname.split('/')[3];
  const url =  useSelector(state=>state.auth.url);
  const [physicalexamination,setPhysicalExamination] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    // const getItems = async () =>{
    //   try{
    //     const res = await axios.get(url+'api/procedure-medicines');
    //     setPmedicine(res.data.list);
    //   }catch(err){}
    // };
    const getMedicine = async () =>{
      try{
        const res = await axios.get(url+'api/treatment-selection/'+tselectionID);
        setAmedicine(res.data.data[0].relatedTreatment.procedureMedicine);
        setAaccessory(res.data.data[0].relatedTreatment.procedureAccessory);
        setAmachine(res.data.data[0].relatedTreatment.machine);
      }catch(err){}
    };
    // const getItems1 = async () =>{
    //   try{
    //     const res = await axios.get(url+'api/procedure-accessories');
    //     setPaccessory(res.data.list);
    //   }catch(err){}
    // };
    // const getItems2 = async () =>{
    //   try{
    //     const res = await axios.get(url+'api/fixed-assets');
    //     setPmachine(res.data.list.filter((el) => el.type == 'Medical Equipment' || el.type == 'Surgery Equipment' || el.type == 'Medical Machinery'));
    //   }catch(err){}
    // };
    getMedicine();
    // getItems2();
    // getItems1();
    // getItems();
  },[])
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

  const changeMedicine = (name,val,qty) => {
    console.log('change');
    const obj = {
      "item_id": name,
      "stock": 20,
      "actual": qty
    }
    setPmedicine( arr => [...arr, obj]);
    console.log(pmedicine);
    // let cart = pmedicine.find((el)=>el.item_id == name);
    // if(val == 1){
    //  cart.actual = qty;
    // }
    // if(val == 2){
    //   cart.remark = qty;
    // }
  }

  const changeAccessory = (name,val,qty) => {
    console.log('change');
    const obj = {
      "item_id": name,
      "stock": 20,
      "actual": qty
    }
    setPaccessory( arr => [...arr, obj]);
    console.log(pmedicine);
    // if(val == 2){
    //   cart.remark = qty;
    // }
  }


  const changeMachine = (name,val,qty) => {
    console.log('change');
    const obj = {
      "item_id": name,
      "stock": 20,
      "actual": qty
    }
    setPmachine( arr => [...arr, obj]);
    console.log(pmedicine);
    // if(val == 2){
    //   cart.remark = qty;
    // }
  }

  const saveExamination = () => {
    const data1 = {
      "usageStatus":"New", //'Finished','New' Frontend
      "relatedTreatmentSelection": tselectionID,
      "relatedAppointment": appointmentID,
      "procedureMedicine": pmedicine,
      // "procedureAccessory": paccessory,
      // "machine": pmachine
    }
    axios.post(url+'api/logs/usage',data1)
     .then(function (response) {
      Swal.fire({
        title: "Success",
        text: "successfully Usage Create!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        // alert('success')
        navigate('/medicine-history/'+tselectionID+'/'+appointmentID)
        })
     })
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
            <textarea className='form-control'/>
            </div>
            <div className='col-6 mt-2'>
            <label htmlFor="">Reamrk</label>
            <textarea className='form-control' />
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Medicine</label>
                <select name="" id="" className='form-control' onChange={(e)=>setSkin(e.target.value)}>
                <option >Choose Type</option> 
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
                <input class="file-upload-input" type='file' id="image"  accept="image/*" name="photo"/>
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
            <button className="btn btn-sm btn-primary">Submit</button>
            </div>
          </div>
          </TabPanel>
          <TabPanel>
           <div className='row mt-3'>
          
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <h4>Procedure Medicine</h4>
                {/* <select name="" id="" className='form-control' onChange={(e)=>setMedicine(e.target.value)}>
                <option >Choose Medicine</option> 
                {
                  pmedicine.map((med,i)=>(
                    <option value={med._id+'/'+med.name}>{med.name}</option>
                  ))
                }
                </select> */}
                </div>
                {/* <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addMedicine}>+</button>
                </div> */}
                </div>
            
            </div>
            <div className='col-12'>
            <div className='row'>
            <div className='col-2'>
                <label htmlFor="">Name</label>
                </div>
                <div className='col-2'>
                <label htmlFor="">Total Quantity</label>
                </div>
                <div className='col-2'>
                <label htmlFor="">Perusage Quantity</label>
                </div>
                <div className='col-2'>
                <label htmlFor="">Actual Unit</label>
                </div>
                <div className='col-2'>
                <label htmlFor="">Remark</label>
                </div>
                <div className='col-1'>
                {/* <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeMedicine(amed.name)}>-</button> */}
                </div>
              { amedicine.map((amed,i)=>(
                <>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' value={amed.item_id}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' value={amed.quantity}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' value={amed.perUsageQTY}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3'  onChange={(e)=>changeMedicine(amed.item_id,1,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3'/>
                </div>
                <div className='col-1'>
                {/* <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeMedicine(amed.name)}>-</button> */}
                </div>
                
                </>
                ))}
              </div>
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