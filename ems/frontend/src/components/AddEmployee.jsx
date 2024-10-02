import React, { useState, useEffect } from 'react';
import './AddEmployee.css';  // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category_id: '',
        image: ''
    });

    const [category, setCategory] = useState([]);
    const [error, setError] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                console.log(result.data);  // Check what is being returned
                if (result.data.status && result.data.category.length > 0) {
                    setCategory(result.data.category);
                } else {
                    alert(result.data.Error || 'No categories found');
                }
            })
            .catch((err) => console.error('Error fetching categories:', err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',employee.name);
        formData.append('email',employee.email);
        formData.append('password',employee.password);
        formData.append('address',employee.address);
        formData.append('salary',employee.salary);
        formData.append('image',employee.image);
        formData.append('category_id',employee.category_id);
        axios.post('http://localhost:3000/auth/add_employee', formData)
    .then(result => {
        console.log(result.data);  // Log the entire response to see what is being returned
        if (result.data.status) {
            navigate('/dashboard/Employee');
        } else {
            const errorMessage = result.data.Error || "An error occurred. Please try again.";
            alert(errorMessage);
        }
    })
    .catch(err => {
        console.error("Error:", err);
        alert("A network error occurred. Please check the console for more details.");
    });
    };

    return (
        <div className='add-employee-wrapper'>
            <div className='form-container'>
                <h2 className="text-center">Add Employee</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className="form-label">Name:</label>
                        <input 
                            type="text" 
                            placeholder="Enter Name"
                            id="inputName"
                            className='form-control rounded-0' 
                            onChange={(e) => setEmployee({...employee, name: e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className="form-label">Email:</label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            id="inputEmail4"
                            className='form-control rounded-0' 
                            autoComplete="off"
                            onChange={(e) => setEmployee({...employee, email: e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputPassword" className="form-label">Password:</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            id="inputPassword"
                            className='form-control rounded-0' 
                            onChange={(e) => setEmployee({...employee, password: e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputSalary" className="form-label">Salary:</label>
                        <input 
                            type="text" 
                            placeholder="Enter Salary"
                            id="inputSalary"
                            className='form-control rounded-0' 
                            autoComplete="off"
                            onChange={(e) => setEmployee({...employee, salary: e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputAddress" className="form-label">Address:</label>
                        <input 
                            type="text" 
                            placeholder="1234 Main St"
                            id="inputAddress"
                            className='form-control rounded-0' 
                            autoComplete="off"
                            onChange={(e) => setEmployee({...employee, address: e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
    <label htmlFor="category" className="form-label">Category:</label>
    <select 
        name="category" 
        id="category" 
        className="form-select" 
        onChange={(e) => setEmployee({...employee, category_id: e.target.value})}
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

                    <div className='col-12 mb-3'>
                        <label htmlFor="inputGroupFile01" className="form-label">Select Image:</label>
                        <input 
                            type="file" 
                            id="inputGroupFile01"
                            name="image"
                            className='form-control rounded-0' 
                            onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
                        />
                    </div>
                    <div className='col-12'>
                        <button type="submit" className='btn btn-primary w-100' style={{backgroundColor:'green' }}>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
