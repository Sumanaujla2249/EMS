import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './employee.css';

const Employee = () => {
  const [employee, setEmployee] = useState([]);  // Initialize employee as an empty array
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        console.log('API response:', result.data);
        if (result.data.status) {
          setEmployee(Array.isArray(result.data.Result) ? result.data.Result : []); // Ensure it's an array
          setError(null);
        } else {
          setEmployee([]);  // Reset employee array in case of an error
          setError(result.data.Error || 'An error occurred');
        }
      })
      .catch(err => {
        console.log('Error fetching employees:', err);
        setEmployee([]);  // Reset employee array in case of an error
        setError('Failed to fetch employees.');
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/' + id)
      .then(result => {
        if (result.data.status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex' style={{ marginLeft: '500px',marginTop:'-50px', justifyContent: 'flex-start' }}>
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className='btn btn-success ' >Add Employee</Link>
      <div className='scroll'>
        {error && <p className='text-danger'>{error}</p>}
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Category</th> {/* Add a column for Category */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.length > 0 ? (
              employee.map(e => (
                <tr key={e.id}>
                  <td>{e.employee_name}</td> {/* Employee Name */}
                  <td>
                    <img src={`http://localhost:3000/Images/` + e.image} className="e_image" alt={e.employee_name} />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>{e.category_name || 'N/A'}</td> {/* Category Name */}
                  <td>
                    <Link to={`/dashboard/edit_employee/${e.id}`} className="btn btn-info btn-sm me-2">Edit</Link>
                    <button className="btn btn-warning btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No employees available</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Employee;
