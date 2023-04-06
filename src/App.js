import './App.css';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import StockCount from './pages/StockCount'
import Appointment from './appointments/Appointment';
import AppointmentCreate from './appointments/AppointmentCreate';
import AppointmentDetail from './appointments/AppointmentDetail';
import Patient from './patients/Patient';
import PatientRegister from './patients/Register';
import Treatment from './master/treatments/Treatment';
import TreatmentCreate from './master/treatments/Create';
import Member from './patients/Member';
import PatientCredit from './patients/PatientCredit';
import Sidebar from './components/Sidebar';
import MedicineSale from './pages/MedicineSale'
import Payment from './appointments/Payment'
import Payments from  './reports/Payments'
import Category from './master/datas/Category';
import SubCategory from './master/datas/SubCategory';
import Brand from './master/datas/Brand';
import Medicine from './master/datas/Medicine';
import MedicineUnit from './master/datas/MedicineUnit';
import ProcedureMedicine from './master/datas/ProcedureMedicine';
import ProcedureMedicineUnit from './master/datas/ProcedureMedicineUnit';

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
        <Route path='/stockcount' element={<StockCount/>} />
      </Routes>
      </Sidebar>  
  );
}

export default App;
