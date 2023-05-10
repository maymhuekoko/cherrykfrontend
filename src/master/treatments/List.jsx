import React,{useEffect,useState} from 'react'
import Nav from "../../components/Navbar"
import axios from 'axios';
import { useSelector } from 'react-redux'
import {MdKeyboardArrowDown,MdKeyboardArrowUp} from 'react-icons/md'

const List = () => {
    const [items,setItems] = useState([]);
    const [treatments,setTreatments] = useState([]);
    const [isShow,setIsShow] = useState(false);
    const [show,setShow] = useState(false);
    const [isOpen,setIsOpen] = useState(false);
    const url =  useSelector(state=>state.auth.url);

    useEffect(()=>{
        const getItems = async () =>{
            try{
              const res = await axios.get(url+'api/treatment-lists');
              setItems(res.data.list);
            }catch(err){}
          };
          const getTreatments = async () =>{
            try{
              const res = await axios.get(url+'api/treatments');
              setTreatments(res.data.list);
            }catch(err){}
          };
          getTreatments();
          getItems();
    },[])
  return (
    <div>
        <Nav />
        <h5 className='mt-2 ml-2'>Treatment Unit List</h5>
        <div className='row'>
        {treatments.map((treatment,index) => (
        <div className='col-4'>
        <div className='card mt-3'>
            <div className='card-body'>
              <h6>{treatment.treatmentCode}</h6>
              <h6>{treatment.sellingPrice} MMK</h6>
                <div className='p-3'>
                    { treatment.procedureMedicine.length > 0 &&
                        <div className='row'>
                        <div className='col-10'>
                        <h6>Procedure Medicine Detail</h6>
                        </div>
                        <div className="col-2">
                           {isShow ? <MdKeyboardArrowUp onClick={()=>setIsShow(!isShow)}/> :
                            <MdKeyboardArrowDown onClick={()=>setIsShow(!isShow)}/>
                            }
                        </div>
                        { treatment.procedureMedicine.map((pitem,index)=>(
                            isShow &&
                            <>
                            <div className='offset-1 col-7'>
                            <h6>{pitem.item_id.procedureItemName}</h6>
                            </div>
                            <div className='col-3'>
                            <h6>{pitem.perUsageQTY} (QTY)</h6>
                            </div>
                            </>
                        ))}
                    </div>
                    }
                    { treatment.procedureAccessory.length > 0 &&
                        <div className='row mt-2'>
                        <div className='col-10'>
                        <h6>Procedure Accessory Detail</h6>
                        </div>
                        <div className="col-2">
                            {isOpen ? <MdKeyboardArrowUp onClick={()=>setIsOpen(!isOpen)}/> :
                                <MdKeyboardArrowDown onClick={()=>setIsOpen(!isOpen)}/>
                                }
                        </div>
                        { treatment.procedureAccessory.map((pitem,index)=>(
                            isOpen && 
                            <>
                            <div className='offset-1 col-7'>
                            <h6>{pitem.item_id.accessoryItemName}</h6>
                            </div>
                            <div className='col-3'>
                            <h6>{pitem.perUsageQTY} (QTY)</h6>
                            </div>
                            </>
                        ))}
                    </div>
                    }
                    { treatment.machine.length > 0 &&
                        <div className='row mt-2'>
                        <div className='col-10'>
                        <h6>Machine Detail</h6>
                        </div>
                        <div className="col-2">
                            {show ? <MdKeyboardArrowUp onClick={()=>setShow(!show)}/> :
                                <MdKeyboardArrowDown onClick={()=>setShow(!show)}/>
                                }
                        </div>
                        { treatment.machine.map((pitem,index)=>(
                            show && 
                            <>
                            <div className='offset-1 col-7'>
                            <h6>{pitem.item_id.name}</h6>
                            </div>
                            <div className='col-3'>
                            <h6>{pitem.perUsageQTY} (QTY)</h6>
                            </div>
                            </>
                        ))}
                    </div>
                    }
                </div>
            </div>
            </div>
        </div>))}
        </div>
    </div>
  )
}

export default List