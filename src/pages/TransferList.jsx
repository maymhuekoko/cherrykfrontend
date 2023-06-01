import React, { useState } from 'react'
import axios from 'axios'
import Nav from '../components/Navbar'
import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import {
  FaCashRegister,
  FaPray,
  FaFileMedical,
  FaPenSquare,
  FaPaperPlane,
  FaRegEdit,
  FaRegTrashAlt
} from 'react-icons/fa'

const StockTran = () => {
  const [stockTranLists, setStockTranLists] = useState([])
  const url =  useSelector(state=>state.auth.url);
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
        url+'api/stock-transfer/' +
          event
      )
      .then(response => {
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        const result = stockTranLists.filter(item => item._id !== event)
        setStockTranLists(result)
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
    const getStockTranLists = async () => {
      try {
        const res = await axios.get(
          url+'api/stock-transfers'
          //'http://localhost:9000/api/treatments'
        )
        setStockTranLists(res.data.list)

        // setTreatmentLists(res.data.list)

        console.log(res.data.list, 'tran')
      } catch (err) {
        alert(err.message)
      }
    }
    getStockTranLists()
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
                <div className='col-sm-12'>
                  <h5 className='mt-3'>Stock Transfer List</h5>
                </div>
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
                    className='input-group row ml-4'
                    style={{ marginBottom: '20px' }}
                  >
                    <div className='col-md-10'>
                      <input
                        type='search'
                        className='form-control rounded ml-4'
                        style={{ borderRadius: '20px' }}
                        id='search_code'
                        placeholder='Search'
                      />
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
                          <a href="/StockTran_type" className="btn btn-primary">
                            StockTran Type
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
                      {/* <ExcelExport data={StockTranLists} ref={_export}>
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
                                {stockTranLists.map((st, i) => (
                                  <tr>
                                    <td>{++i}</td>
                                    <td>
                                      {st.date ? st.date.split('T')[0] : ''}
                                    </td>
                                    <td>{st.requestNo}</td>
                                    <td>{st.requestedBy}</td>

                                    {/* <td>{st.relatedBranch.name}</td> */}

                                    <td className='text-center'>
                                      {/* <div>
                                        <UnitUpdate2 TreatId={TreatId} />
                                      </div> */}
                                      <Link
                                        to={'/st-update/' + st._id}
                                        className='btn btn-sm btn-warning'
                                      >
                                        <FaRegEdit />
                                      </Link>
                                      &nbsp;
                                      <button
                                        className='btn btn-sm btn-danger'
                                        onClick={e => handleDelete(st._id)}
                                      >
                                        <FaRegTrashAlt />
                                      </button>
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

      {/* <!-- Control Sidebar --> */}
      <aside className='control-sidebar control-sidebar-dark'>
        {/* <!-- Control sidebar content goes here --> */}
      </aside>

      {/* <!-- ./wrapper --> */}
    </div>
  )
}

export default StockTran
