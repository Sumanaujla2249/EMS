import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddEmployee.css';

const EditEmployee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        category_id: ''
    });

    const [category, setCategory] = useState([])
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                console.log('API response:', result.data);
                if (result.data.status) {
                    setCategory(result.data.category || []);
                    setError(null);
                } else {
                    setError(result.data.Error || 'An error occurred');
                }
            })
            .catch(err => {
                console.log('Error fetching categories:', err);
                setError('Failed to fetch categories.');
            });
        axios.get('http://localhost:3000/auth/employee/' + id)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    category_id: result.data.Result[0].category_id,
                })
            }).catch(err => console.log(err))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/' + id, employee)
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/Employee')
                }
                else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }
    return (
        <div className='add-employee-wrapper'>
            <div className='form-container'>
                <h2 className="text-center">Edit Employee</h2>
                <form className="row g-1" onSubmit={handleSubmit} >
                    <div className='col-12'>
                        <label htmlFor="inputName" className="form-label">Name:</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={employee.name}
                            id="inputName"
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className="form-label">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={employee.email}
                            id="inputEmail4"
                            className='form-control rounded-0'
                            autoComplete="off"
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputSalary" className="form-label">Salary:</label>
                        <input
                            type="text"
                            placeholder="Enter Salary"
                            value={employee.salary}
                            id="inputSalary"
                            className='form-control rounded-0'
                            autoComplete="off"
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputAddress" className="form-label">Address:</label>
                        <input
                            type="text"
                            placeholder="1234 Main St"
                            id="inputAddress"
                            value={employee.address}
                            className='form-control rounded-0'
                            autoComplete="off"
                            onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="category" className="form-label">Category:</label>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            value={employee.category_id}  // Bind the select value to employee.category_id
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}
                        >
                            <option value="">Select a category</option>
                            {category && category.length > 0 ? (
                                category.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            ) : (
                                <option disabled>No categories available</option>
                            )}
                        </select>
                    </div>

                    <div className='col-12'>
                        <button type="submit" className='btn btn-primary w-100' style={{ backgroundColor: 'green' }}>Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee