import React,{useState,useEffect,useRef} from 'react'
import Nav from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';
import ReactToPrint from "react-to-print";

const Voucher = () => {
    const [treatment,setTreatment] = useState([]);
    const [arr,setArr] = useState([]);
    // const id = useLocation().pathname.split('/')[2];
    const url =  useSelector(state=>state.auth.url);
    const navigate = useNavigate();
    const location = useLocation();
    console.log('rem');
    console.log(location.state.left);
    let componentRef = useRef();
    useEffect(()=>{
        const getTreatment = async () => {
            const res =await axios.get(url+'api/treatment-voucher/'+location.pathname.split('/')[2]);
            setTreatment(res.data.data);
            setArr(res.data.data[0]);
            console.log(res.data.data);
            // console.log(location.left);
          }
          getTreatment();
    },[])
    const cancel = () =>{
        navigate(-1);
    }
  return (
    <div>
        <Nav />
        <div className='row justify-context-center' >

            <div class="offset-2 col-8">
                <div class="card card-body  mt-3" ref={(el) => (componentRef = el)}>
                    <h4 className='text-center font-weight-bold'>Treatment Voucher</h4>
                    <div className='row justify-context-center'>
                        <div className='offset-4 col-4 ml-3' >
                        <img  src={require('../denovo.png')} width={250} height={200} 
                         alt="logo" />
                        </div>
                    </div>
                    <div className='row justify-context-center'>
                        <div className='offset-4 col-4'>
                        <p className='text-center'>Blk A, No. 001, Corner of Hanthawadi Road and Hnin Si Streey, Yuzana Highway Complex, Yangon, Myanmar</p>
                        <p className="text-center">Ph no : +959968119995</p>
                        </div>
                    </div>
                    <div className='row mt-2'>
                    <div className='col-8'>
                        <h6>Voucher Date:{arr.createdAt.split('T')[0]}</h6>
                        <h6>Voucher Code:{arr.code}</h6>
                    </div>
                    <div className='col-4'>
                        <h6>Patient Name:{arr.relatedPatient.name}</h6>
                        <h6>Phone No:{arr.relatedPatient.phone}</h6>
                        <h6>Appointment:{arr.relatedAppointment.originalDate.split('T')[0]}</h6>
                    </div>
                    </div>
                    <table className='table table-striped'>
                        <thead class="text-center">
                            <tr>
                                <th>No.</th>
                                <th>Treatment Name</th>
                                <th>Treatment Unit Name</th>
                                <th>Total Charges</th>
                                <th>Pay Amount</th>
                                {/* <th>LeftOver Amount</th> */}
                            </tr>
                        </thead>
                        <tbody class="text-center">
                                {treatment.map((treat,i)=>(<tr>
                                    <td>{++i}</td>
                                    <td>{treat.relatedTreatment.treatmentCode}</td>
                                    <td>{treat.relatedTreatment.treatmentName}</td>
                                    <td>{treat.relatedTreatment.sellingPrice}</td>
                                    <td>{treat.amount}</td>
                                    {/* <td>{location.left}</td> */}
                                </tr>))}
                        </tbody>
                    </table>
                    <div className='mt-5'>
                        <div className='row'>
                            <div className='col-10'>
                                <h6>Paid By</h6>
                            </div>
                            <div className='col-2'>
                                <h6>Received By</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row justify-context-center d-flex mt-3'>
            <div className='offset-5 col-4'>
           
            <ReactToPrint
          trigger={() =>  <button className='btn btn-m btn-primary'>Print</button>}
          content={() => componentRef}
           />
            <button className='btn btn-m btn-secondary ml-3' onClick={cancel}>Cancel</button>
            </div>
            
        </div>
    </div>
  )
}

export default Voucher