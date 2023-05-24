import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RxCross2 } from 'react-icons/rx'
import Nav from "../../components/Navbar"
import Swal from 'sweetalert2'

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
  const [tName, setTName] = useState([])
  const [therapists, setTherapists] = useState([])
  const [procedures, setProcedures] = useState([])
  const [machines, setMachines] = useState([])
  const [accessories, setAccessories] = useState([])
  const [medicineList, setMedicineList] = useState([])
  const [items, setItems] = useState([])
  const [isItem, setIsItem] = useState(false)
  const [id, setId] = useState('')
  const [accitems, setAccItems] = useState([])
  const [isAccItem, setIsAccItem] = useState(false)
  const [accid, setAccId] = useState('')
  const [macitems, setMacItems] = useState([])
  const [isMacItem, setIsMacItem] = useState(false)
  const [medItems, setMedItems] = useState([])
  const [isMedItem, setIsMedItem] = useState(false)
  const [qty, setQty] = useState('')
  const url =  useSelector(state=>state.auth.url);
  const [macid, setMacId] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [percent, setPercent] = useState('')
  const [sellPrice, setSellPrice] = useState('')
  const [description, setDescription] = useState('')
  const [doctorname, setDoctorName] = useState('')
  const [therapistname, setTherapistName] = useState('')
  const [treatmenttime, setTreatmentTime] = useState('')
  const [treatmentCode, setTreatmentCode] = useState('')
  const [name, setName] = useState('')
  const tname = useLocation().pathname.split('/')[4];

  //Pro Medicine
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

  // const name = useLocation().pathname.split('/')[3]

  const Id = useLocation().pathname.split('/')[2]

  useEffect(() => {
    const getDoctors = async () => {
      const res = await axios.get(
        url+'api/doctors'
      )
      setDoctors(res.data.data)
    }
    const getTherapists = async () => {
      const res = await axios.get(
        'http://backendcherryk.kwintechnologykw1.com:4000/api/therapists'
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
    const getTreatment = async () => {
      const res = await axios.get(
        url+'api/treatment-list/' +
          Id
      )
      console.log(res.data.data[0])

      // setTName(res.data.data[0].name)
      console.log(res.data.data[0].name)
    }

    const getMachines = async () => {
      const res = await axios.get(
        url+'api/fixed-assets'
      )
      setMachines(
        res.data.list.filter(
          el =>
            el.type == 'Medical Equipment' ||
            el.type == 'Surgery Equipment' ||
            el.type == 'Medical Machinery'
        )
      )
    }

    getTreatment()

    getMedicine()
    getDoctors()
    getTherapists()
    getProcedures()
    getAccessories()
    getMachines()
  }, [])

  //Start procedure medicine add row

  //NOTE Input Changes when input qty and per usage qty
  const handleProInputChange = (event, id, field) => {
    const newData = tableProData.map(data => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData)
    setTableProData(newData)
  }

  //NOTE to add row of Procedure Medicine
  const handleProAddRow = (id, name) => {
    // console.log(name, 'Pro name')
    setTableProData([
      ...tableProData,
      {
        id: tableProData.length + 1,
        name: name,
        item_id: id,
        quantity: '',
        perUsageQTY: ''
      }
    ])

    // console.log(proMedName, 'pro med')
    setIsItem(true)
  }

  //NOTE to get Id and Name of procedure medicine
  const handleProGet = event => {
    const { options, selectedIndex } = event.target
    const selectedOption = options[selectedIndex]
    const id = selectedOption.getAttribute('data-id')

    const proName = selectedOption.getAttribute('data-name')
    setSelectOption({
      id: id,
      name: proName
    })

    // const value = event.target.value
    // // Use the id, name, and value as needed
    // console.log('ID:', id)
    // console.log('Name:', proName)
    // console.log('Value:', value)
  }

  //NOTE to delete proecedure medicine
  const removeProcedure = id => {
    setTableProData(tableProData.filter(el => el.item_id != id))
  }
  //End procedure medicine add row

  //Start Medicine add row
  //NOTE Input Changes when input qty and per usage qty
  const handleMedInputChange = (event, id, field) => {
    const newData = tableMedData.map(data => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData)
    setTableMedData(newData)
  }

  //NOTE to add row of Procedure Medicine
  const handleMedAddRow = (id, name) => {
    // console.log(name, 'Med name')
    setTableMedData([
      ...tableMedData,
      {
        id: tableMedData.length + 1,
        name: name,
        item_id: id,
        quantity: '',
        perUsageQTY: ''
      }
    ])

    // console.log(proMedName, 'pro med')
    setIsMedItem(true)
  }

  //NOTE to get Id and Name of procedure medicine
  const handleMedGet = event => {
    const { options, selectedIndex } = event.target
    const selectedOption = options[selectedIndex]
    const id = selectedOption.getAttribute('data-id')

    const medName = selectedOption.getAttribute('data-name')
    setSelectMedOption({
      id: id,
      name: medName
    })

    // Use the id, name, and value as needed
    // console.log('ID:', id)
    // console.log('Name:', medName)
    // console.log('Value:', value)
  }

  //NOTE to delete proecedure medicine
  const removeMedicine = id => {
    setTableMedData(tableMedData.filter(el => el.item_id != id))
  }

  //End Medicine add row

  //Start ProAccessory add row
  //NOTE Input Changes when input qty and per usage qty
  const handleProAccInputChange = (event, id, field) => {
    const newData = tableProAccData.map(data => {
      if (data.id === id) {
        return { ...data, [field]: event.target.value }
      }
      return data
    })
    console.log(newData)
    setTableProAccData(newData)
  }

  //NOTE to add row of Procedure Medicine
  const handleProAccAddRow = (id, name) => {
    console.log(name, 'proAcc name')
    setTableProAccData([
      ...tableProAccData,
      {
        id: tableProAccData.length + 1,
        name: name,
        item_id: id,
        quantity: '',
        perUsageQTY: ''
      }
    ])

    // console.log(proMedName, 'pro med')
    setIsAccItem(true)
  }

  //NOTE to get Id and Name of procedure medicine
  const handleProAccGet = event => {
    const { options, selectedIndex } = event.target
    const selectedOption = options[selectedIndex]
    const id = selectedOption.getAttribute('data-id')

    const proAccName = selectedOption.getAttribute('data-name')
    setSelectProAccOption({
      id: id,
      name: proAccName
    })

    const value = event.target.value
    // Use the id, name, and value as needed
    console.log('ID:', id)
    console.log('Name:', proAccName)
    console.log('Value:', value)
  }

  //NOTE to delete proecedure medicine
  const removeProAcc = id => {
    setTableProAccData(tableProAccData.filter(el => el.item_id != id))
  }

  //End Medicine add row

  const addMacProcedure = () => {
    const obj = {
      item_id: macid,
      quantity: 1,
      perUsageQTY: 1
    }
    setMacItems(arr => [...arr, obj])
    setIsMacItem(true)
  }
  const removeMac = id => {
    setMacItems(macitems.filter(el => el.item_id != id))
  }

  //End add table row and delete
  const create = () => {
    const data = {
      treatmentCode: treatmentCode,
      name: name,
      treatmentName: Id,
      treatmentTimes: treatmenttime,
      relatedDoctor: doctorname,
      medicineLists: tableMedData,
      procedureMedicine: tableProData,
      procedureAccessory: tableProAccData,
      machine: macitems,
      estimateTotalPrice: totalPrice,
      discount: percent,
      sellingPrice: sellPrice,
      description: description,
      status: true
    }
    alert(JSON.stringify(data))

    axios
      .post(
        url+'api/treatment',
        data
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'You Created Income Data!',
          icon: 'success',
          // showCancelButton: true,

          cancelButtonText: 'Close'
        })
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
        {/* <!-- /.navbar --> */}

        {/* <!-- Main Sidebar Container --> */}
        <Nav />

        {/* <!-- Content Wrapper. Contains page content --> */}
        <div className='content-wrapper'>
          {/* <!-- Content Header (Page header) --> */}
          <div className='content-header'>
            <div className='container-fluid'>
              <div className='row mb-2'>
                <div className='col-sm-12'>
                  <h4>Treatment Unit Create</h4>
                  {/* <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to={'/checkUnit/' + Id}>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li className='breadcrumb-item active'>Treatment Create</li>
                  </ol> */}

                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='card-body row border border-dark'>
                <h5>{tname}'s Unit Create</h5>
                <div className='offset-2 col-8 py-5'>
                  <div className='row'>
                    <div className='col-4 form-group '>
                      <Label>
                        Treatment Unit Name<Span>*</Span>
                      </Label>
                      <Input
                        type='text'
                        className='form-control'
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className='col-4 form-group'>
                      <Label>
                        Treatment Unit Code<Span>*</Span>
                      </Label>
                      <Input
                        type='text'
                        className='form-control'
                        onChange={e => setTreatmentCode(e.target.value)}
                      />
                    </div>
                    <div className='col-4 form-group'>
                      <Label>
                        Treatment Times<Span>*</Span>
                      </Label>
                      <Input
                        type='text'
                        className='form-control'
                        onChange={e => setTreatmentTime(e.target.value)}
                      />
                    </div>
                    <div className='col-4 form-group mt-3'>
                      <Label>
                        Doctor Name<Span>*</Span>
                      </Label>
                      <Select
                        className='form-control'
                        onChange={e => setDoctorName(e.target.value)}
                      >
                        <Option>Select Doctor</Option>
                        {doctors.map((doctor, i) => (
                          <Option value={doctor._id}>{doctor.name}</Option>
                        ))}
                      </Select>
                    </div>
                    <div className='col-4 form-group mt-3'>
                      <Label>
                        Therapist Name<Span>*</Span>
                      </Label>
                      <Select
                        className='form-control'
                        onChange={e => setTherapistName(e.target.value)}
                      >
                        <Option>Select Therapist</Option>
                        {therapists.map((therapist, i) => (
                          <Option value={therapist._id}>
                            {therapist.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className='col-6 form-group mt-3'>
                      <Label>Medicine</Label>
                      <Select className='form-control' onChange={handleMedGet}>
                        <Option>Select Medicine</Option>
                        {medicineList.map((procedure, index) => (
                          <Option
                            value={procedure._id}
                            data-id={procedure._id}
                            data-name={procedure.medicineItemName}
                          >
                            {procedure.medicineItemName}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className='col-3 mt-4'>
                      <Button
                        onClick={e =>
                          handleMedAddRow(
                            selectMedOption.id,
                            selectMedOption.name
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                    <div className='col-12 mt-3'>
                      <Table className='table table-striped'>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Item Name</Th>
                            <Th>Qty</Th>

                            <Th>Per Usage Qty</Th>

                            <Th></Th>
                          </Tr>
                        </Thead>
                        {isMedItem && (
                          <Tbody>
                            {tableMedData.map((item, index) => (
                              <Tr>
                                <Td>{++index}</Td>
                                <Td>{item.name}</Td>
                                <Td>
                                  <input
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
                                  />
                                </Td>
                                {/* <Td>{procedure.purchasePrice}</Td> */}
                                <Td>
                                  <input
                                    type='number'
                                    defaultValue={item.perUsageQTY}
                                    onChange={event =>
                                      handleMedInputChange(
                                        event,
                                        item.id,
                                        'perUsageQTY'
                                      )
                                    }
                                    className='size-10'
                                  />
                                </Td>
                                <Td>
                                  <RxCross2
                                    onClick={() => removeMedicine(item.item_id)}
                                  />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        )}
                      </Table>
                    </div>

                    {/* NOTE Procedure Medicine */}
                    <div className='col-6 form-group mt-3'>
                      <Label>Procedure Medicine</Label>
                      <Select className='form-control' onChange={handleProGet}>
                        <Option>Select Procedure Medicine</Option>
                        {procedures.map((procedure, index) => (
                          <Option
                            value={procedure._id}
                            data-id={procedure._id}
                            data-name={procedure.procedureItemName}
                          >
                            {procedure.procedureItemName}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className='col-3 mt-4'>
                      <Button
                        onClick={e =>
                          handleProAddRow(selectOption.id, selectOption.name)
                        }
                      >
                        Add
                      </Button>
                    </div>
                    <div className='col-12 mt-4'>
                      <Table className='table table-striped'>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Item Name</Th>
                            <Th>Qty</Th>
                            {/* <Th>Purchase Price</Th> */}
                            <Th>Per Usage Qty</Th>
                            {/* <Th>Amount</Th> */}
                            <Th></Th>
                          </Tr>
                        </Thead>
                        {isItem && (
                          <Tbody>
                            {tableProData.map((item, index) => (
                              <Tr>
                                <Td>{++index}</Td>
                                <Td>{item.name}</Td>
                                <Td>
                                  <input
                                    type='number'
                                    // defaultValue={procedure.qty}
                                    defaultValue={item.quantity}
                                    onChange={event =>
                                      handleProInputChange(
                                        event,
                                        item.id,
                                        'quantity'
                                      )
                                    }
                                    className='size-10'
                                  />
                                </Td>
                                {/* <Td>{procedure.purchasePrice}</Td> */}
                                <Td>
                                  <input
                                    type='number'
                                    defaultValue={item.perUsageQTY}
                                    onChange={event =>
                                      handleProInputChange(
                                        event,
                                        item.id,
                                        'perUsageQTY'
                                      )
                                    }
                                    className='size-10'
                                  />
                                </Td>
                                {/* <Td>{procedure.purchasePrice}</Td> */}
                                <Td>
                                  <RxCross2
                                    onClick={e => removeProcedure(item.item_id)}
                                  />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        )}
                      </Table>
                    </div>
                    {/* NOTE End Procedure Medicine */}

                    <div className='col-6 form-group mt-3'>
                      <Label>Procedure Accessory</Label>
                      <Select
                        className='form-control'
                        onChange={handleProAccGet}
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
                    <div className='col-12 mt-3'>
                      <Table className='table table-striped'>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Item Name</Th>
                            <Th>Qty</Th>
                            {/* <Th>Purchase Price</Th> */}
                            <Th>Per Usage Qty</Th>
                            {/* <Th>Amount</Th> */}
                          </Tr>
                        </Thead>
                        {isAccItem && (
                          <Tbody>
                            {tableProAccData.map((item, index) => (
                              <Tr>
                                <Td>{++index}</Td>
                                <Td>{item.name}</Td>
                                <Td>
                                  <input
                                    type='number'
                                    // defaultValue={procedure.qty}
                                    defaultValue={item.quantity}
                                    onChange={event =>
                                      handleProAccInputChange(
                                        event,
                                        item.id,
                                        'quantity'
                                      )
                                    }
                                    className='size-10'
                                  />
                                </Td>
                                {/* <Td>{procedure.purchasePrice}</Td> */}
                                <Td>
                                  <input
                                    type='number'
                                    defaultValue={item.perUsageQTY}
                                    onChange={event =>
                                      handleProAccInputChange(
                                        event,
                                        item.id,
                                        'perUsageQTY'
                                      )
                                    }
                                    className='size-10'
                                  />
                                </Td>
                                <Td>
                                  <RxCross2
                                    onClick={() => removeProAcc(item.item_id)}
                                  />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        )}
                      </Table>
                    </div>
                    {/* NOTE End Procedure Accessory */}

                    <div className='col-6 form-group mt-3'>
                      <Label>Machine</Label>
                      <Select
                        className='form-control'
                        onChange={e => setMacId(e.target.value)}
                      >
                        <Option>Select Machine</Option>
                        {machines.map((machine, i) => (
                          <Option value={machine._id}>{machine.name}</Option>
                        ))}
                      </Select>
                    </div>
                    <div className='col-3 mt-4'>
                      <Button onClick={addMacProcedure}>Add</Button>
                    </div>
                    <div className='col-12 mt-3'>
                      <Table className='table table-striped'>
                        <Thead>
                          <Tr>
                            <Th>No.</Th>
                            <Th>Item Name</Th>
                            <Th>Qty</Th>
                            <Th>Purchase Price</Th>
                            <Th>Per Usage Qty</Th>
                            <Th>Amount</Th>
                          </Tr>
                        </Thead>
                        {isMacItem && (
                          <Tbody>
                            {macitems.map((macitem, index) =>
                              machines.map(
                                (machine, i) =>
                                  macitem.item_id == machine._id && (
                                    <Tr>
                                      <Td>{++index}</Td>
                                      <Td>{machine.name}</Td>
                                      <Td>1</Td>
                                      <Td>{machine.initialPrice}</Td>
                                      <Td>1</Td>
                                      <Td>{machine.initialPrice}</Td>
                                      <Td>
                                        <RxCross2
                                          onClick={() => removeMac(machine._id)}
                                        />
                                      </Td>
                                    </Tr>
                                  )
                              )
                            )}
                          </Tbody>
                        )}
                      </Table>
                    </div>
                    <div className='col-4 form-group mt-3'>
                      <Label>
                        Estimate Total Price<Span>*</Span>
                      </Label>
                      <Input
                        type='number'
                        className='form-control'
                        onChange={e => setTotalPrice(e.target.value)}
                      />
                    </div>
                    <div className='col-2 form-group mt-3'>
                      <Label>
                        Percent(%)<Span>*</Span>
                      </Label>
                      <Input
                        type='number'
                        className='form-control'
                        onChange={e => setPercent(e.target.value)}
                      />
                    </div>
                    <div className='col-4 form-group mt-3'>
                      <Label>
                        Selling Price<Span>*</Span>
                      </Label>
                      <Input
                        type='number'
                        className='form-control'
                        onChange={e => setSellPrice(e.target.value)}
                      />
                    </div>
                    <div className='col-6 form-group mt-3'>
                      <Label>Description</Label>
                      <Textarea
                        className='form-control'
                        onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <Top>
                  <Center>
                    <Button onClick={create}>Save</Button>
                  </Center>
                </Top>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <!-- /.content-wrapper --> */}
      <footer className='main-footer' style={{ marginTop: '50px;' }}>
        <strong>
          Copyright &copy; 2017-2020{' '}
          <a href='http://www.kwintechnologies.com'>K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer>

      {/* <!-- Control Sidebar --> */}
      <aside className='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>

      {/* <!-- ./wrapper --> */}
    </div>
  )
}

export default Create
