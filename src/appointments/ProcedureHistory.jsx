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
    const getItems = async () =>{
      try{
        const res = await axios.get(url+'api/procedure-medicines');
        setPmedicine(res.data.list);
      }catch(err){}
    };
    const getItems1 = async () =>{
      try{
        const res = await axios.get(url+'api/procedure-accessories');
        setPaccessory(res.data.list);
      }catch(err){}
    };
    const getItems2 = async () =>{
      try{
        const res = await axios.get(url+'api/fixed-assets');
        setPmachine(res.data.list.filter((el) => el.type == 'Medical Equipment' || el.type == 'Surgery Equipment' || el.type == 'Medical Machinery'));
      }catch(err){}
    };
    getItems2();
    getItems1();
    getItems();
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
  const addMedicine = () => {

    const obj = {
      "item_id": medicine.split('/')[0],
      "stock": 1,
      "actual": 0,
      "name" : medicine.split('/')[1]
    }
    setAmedicine( arr => [...arr, obj]);
  }
  const changeMedicine = (name,val,qty) => {
    let cart = amedicine.find((el)=>el.name == name);
    if(val == 1){
     cart.actual = qty;
    }
    if(val == 2){
      cart.remark = qty;
    }
  }
  const removeMedicine = (name) => {
    setAmedicine(amedicine.filter((el,i)=>el.name != name));
  }
  const addAccessory = () => {

    const obj = {
      "item_id": accessory.split('/')[0],
      "stock": 1,
      "actual": 0,
      "name" : accessory.split('/')[1]
    }
    setAaccessory( arr => [...arr, obj]);
  }
  const changeAccessory = (name,val,qty) => {
    let cart = aaccessory.find((el)=>el.name == name);
    if(val == 1){
     cart.actual = qty;
    }
    if(val == 2){
      cart.remark = qty;
    }
  }
  const removeAccessory = (name) => {
    setAaccessory(aaccessory.filter((el,i)=>el.name != name));
  }
  const addMachine = () => {

    const obj = {
      "item_id": machine.split('/')[0],
      "stock": 1,
      "actual": 0,
      "name" : machine.split('/')[1]
    }
    setAmachine( arr => [...arr, obj]);
  }
  const changeMachine = (name,val,qty) => {
    let cart = amachine.find((el)=>el.name == name);
    if(val == 1){
     cart.actual = qty;
    }
    if(val == 2){
      cart.remark = qty;
    }
  }
  const removeMachine = (name) => {
    setAmachine(amachine.filter((el,i)=>el.name != name));
  }
  const saveExamination = () => {
    const data1 = {
      "usageStatus":"New", //'Finished','New' Frontend
      "relatedTreatmentSelection": tselectionID,
      "relatedAppointment": appointmentID,
      "procedureMedicine": amachine,
      "procedureAccessory": aaccessory,
      "machine": amachine
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
                <label htmlFor="">Procedure Medicine</label>
                <select name="" id="" className='form-control' onChange={(e)=>setMedicine(e.target.value)}>
                <option value="">Choose Medicine</option> 
                {
                  pmedicine.map((med,i)=>(
                    <option value={med._id+'/'+med.name}>{med.name}</option>
                  ))
                }
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addMedicine}>+</button>
                </div>
                </div>
            
            </div>
            <div className='col-12'>
            <div className='row'>
              { amedicine.map((amed,i)=>(
                <>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder={amed.name}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Total Quantity"/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Perusage Quantity"/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Actual Unit" onChange={(e)=>changeMedicine(amed.name,1,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Remark" onChange={(e)=>changeMedicine(amed.name,2,e.target.value)}/>
                </div>
                <div className='col-1'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeMedicine(amed.name)}>-</button>
                </div>
                
                </>
                ))}
              </div>
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Procedure Accessories</label>
                <select name="" id="" className='form-control' onChange={(e)=>setAccessory(e.target.value)}>
                <option value="">Choose Accessories</option> 
                {
                  paccessory.map((acc,i)=>(
                    <option value={acc._id+'/'+acc.name}>{acc.name}</option>
                  ))
                }
                
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addAccessory}>+</button>
                </div>
                </div>
            
            </div>
            <div className='col-12'>
            <div className='row'>
              { aaccessory.map((acc,i)=>(
                <>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder={acc.name}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Total Quantity"/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Perusage Quantity"/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Actual Unit" onChange={(e)=>changeAccessory(acc.name,1,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Remark" onChange={(e)=>changeAccessory(acc.name,2,e.target.value)}/>
                </div>
                <div className='col-1'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeAccessory(acc.name)}>-</button>
                </div>
                
                </>
                ))}
              </div>
            </div>
            <div className='col-6 mt-2'>
                <div className='row'>
                <div className='col-10'>
                <label htmlFor="">Machinery</label>
                <select name="" id="" className='form-control' onChange={(e)=>setMachine(e.target.value)}>
                <option value="">Choose Machiney</option> 
                {
                  pmachine.map((mac,i)=>(
                    <option value={mac._id+'/'+mac.name}>{mac.name}</option>
                  ))
                }
                
                </select>
                </div>
                <div className='col-2'>
                <button className='btn btn-sm btn-primary' style={{marginTop:'30px'}} onClick={addMachine}>+</button>
                </div>
                </div>
            
            </div>
            <div className='col-12'>
            <div className='row'>
              { amachine.map((mac,i)=>(
                <>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder={mac.name}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Total Quantity"/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Perusage Quantity"/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Actual Unit" onChange={(e)=>changeMachine(mac.name,1,e.target.value)}/>
                </div>
                <div className='col-2'>
                <input type="text" className='form-control mt-3' placeholder="Remark" onChange={(e)=>changeMachine(mac.name,2,e.target.value)}/>
                </div>
                <div className='col-1'>
                <button className='btn btn-sm btn-danger' style={{marginTop:'20px'}} onClick={()=>removeMachine(mac.name)}>-</button>
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