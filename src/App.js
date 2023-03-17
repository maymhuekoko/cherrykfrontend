import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Appointment from './appointments/Appointment';
import AppointmentCreate from './appointments/AppointmentCreate';
import AppointmentDetail from './appointments/AppointmentDetail';
import Patient from './patients/Patient';
import PatientRegister from './patients/Register';
import TreatmentCreate from './master/treatments/Create';
import Member from './patients/Member';
import PatientCredit from './patients/PatientCredit';
import Sidebar from './components/Sidebar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <Router>
      <Sidebar>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/appointment/list' element={<Appointment />} />
        <Route path='/appointment/create' element={<AppointmentCreate />} />
        <Route path='/appointment/detail' element={<AppointmentDetail />} />
        <Route path='/patient/list' element={<Patient />} />
        <Route path='/patient/register' element={<PatientRegister />} />
        <Route path='/patient/member' element={<Member />} />
        <Route path='/patient/credit_list' element={<PatientCredit />} />
        <Route path='/treatment/create' element={<TreatmentCreate/>} />
      </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
