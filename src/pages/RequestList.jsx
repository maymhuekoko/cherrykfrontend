import React, { useState } from 'react'
import axios from 'axios'
import Nav from "../components/Navbar"
import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import {
  FaPaperPlane,
  FaRegEdit,
  FaRegTrashAlt
} from 'react-icons/fa'

const Income = () => {
  const [stockReqLists, setStockReqLists] = useState([])
  const url =  useSelector(state=>state.auth.url);
  const TreatId = useLocation().pathname.split('/')[2]

  // const _export = React.useRef(null);
  // const excelExport = () => {
  //   if (_export.current !== null) {
  //     console.log(_export.current.props.data);
  //     _export.current.props.data.map(function (element, index) {
  //       element.date = element.date.split("T")[0];
  //     });
  //     _export.current.save();
  //   }
  // };

  const handleDelete = event => {
    axios
      .delete(
        url+'api/stock-request/' +
          event
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = stockReqLists.filter(item => item._id !== event)
        setStockReqLists(result)
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

  useEffect(() => {
    const getStockReqLists = async () => {
      try {
        const res = await axios.get(
          url+'api/stock-requests'
          //'http://localhost:9000/api/treatments'
        )
        setStockReqLists(res.data.list)

        // setTreatmentLists(res.data.list)

        console.log(res.data.list)
      } catch (err) {
        alert(err.message)
      }
    }
    getStockReqLists()
  }, [])

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
                <h5 className='mt-3'>
                      Stock Request List
                </h5>
              </div>
            </div>
          </div>

          {/* <!-- Main content --> */}

          <section className='content'>
            <div className='container-fluid'>
              <div className='row d-flex justify-content-between '>
                <div className='col-md-6'>
                  {/* <h4>Medicine Item List</h4> */}
                </div>
                <div className='offset-1 col-md-4 ml-4'>
                  <div
                    className='input-group row'
                    style={{ marginBottom: '20px',marginLeft:'60px' }}
                  >
                    <div className='col-md-6'>
                      <input
                        type='search'
                        className='form-control rounded ml-1'
                        style={{ borderRadius: '12px' }}
                        id='search_code'
                        placeholder='Search'
                      />
                    </div>
                    <div className='col-md-6 mt-1'>
                      <Link
                        to='/stock-request-create'
                        className='btn'
                        style={{
                          borderRadius: '7px',
                          backgroundColor: 'rgb(0, 7, 51)',
                          color: 'white'
                        }}
                      >
                        Create 
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='card'>
                    {/* <div className="card-header">
                      <div className="row justify-content-between">
                        <span className="float-right">
                          <a href="/income_type" className="btn btn-primary">
                            Income Type
                          </a>
                           <button
                              type="button"
                              className="btn btn-primary"
                              onClick={excelExport}>
                              Export Excel
                            </button>
                        </span>
                      </div>
                      <div className="row" id="trial_balance"></div>
                    </div> */}

                    <div className='card-body'>
                      {/* Export data in Excel */}
                      {/* <ExcelExport data={incomeLists} ref={_export}>
                        <ExcelExportColumn
                          field=""
                          title="No"
                          locked={true}
                          width={30}
                        />
                        <ExcelExportColumn
                          field="date"
                          title="Date"
                          headerCellOptions={{
                            textAlign: "center",
                          }}
                          width={200}
                        />

                        <ExcelExportColumn
                          field="relatedBankAccount.name"
                          title="Bank Account"
                          headerCellOptions={{
                            textAlign: "center",
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field="relatedCashAccount.name"
                          title="Cash Account"
                          headerCellOptions={{
                            textAlign: "center",
                          }}
                          width={250}
                        />

                        <ExcelExportColumn
                          field="relatedAccounting.name"
                          title="Account"
                          width={150}
                        />
                        <ExcelExportColumn
                          field="remark"
                          title="Remark"
                          width={150}
                        />
                      </ExcelExport> */}
                      {/* Export Data in Excel end */}
                      <div className='row'>
                        <div className='col-md-12'>
                          <div
                            className='table-responsive text-black'
                            id='slimtest2'
                          >
                            <table
                              className='table table-hover'
                              id='filter_date'
                            >
                              <thead className='bg-white'>
                                <tr>
                                  <th>#</th>
                                  <th>Date</th>
                                  <th>Request No</th>
                                  <th>Request By</th>
                                  {/* <th>Doctor</th> */}
                                  {/* <th>Branch</th> */}

                                  {/* <th>Check</th> */}
                                  <th className='text-center'>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {stockReqLists.map((sq, i) => (
                                  <tr>
                                    <td>{++i}</td>
                                    <td>
                                      {sq.date ? sq.date.split('T')[0] : ''}
                                    </td>
                                    <td>{sq.requestNo}</td>
                                    <td>{sq.requestedBy}</td>

                                    {/* <td>{sq.relatedBranch.name}</td> */}

                                    <td className='text-center'>
                                      {/* <div>
                                        <UnitUpdate2 TreatId={TreatId} />
                                      </div> */}
                                      <Link
                                        to={'/sq-Update/' + sq._id}
                                        className='btn btn-sm btn-warning'
                                      >
                                        <FaRegEdit />
                                      </Link>
                                      &nbsp;
                                      <button
                                        className='btn btn-sm btn-danger'
                                        onClick={e => handleDelete(sq._id)}
                                      >
                                        <FaRegTrashAlt />
                                      </button>
                                      &nbsp;
                                      <Link
                                        to={'/stock-tran-create/'+sq._id}
                                        className='btn btn-sm btn-info'
                                        style={{
                                          borderRadius: '7px',
                                          
                                          color: 'white'
                                        }}
                                      >
                                        <FaPaperPlane />
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <Treatement
                open={open}
                close={() => setOpen(false)}
                setTreatmentLists={setTreatmentLists}
                treatmentLists={treatmentLists}
              /> */}
            </div>
          </section>
        </div>
      </div>
      {/* <!-- /.content-wrapper --> */}
      {/* <footer className='main-footer' style={{ marginTop: '50px;' }}>
        <strong>
          Copyright &copy; 2017-2020{' '}
          <a href='http://www.kwintechnologies.com'>K-win Technology</a>.
        </strong>
        All rights reserved.
      </footer> */}

      {/* <!-- Control Sidebar --> */}
      <aside className='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>

      {/* <!-- ./wrapper --> */}
    </div>
  )
}

export default Income
