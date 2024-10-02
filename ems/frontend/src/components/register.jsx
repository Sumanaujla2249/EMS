import React, { useState } from 'react'
import './reg.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/register', values)
            .then(result => {
                if (result.data.registerStatus) {
                    navigate('/adminlogin'); // Redirect to login after successful registration
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='registerPage'>
            <div className='registerForm'>
                <div className="text-warning">
                   {error && error}
                </div>
                <h2>Register Page</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name='email' 
                            autoComplete='off' 
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0' 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name='password'  
                            placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0' 
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
