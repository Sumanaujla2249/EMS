import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Make sure to import the CSS file

const Home = () => {
  const [adminTotal,setAdminTotal]=useState(0)
  const [employeeTotal,setemployeeTotal]=useState(0)
  const [salaryTotal,setSalaryTotal]=useState(0)
  const [admins,setAdmins]=useState([])

  useEffect(()=>{
     adminCount();
     employeeCount();
     salaryCount();
     AdminRecords();
  },[])
  const AdminRecords=()=>{
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result=>{
      if(result.data.status){
        setAdmins(result.data.Result)
      }
      else{
        alert(result.data.Error)
      }
    })
  }
  const adminCount=()=>{
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result=>{
      if(result.data.status){
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount=()=>{
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result=>{
      if(result.data.status){
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const salaryCount=()=>{
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result=>{
      if(result.data.status){
        setSalaryTotal(result.data.Result[0].salary)
      }
    })
  }
  const handleDelete=(id)=>{
    axios.delete('http://localhost:3000/auth/delete_admin/'+id)
    .then(result=>{
      if(result.data.status){
        window.location.reload()
      }
      else{
        alert(result.data.eEror)
      }
    })
}
  return (
    <div className='Home'>
    <div className="home-container">
      <div className="card">
        <h4>Admin</h4>
        <hr />
        <h5>Total:  {adminTotal}</h5>
      </div>
      <div className="card">
        <h4>Employee</h4>
        <hr />
        <h5>Total:  {employeeTotal}</h5>
      </div>
      <div className="card">
        <h4>Salary</h4>
        <hr />
        <h5>Total:  ${salaryTotal}</h5>
      </div>
    </div>
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admins</h3>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    {
      admins.map(a => (
        <tr key={a.email}>
          <td>{a.email}</td>
          <td>
            <button
              className='btn btn-info btn-sm me-2'
              style={{ width: '120px' }} // Inline CSS for larger width
            >
              Edit
            </button>
            <button className="btn btn-warning btn-sm" style={{ width: '120px'  } } onClick={() => handleDelete(a.id)}>Delete</button>
          </td>
        </tr>
      ))
    }
  </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default Home;
