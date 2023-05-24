import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from "../../components/Navbar"
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import {
  FaCashRegister,
  FaFileMedical,
  FaPenSquare,
  FaRegEdit,
  FaRegTrashAlt,
  FaArrowCircleLeft,
  FaArrowLeft
} from 'react-icons/fa'
import HorizontalScroll from 'react-horizontal-scrolling'

function Unit() {
  const [proMedicineLists, setProMedicineLists] = useState([])
  const [proUnitLists, setProUnitLists] = useState([])
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [currentQuantity, setCurrentQuantity] = useState('')
  const [reorder, setReorder] = useState('')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [sellingPrice, setSellingPrice] = useState('')
  const [totalUnit, setTotalUnit] = useState('')
  const [description, setDescription] = useState('')
  const [showUpdate, setShowUpdate] = useState(false)
  const url =  useSelector(state=>state.auth.url);
  const [perUnit, setPerUnit] = useState('')
  const [upCode, setUpCode] = useState('')
  const [upName, setUpName] = useState('')
  const [upDesc, setUpDesc] = useState('')
  const [upCurQTY, setUpCurQTY] = useState('')
  const [upReOrder, setUpReOrder] = useState('')
  const [upFrom, setUpFrom] = useState('')
  const [upTo, setUpTo] = useState('')
  const [upTotal, setUpTotal] = useState('')
  const [upPur, setUpPur] = useState('')
  const [upSell, setUpSell] = useState('')
  const [Id, setId] = useState('')

  const proMedicineListId = useLocation().pathname.split('/')[2]
  const handleDelete = event => {
    console.log(event, 'delete')
    axios
      .delete(
        url+'api/procedure-item/' +
        event
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = proUnitLists.filter(item => item._id !== event)
        setProUnitLists(result)
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'CANCEL'
        })
      })
  }

  const handleUpdate = event => {
    console.log(event, 'event')
    const getMedUnitUpdate = async () => {
      try {
        const res = await axios.get(
          url+'api/procedure-item/' +
          event
        )

        console.log(res.data.data[0])
        setUpCode(res.data.data[0].code)
        console.log(res.data.data[0].code, 'code')

        setUpName(res.data.data[0].procedureItemName)
        setUpCurQTY(res.data.data[0].currentQuantity)
        setUpReOrder(res.data.data[0].reOrderQuantity)
        setUpFrom(res.data.data[0].fromUnit)
        setUpTo(res.data.data[0].toUnit)
        setUpTotal(res.data.data[0].totalUnit)
        setUpPur(res.data.data[0].purchasePrice)
        setUpSell(res.data.data[0].sellingPrice)
        setUpDesc(res.data.data[0].description)
      } catch (err) { }
    }
    getMedUnitUpdate()
    setShowUpdate(true)
    setId(event)
  }

  const handleUnitCalculation = event => {
    console.log(currentQuantity)
    console.log(event)

    if (currentQuantity) {
      let multi = currentQuantity * event
      let ans = multi / fromUnit

      setTotalUnit(ans.toFixed(2))
    }

    setToUnit(event)
  }

  const ProUnitUpdate = () => {
    const data = {
      id: Id,
      name: proMedicineListId,
      code: upCode,
      procedureItemName: upName,
      currentQuantity: upCurQTY,
      reOrderQuantity: upReOrder,
      purchasePrice: upPur,
      sellingPrice: upSell,
      fromUnit: upFrom,
      toUnit: upTo,
      totalUnit: upTotal,
      description: upDesc
    }

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios
      .put(
        url+'api/procedure-item',
        data,
        config
      )
      .then(function (response) {
        Swal.fire({
          title: 'Successful!',
          text: 'You Created Income Data!',
          icon: 'success',

          cancelButtonText: 'Close'
        })
        window.location.reload()

        // setUnitLists([...unitLists,response.data.list[0]])

        setProUnitLists(
          proUnitLists.map(category => {
            if (category._id === response.data.list._id) {
              return response.data.list
            } else {
              return category
            }
          })
        )
      })
    // .catch(function (err) {
    //   Swal.fire({
    //     title: 'Something Wrong!',
    //     text: 'Try again, Please.',
    //     icon: 'warning',
    //     // showCancelButton: true,

    //     cancelButtonText: 'Close'
    //   })
    // })
    // document.getElementById('desc').value = ''
    // document.getElementById('name').value = ''
    // document.getElementById('code').value = ''
  }

  const handleUpdateUnitCalculation = event => {
    console.log(upCurQTY)
    console.log(event)

    if (upCurQTY) {
      let multi = upCurQTY * event
      let ans = multi / upFrom

      setUpTotal(ans.toFixed(2))
    }

    setUpTo(event)
  }

  const ProUnitCreate = () => {
    const data = {
      name: proMedicineListId,
      code: code,
      perUnitQuantity: perUnit,
      procedureItemName: name,
      currentQuantity: currentQuantity,
      reOrderQuantity: reorder,
      purchasePrice: purchasePrice,
      sellingPrice: sellingPrice,
      fromUnit: fromUnit,
      toUnit: toUnit,
      description: description
    }
    console.log(data)
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    axios
      .post(
        url+'api/procedure-item',
        data,
        config
      )
      .then(function (response) {
        console.log(response.data.data);
        console.log(response.data.message);
        setProUnitLists([...proUnitLists, response.data.data]);
        Swal.fire({
          title: 'Successful!',
          text: 'You Created Income Data!',
          icon: 'success',

          cancelButtonText: 'Close'
        })
        setProUnitLists([...proUnitLists, response.data.list])
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
    document.getElementById('description').value = ''
    document.getElementById('name').value = ''
    document.getElementById('code').value = ''
    document.getElementById('cur_qty').value = ''
    document.getElementById('reorder').value = ''
    document.getElementById('purchase').value = ''
    document.getElementById('per').value = ''
    document.getElementById('from').value = ''
    document.getElementById('to').value = ''
    document.getElementById('total').value = ''

    document.getElementById('sellprice').value = ''
    document.getElementById('total').value = ''

    //      props.setOpen(false);
  }
  useEffect(() => {
    const getUnitLists = async () => {
      try {
        const res = await axios.get(
          url+'api/procedure-items/' +
          proMedicineListId
        )

        console.log(res.data.data)
        setProUnitLists(res.data.data)
      } catch (err) { }
    }

    const getProMedicineLists = async () => {
      try {
        const res = await axios.get(
          url+'api/procedure-medicine/' +
          proMedicineListId
        )
        console.log(res.data.data[0].name)
        let proName = res.data.data[0].name
        setProMedicineLists(proName)
      } catch (err) {
        alert(err.message)
      }
    }
    getProMedicineLists();
    getUnitLists();
  }, []);
  return (
    <div classNameName='App'>
      {/* <!-- end preloader --> */}
      {/* @include('sweet::alert') */}

      <div className='wrapper'>
        {/* <!-- Navbar --> */}
      
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
                  {/* <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/pro_medicine'>
                        <i>
                          <FaArrowLeft />
                        </i>
                      </Link>
                    </li>
                    <li
                      className='breadcrumb-item active'
                      style={{ marginTop: '0.2em' }}
                    >
                      <i>Procedure Medicine Unit List</i>
                    </li>
                  </ol> */}
                  <h5>Procedure Medicine Unit List</h5>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-9'>
                  <div className='card'>
                    <div className='card-header'>
                      <h3 className='card-title'>{proMedicineLists}'s Unit</h3>
                    </div>
                    <div className='card-body bg-light'>
                      <HorizontalScroll>
                        <table id='' className='table'>
                          <thead className='text-center'>
                            <tr>
                              <th>No</th>
                              <th>Code</th>
                              <th>Name</th>
                              <th>Current Qty</th>
                              <th>Reorder Qty</th>
                              <th>Purchase Price</th>
                              <th>Selling Price</th>
                              <th>Unit Convention</th>

                              <th>Description</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          {proUnitLists.map((unit, i) => (
                            <tbody className=''>
                              <tr>
                                <td>{++i}</td>
                                <td>{unit.code}</td>
                                <td>
                                  {unit.procedureItemName
                                    ? unit.procedureItemName
                                    : 'No name'}
                                </td>
                                <td>
                                  {unit.currentQuantity
                                    ? unit.currentQuantity
                                    : '0'}
                                </td>
                                <td>{unit.reOrderQuantity}</td>
                                <td>{unit.purchasePrice}</td>
                                <td>{unit.sellingPrice}</td>

                                <td>{unit.toUnit ? unit.toUnit : '0'}</td>
                                <td>{unit.description}</td>
                                <td className='text-center'>
                                  <button
                                    onClick={e => handleUpdate(unit._id)}
                                    className='btn btn-warning'
                                  >
                                    <FaRegEdit />
                                  </button>
                                  &nbsp;
                                  <button
                                    className='btn btn-sm btn-danger'
                                    onClick={e => handleDelete(unit._id)}
                                  >
                                    <FaRegTrashAlt />
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      </HorizontalScroll>
                    </div>
                  </div>
                </div>

                {showUpdate ? (
                  <div className='col-md-3'>
                    <div className='card px-3 py-3'>
                      <h3 className='card-header mb-4 fw-5 text-secondary'>
                        Update Item
                      </h3>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Code
                        </label>
                        <input
                          type='text'
                          class='form-control'
                          name='codename'
                          id='code'
                          value={upCode}
                          onChange={e => setUpCode(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Name
                        </label>
                        <input
                          type='text'
                          class='form-control'
                          name='balance'
                          id='name'
                          value={upName}
                          onChange={e => setUpName(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Current Quantity
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='cur_qty'
                          value={upCurQTY}
                          onChange={e => setUpCurQTY(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Reorder Quantity (Optional)
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='reorder'
                          value={upReOrder}
                          onChange={e => setUpReOrder(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Unit Convention (Optional)
                        </label>
                        <div className='row'>
                          <div className='col-md-6'>
                            <input
                              type='number'
                              class='form-control'
                              name='balance'
                              id='from'
                              value={upFrom}
                              onChange={e => setUpFrom(e.target.value)}
                            />
                          </div>
                          <div className='col-md-6'>
                            <input
                              type='number'
                              class='form-control'
                              name='balance'
                              id='to'
                              value={upTo}
                              onChange={e =>
                                handleUpdateUnitCalculation(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Total Unit
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='total'
                          value={upTotal}
                        />
                      </div>

                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Purchase Price
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='purchase'
                          value={upPur}
                          onChange={e => setUpPur(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Selling Price
                        </label>
                        <div className='row'>
                          <div className='col-md-12'>
                            <input
                              type='number'
                              class='form-control'
                              name='balance'
                              id='sellprice'
                              value={upSell}
                              onChange={e => setUpSell(e.target.value)}
                            />
                          </div>
                          {/* <div className="col-md-4">
                          <input
                            type="number"
                            class="form-control"
                            name="balance"
                            id="name"
                            placeholder="%"
                          />
                        </div> */}
                        </div>
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Description
                        </label>
                        <textarea
                          className='form-control'
                          id='description'
                          value={upDesc}
                          onChange={e => setUpDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        className='btn btn-primary form-control text-center fw-5'
                        onClick={ProUnitUpdate}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='col-md-3'>
                    <div className='card px-3 py-3'>
                      <h3 className='card-header mb-4 fw-5 text-secondary'>
                        Create Item
                      </h3>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Code
                        </label>
                        <input
                          type='text'
                          class='form-control'
                          name='codename'
                          id='code'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setCode(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Name
                        </label>
                        <input
                          type='text'
                          class='form-control'
                          name='balance'
                          id='name'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Current Quantity
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='cur_qty'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setCurrentQuantity(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Reorder Quantity (Optional)
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='reorder'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setReorder(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Unit Convention (Optional)
                        </label>
                        <div className='row'>
                          <div className='col-md-6'>
                            <input
                              type='number'
                              class='form-control'
                              name='balance'
                              id='from'
                              placeholder='Form Unit'
                              onChange={e => setFromUnit(e.target.value)}
                            />
                          </div>
                          <div className='col-md-6'>
                            <input
                              type='number'
                              class='form-control'
                              name='balance'
                              id='to'
                              placeholder='To Unit'
                              onChange={e =>
                                handleUnitCalculation(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Total Unit
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='total'
                          //   ref={(el) => (this.name = el)}
                          defaultValue={totalUnit}
                        />
                      </div>

                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Purchase Price
                        </label>
                        <input
                          type='number'
                          class='form-control'
                          name='balance'
                          id='purchase'
                          //   ref={(el) => (this.name = el)}
                          onChange={e => setPurchasePrice(e.target.value)}
                        />
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Selling Price
                        </label>
                        <div className='row'>
                          <div className='col-md-12'>
                            <input
                              type='number'
                              class='form-control'
                              name='balance'
                              id='sellprice'
                              onChange={e => setSellingPrice(e.target.value)}
                            />
                          </div>
                          {/* <div className="col-md-4">
                          <input
                            type="number"
                            class="form-control"
                            name="balance"
                            id="name"
                            placeholder="%"
                          />
                        </div> */}
                        </div>
                      </div>
                      <div class='form-group'>
                        <label for='name' className='text-secondary'>
                          Description
                        </label>
                        <textarea
                          className='form-control'
                          id='description'
                          //   ref={(el) => (this.description = el)}
                          onChange={e => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        className='btn btn-primary form-control text-center fw-5'
                        onClick={ProUnitCreate}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*<!-- /.container-fluid --> */}
          </section>
        </div>
      </div>

      {/* <!-- /.content-wrapper --> */}
      <footer className='main-footer'>
        <strong>
          Copyright &copy; 2017-2020{' '}
          <a href='http://www.kwintechnologies.com'>K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer>

      {/* <!-- Control Sidebar --> */}
      <aside classNameName='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>
      {/* <!-- /.control-sidebar --> */}

      {/* <!-- ./wrapper --> */}
    </div>
  )
}
export default Unit
