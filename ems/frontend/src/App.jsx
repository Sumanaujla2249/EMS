import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Register from './components/register';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/category';
import Profile from './components/Profile';
import Addcategory from './components/Addcategory';
import AddEmployee from './components/Addemployee';
import EditEmployee from './components/EditEmployee';
import Start from './components/start';
import EmployeeLogin from './components/EmployeeLogin';
import EmployeeDetail from './components/EmployeeDetail';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/employee_login' element={<EmployeeLogin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/employee_detail/:id' element={<EmployeeDetail />} />
        <Route path='/dashboard' element={
          <PrivateRoute>
             <Dashboard />
          </PrivateRoute>
         }>
          <Route index element={<Home />} />
          <Route path='employee' element={<Employee />} />
          <Route path='category' element={<Category />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add_category' element={<Addcategory />} />
          <Route path='add_employee' element={<AddEmployee />} />
          <Route path='edit_employee/:id' element={<EditEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
