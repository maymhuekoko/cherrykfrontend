import './App.css';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import StockCount from './pages/StockCount'
import Purchase from './pages/purchase/List'
import PurchaseDetail from './pages/purchase/Detail'
import PurchaseEdit from './pages/purchase/Edit'
import Create from './pages/purchase/Create'
import Supplier from './pages/supplier/List'
import CreditDetail from './pages/supplier/Credit'
import Appointment from './appointments/Appointment';
import MedicineHistory from './appointments/MedicineHistory';
import ProcedureHistory from './appointments/ProcedureHistory';
import AppointmentCreate from './appointments/AppointmentCreate';
import AppointmentDetail from './appointments/AppointmentDetail';
import Patient from './patients/Patient';
import PatientRegister from './patients/Register';
import Treatment from './master/treatments/Treatment';
import List from './master/treatments/List';
import TreatmentCreate from './master/treatments/Create';
import Member from './patients/Member';
import PatientCredit from './patients/PatientCredit';
import Sidebar from './components/Sidebar';
import MedicineSale from './pages/MedicineSale'
import Payment from './appointments/Payment'
import Voucher from './appointments/Voucher'
import Payments from  './reports/Payments'
import Category from './master/datas/Category';
import SubCategory from './master/datas/SubCategory';
import Brand from './master/datas/Brand';
import Machinery from './master/datas/Machinery';
import Medicine from './master/datas/Medicine';
import MedicineUnit from './master/datas/MedicineUnit';
import ProcedureMedicine from './master/datas/ProcedureMedicine';
import ProcedureMedicineUnit from './master/datas/ProcedureMedicineUnit';
import ProcedureAccessory from './master/datas/ProcedureAccessory';
import ProcedureAccessoryUnit from './master/datas/ProcedureAccessoryUnit';

function App() {
  return (
      <Sidebar>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/appointment/list' element={<Appointment />} />
        <Route path='/appointment/create' element={<AppointmentCreate />} />
        <Route path='/appointment/:id' element={<AppointmentDetail />} />
        <Route path='/patient/list' element={<Patient />} />
        <Route path='/patient/register' element={<PatientRegister />} />
        <Route path='/patient/member' element={<Member />} />
        <Route path='/patient/credit_list' element={<PatientCredit />} />
        <Route path='/treatment' element={<Treatment/>} />
        <Route path='/treatment/list' element={<List/> }/>
        <Route path='/treatment/create/:id/:name' element={<TreatmentCreate/>} />
        <Route path='/medicine_sale/:aid/:tid' element={<MedicineSale />} />
        <Route path='/single_payment/:id' element={<Payment />} />
        <Route path='/reports/payment' element={<Payments/>} />
        <Route path='/category' element={<Category/>} />
        <Route path='/subcategory' element={<SubCategory/>} />
        <Route path='/brand' element={<Brand/>} />
        <Route path='/medicine' element={<Medicine/>} />
        <Route path='/medicine/:id/:name' element={<MedicineUnit/>} />
        <Route path='/procedure_medicine' element={<ProcedureMedicine/>} />
        <Route path='/procedure_medicine/:id/:name' element={<ProcedureMedicineUnit />} />
        <Route path='/procedure_accessory' element={<ProcedureAccessory/>} />
        <Route path='/procedure_accessory/:id/:name' element={<ProcedureAccessoryUnit />} />
        <Route path='/stockcount' element={<StockCount/>} />
        <Route path='/purchase' element={<Purchase/>} />
        <Route path='/purchase/:id' element={<PurchaseDetail/>} />
        <Route path='/edit_purchase/:id' element={<PurchaseEdit/>} />
        <Route path='/create_purchase' element={<Create/>} />
        <Route path='/supplier' element={<Supplier/>} />
        <Route path='/machinery' element={<Machinery/>} />
        <Route path='/credit_detail/:id' element={<CreditDetail/>} />
        <Route path='/voucher/:id' element={<Voucher />} />
        <Route path='/medicine-history/:id' element={<MedicineHistory />} />
        <Route path='/procedure-history/:tid/:aid' element={<ProcedureHistory />} />
      </Routes>
      </Sidebar>  
  );
}

export default App;
