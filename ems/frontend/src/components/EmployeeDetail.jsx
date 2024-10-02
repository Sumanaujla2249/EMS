import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ed.css';
import { useNavigate } from 'react-router-dom';


const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const { id } = useParams();
    const navigate=useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/' + id)
            .then(result => {
                setEmployee(result.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);
    const handleLogout=()=>{
        axios.get('http://localhost:3000/employee/logout')
        .then(result=>{
          if(result.data.status){
             localStorage.removeItem("valid")
             navigate('/')
          }
        })
    }
    return (
        <div className="container">
            {/* Navbar */}
            <nav className="navbar">
                <span className="navbar-text">Employee Management System</span>
            </nav>

            {/* Centered Content */}
            <div className="content">
                <div className="employee-details">
                    {/* Circular Image */}
                    <img 
                        src={`http://localhost:3000/Images/` + employee.image} 
                        className='emp_det_image'
                        alt='Employee'
                    />
                    {/* Employee Details */}
                    <div className='details'>
                        <h3>Name: {employee.name}</h3>
                        <h3>Email: {employee.email}</h3>
                        <h3>Salary: {employee.salary}</h3>
                    </div>
                    <div className='actions'>
                        <button className='btn edit-btn'>Edit</button>
                        <button className='btn logout-btn' onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetail;
