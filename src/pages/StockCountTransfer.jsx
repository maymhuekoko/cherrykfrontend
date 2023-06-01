import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RxCross2 } from 'react-icons/rx'
import Nav from '../components/Navbar'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { FaArrowLeft } from 'react-icons/fa'

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 30px;
`

const Center = styled.div`
  flex: 1;
  display: inline;
  text-align: center;
`

const Button = styled.button`
  background: rgb(0, 7, 51);
  color: white;
  justify-content: center;
  padding: 5px 30px;
  border: none;
  border-radius: 10px;
  margin-top: 20px;
`

const Title = styled.h5`
  font-weight: bold;
  margin-top: 10px;
`
const Div = styled.div``
const Label = styled.label``
const Input = styled.input`
  width: 100%;
`
const Span = styled.span`
  color: red;
`
const Textarea = styled.textarea``

const Select = styled.select`
  padding: 5px 7px;
  border-radius: 5px;
`
const Option = styled.option``

const Table = styled.table``
const Thead = styled.thead``
const Tbody = styled.tbody``
const Tr = styled.tr`
  text-align: center;
`
const Th = styled.th`
  font-size: 15px;
`
const Td = styled.td`
  font-size: 14px;
`

const Create = () => {
  const [doctors, setDoctors] = useState([])

  const [therapists, setTherapists] = useState([])
  const [procedures, setProcedures] = useState([])
  const [machines, setMachines] = useState([])
  const [accessories, setAccessories] = useState([])
  const [medicineList, setMedicineList] = useState([])
  const [items, setItems] = useState([])
  const [isItem, setIsItem] = useState(false)

  const [accitems, setAccItems] = useState([])
  const [isAccItem, setIsAccItem] = useState(false)
  const [accid, setAccId] = useState('')
  const [macitems, setMacItems] = useState([])
  const [isMacItem, setIsMacItem] = useState(false)
  const [medItems, setMedItems] = useState([])
  const [isMedItem, setIsMedItem] = useState(false)
  const [qty, setQty] = useState('')

  const [upProData, setUpProData] = useState([])
  const [upMedData, setUpMedData] = useState([])
  const [upProAcc, setUpProAcc] = useState([])

  // const [branchID, setBranchID] = useState('')
  const [branchLists, setBranchLists] = useState([])
  const url =  useSelector(state=>state.auth.url);
  const [date, setDate] = useState('')
  const [relatedBranch, setRelatedBranch] = useState('')
  const [reqNo, setReqNo] = useState('')
  const [reqBy, setReqBy] = useState('')
  const [medReQty, setMedReQty] = useState('')
  const [proMedReQty, setProMedReQty] = useState([])
  const [proAccReQty, setProAccReQty] = useState([])
  const [name, setName] = useState('')
  const [ID, setID] = useState('')
  const [proName, setProName] = useState('')
  const [proID, setProID] = useState('')
  const [proAccName, setProAccName] = useState('')
  const [proAccID, setProAccID] = useState('')
  const [medLists, setMedLists] = useState([])
  const [medEvent, setMedEvent] = useState('')
  //Pro Medicine
  const navigate = useNavigate();
  const [tableProData, setTableProData] = useState([])
  const [selectOption, setSelectOption] = useState({
    id: '',
    name: ''
  })

  //Medicine
  const [tableMedData, setTableMedData] = useState([])
  const [selectMedOption, setSelectMedOption] = useState({
    id: '',
    name: ''
  })

  //Medicine
  const [tableProAccData, setTableProAccData] = useState([])
  const [selectProAccOption, setSelectProAccOption] = useState({
    id: '',
    name: ''
  })

  const StockReqID = useLocation().pathname.split('/')[2]

  useEffect(() => {
    const getDoctors = async () => {
      const res = await axios.get(
        url+'api/doctors'
      )
      setDoctors(res.data.data)
    }
    const getTherapists = async () => {
      const res = await axios.get(
        url+'api/therapists'
      )
      setTherapists(res.data.data)
    }
    const getMedicine = async () => {
      const res = await axios.get(
        url+'api/medicine-items'
      )
      setMedicineList(res.data.list)
    }

    const getProcedures = async () => {
      const res = await axios.get(
        url+'api/procedure-items'
      )
      setProcedures(res.data.list)
    }
    const getAccessories = async () => {
      const res = await axios.get(
        url+'api/accessory-items'
      )
      console.log(res.data.list)
      setAccessories(res.data.list)
    }


    const getStockReqList = async () => {
      try {
        const res = await axios.get(
          url+'api/stock-request/' +
            StockReqID
        )
        console.log(res.data.data[0], 'Req')

        // setProMedReQty(res.data.data[0].procedureMedicine.requestedQty)
        // setProAccReQty(res.data.data[0].procedureAccessory.requestedQty)

        //NOTE For Meducine
        if (
          res.data.data[0].medicineLists !== null &&
          res.data.data[0].medicineLists.length > 0
        ) {
          const newData = res.data.data[0].medicineLists.map((data, index) => {
            return {
              id: index,
              name: data.item_id ? data.item_id.medicineItemName : '',
              item_id: data.item_id,
              stockQty: data.stockQty,
              requestedQty: data.requestedQty
            }
          })
          setUpMedData(newData)


          setIsMedItem(true)
        }
        //NOTE For Procedure Medicine
        if (
          res.data.data[0].procedureMedicine !== null &&
          res.data.data[0].procedureMedicine.length > 0
        ) {
          const newData = res.data.data[0].procedureMedicine.map(
            (data, index) => {
              return {
                id: index,
                name: data.item_id ? data.item_id.procedureItemName : '',
                item_id: data.item_id,
                stockQty: data.stockQty,
                requestedQty: data.requestedQty
             
              }
            }
          )
          setUpProData(newData)


          setIsItem(true)
        }
        //NOTE For Procedure Accessory
        if (
          res.data.data[0].procedureAccessory !== null &&
          res.data.data[0].procedureAccessory.length > 0
        ) {
          const newData = res.data.data[0].procedureAccessory.map(
            (data, index) => {
              return {
                id: index,
                name: data.item_id ? data.item_id.accessoryItemName : '',
                item_id: data.item_id,
                stockQty: data.stockQty,
                requestedQty: data.requestedQty
         
              }
            }
          )
          setUpProAcc(newData)
        

          console.log(newData, 'Pro Acc')
          setIsAccItem(true)
        }
      } catch (err) {}
    }

    getStockReqList()
    getMedicine()
    getDoctors()
    getTherapists()
    getProcedures()
    getAccessories()
  }, [])

  //Start procedure medicine add row

  //NOTE Input Changes when input qty and per usage qty
  const handleProInputChange = (event, id, field) => {
    const newData = upProData.map(data => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData,'Pro Data')
    setUpProData(newData)
  }

  //NOTE to delete proecedure medicine
  const removeProcedure = id => {
    setUpProData(upProData.filter(el => el.item_id != id))
  }
  //End procedure medicine add row

  //Start Medicine add row
  //NOTE Input Changes when input qty and per usage qty

  const handleMedInputChange = (event, id, field) => {
    const newData = upMedData.map(data => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData)
    setUpMedData(newData)
  }

  //NOTE to delete proecedure medicine
  const removeMedicine = id => {
    setUpMedData(upMedData.filter(el => el.item_id != id))
  }

  //End Medicine add row

  //Start ProAccessory add row
  //NOTE Input Changes when input qty and per usage qty
  const handleProAccInputChange = (event, id, field) => {
    const newData = upProAcc.map(data => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData)
    setUpProAcc(newData)
  }

  //NOTE to delete proecedure medicine
  const removeProAcc = id => {
    setTableProAccData(tableProAccData.filter(el => el.item_id != id))
  }

  //End Medicine add row

  //End add table row and delete
  const create = () => {
    const data = {
      date: date,
      requestNo: reqNo,
      requestedBy: reqBy,
      medicineLists: upMedData,
      procedureMedicine: upProData,
      procedureAccessory: upProAcc,
      status: true
    }
    // alert(JSON.stringify(data))

    axios
      .post(
        url+'api/stock-transfer',
        data
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'Successfully Created',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
        navigate('/stockcount_transfer')
      })
      .catch(function (err) {
        Swal.fire({
          title: 'Something Wrong!',
          text: 'Try again, Please.',
          icon: 'warning',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
      })
  }
  return (
    <div classNameName='App'>
      <div className='wrapper'>

        {/* <!-- Main Sidebar Container --> */}
        <Nav />

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className='content-wrapper'>
          {/* <!-- Content Header (Page header) --> */}
          <div className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-12'>
                  <h5 className='mt-3'>Stock Transfer Create</h5>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='card-body row border border-dark'>
                <div className='offset-2 col-8 py-5'>
                  <div className='row'>
                    <div className='col-6 form-group '>
                      <Label>
                        Date<Span>*</Span>
                      </Label>
                      <Input
                        type='date'
                        className='form-control'
                        onChange={e => setDate(e.target.value)}
                        style={{ borderRadius: '15px' }}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-6 form-group '>
                      <Label>
                        Transfer No:<Span>*</Span>
                      </Label>
                      <Input
                        type='text'
                        className='form-control'
                        onChange={e => setReqNo(e.target.value)}
                        style={{ borderRadius: '15px' }}
                      />
                    </div>
                    <div className='col-6 form-group'>
                      <Label>
                        Issued By:<Span>*</Span>
                      </Label>
                      <Input
                        type='text'
                        className='form-control'
                        onChange={e => setReqBy(e.target.value)}
                        style={{ borderRadius: '15px' }}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 mt-3'>
                      <h5>Medicine</h5>

                      <Table className='table table-striped'>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Item Name</Th>

                            <Th>Stock Qty</Th>

                            <Th>Requested Qty</Th>
                            <Th>Transfer Qty</Th>
                          </Tr>
                        </Thead>
                        {isMedItem && (
                          <Tbody>
                            {upMedData &&
                              upMedData.map((item, index) => (
                                <Tr>
                                  <Td>{++index}</Td>
                                  <Td>{item.name}</Td>
                                  <Td>
                                    {/* <input
                                  type='number'
                                  // defaultValue={procedure.qty}
                                  defaultValue={item.quantity}
                                  onChange={event =>
                                    handleMedInputChange(
                                      event,
                                      item.id,
                                      'quantity'
                                    )
                                  }
                                  className='size-10'
                                /> */}
                                    {item.stockQty}
                                  </Td>
                                  {/* <Td>{procedure.purchasePrice}</Td> */}
                                  <Td>{item.requestedQty}</Td>

                                  <Td>
                                    <input
                                      type='number'
                                      defaultValue={item.transferQty}
                                      style={{ borderRadius: '10px' }}
                                      className='text-center'
                                      onChange={event =>
                                        handleMedInputChange(
                                          event,
                                          item.id,
                                          'transferQty'
                                        )
                                      }
                                      className='text-center'
                                    />
                                  </Td>
                                  <Td>
                                    <RxCross2
                                      onClick={() =>
                                        removeMedicine(item.item_id)
                                      }
                                    />
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        )}
                      </Table>
                    </div>

                    {/* NOTE Procedure Medicine */}

                    <div className='col-12 mt-4'>
                      <h5>Procedure Medicine</h5>

                      <Table className='table table-striped'>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Item Name</Th>

                            <Th>Stock Qty</Th>

                            <Th>Requested Qty</Th>
                            <Th>Transfer Qty</Th>
                          </Tr>
                        </Thead>
                        {isItem && (
                          <Tbody>
                            {upProData &&
                              upProData.map((item, index) => (
                                <Tr>
                                  <Td>{++index}</Td>
                                  <Td>{item.name}</Td>
                                  <Td>
                                    {/* <input
                                  type='number'
                                  // defaultValue={procedure.qty}
                                  defaultValue={item.quantity}
                                  onChange={event =>
                                    handleMedInputChange(
                                      event,
                                      item.id,
                                      'quantity'
                                    )
                                  }
                                  className='size-10'
                                /> */}
                                    {item.stockQty}
                                  </Td>
                                  {/* <Td>{procedure.purchasePrice}</Td> */}
                                  <Td>{item.requestedQty}</Td>

                                  <Td>
                                    <input
                                      type='number'
                                      defaultValue={item.transferQty}
                                      style={{ borderRadius: '10px' }}
                                      className='text-center'
                                      onChange={event =>
                                        handleProInputChange(
                                          event,
                                          item.id,
                                          'transferQty'
                                        )
                                      }
                                      className='text-center'
                                    />
                                  </Td>
                                  <Td>
                                    <RxCross2
                                      onClick={() =>
                                        removeProcedure(item.item_id)
                                      }
                                    />
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        )}
                      </Table>
                    </div>
                    {/* NOTE End Procedure Medicine */}

                    {/* <div className='row'>
                      <div className='col-6 form-group mt-3'>
                        <Label>Procedure Accessory</Label>
                        <Select
                          className='form-control'
                          onChange={handleProAccGet}
                          style={{ borderRadius: '15px' }}
                        >
                          <Option>Select Procedure Accessory</Option>
                          {accessories.map((accessory, index) => (
                            <Option
                              value={accessory._id}
                              data-id={accessory._id}
                              data-name={accessory.accessoryItemName}
                            >
                              {accessory.accessoryItemName}
                            </Option>
                          ))}
                        </Select>
                      </div>
                      <div className='col-3 mt-4'>
                        <Button
                          style={{
                            backgroundColor: 'rgb(0, 7, 51)',
                            marginTop: '1.5em'
                          }}
                          onClick={e =>
                            handleProAccAddRow(
                              selectProAccOption.id,
                              selectProAccOption.name
                            )
                          }
                        >
                          Add
                        </Button>
                      </div>
                    </div> */}
                    <div className='col-12 mt-3'>
                      <h5>Procedure Accessory</h5>
                      <Table className='table table-striped'>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Item Name</Th>

                            <Th>Stock Qty</Th>

                            <Th>Requested Qty</Th>
                            <Th>Transfer Qty</Th>
                          </Tr>
                        </Thead>
                        {isAccItem && (
                          <Tbody>
                            {upProAcc &&
                              upProAcc.map((item, index) => (
                                <Tr>
                                  <Td>{++index}</Td>
                                  <Td>{item.name}</Td>
                                  <Td>
                                    {/* <input
                                  type='number'
                                  // defaultValue={procedure.qty}
                                  defaultValue={item.quantity}
                                  onChange={event =>
                                    handleMedInputChange(
                                      event,
                                      item.id,
                                      'quantity'
                                    )
                                  }
                                  className='size-10'
                                /> */}
                                    {item.stockQty}
                                  </Td>
                                  {/* <Td>{procedure.purchasePrice}</Td> */}
                                  <Td>{item.requestedQty}</Td>

                                  <Td>
                                    <input
                                      type='number'
                                      defaultValue={item.transferQty}
                                      style={{ borderRadius: '10px' }}
                                      className='text-center'
                                      onChange={event =>
                                        handleProAccInputChange(event,item.id,'transferQty')
                                      }
                                      className='text-center'
                                    />
                                  </Td>
                                  <Td>
                                    <RxCross2
                                      onClick={() =>
                                        removeProAcc(item.item_id)
                                      }
                                    />
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        )}
                      </Table>
                    </div>
                    {/* NOTE End Procedure Accessory */}
                  </div>
                </div>
                <Top>
                  <div className='row mb-3' style={{ marginLeft: '330px' }}>
                    <div className='col-md-6'>
                      <Button
                        style={{ backgroundColor: 'rgb(0, 7, 51)', color: 'white' }}
                        onClick={create}
                      >
                        Submit
                      </Button>
                    </div>
                    <div className='ml-3 col-md-4 mt-4'>
                      <Link
                        to='stock-req'
                        className='btn btn-m px-3 py-1'
                        style={{
                          backgroundColor: 'rgb(0, 7, 51)',
                          color: 'white'
                        }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </Top>
              </div>
            </div>
          </section>
        </div>
      </div>
      

      {/* <!-- Control Sidebar --> */}
      <aside className='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>

      {/* <!-- ./wrapper --> */}
    </div>
  )
}

export default Create
