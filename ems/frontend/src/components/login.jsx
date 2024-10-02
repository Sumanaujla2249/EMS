import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isChecked, setIsChecked] = useState(false); // Track checkbox state
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if the checkbox is checked
        if (!isChecked) {
            setError('You must agree to the terms and conditions.');
            return;
        }

        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid",true)
                    navigate('/dashboard');
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='loginPage'>
            <div className='loginForm'>
                <div className="text-warning">
                    {error && error}
                </div>
                <h2>Login Page</h2>
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
                    <button className='btn btn-success w-100 rounded-0'>Submit</button>
                    <div className="terms-container">
                        <input 
                            type="checkbox" 
                            name="tick" 
                            id="tick"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)} // Update checkbox state
                        />
                        <label htmlFor="tick">You agree with terms and conditions</label>
                    </div>
                </form>
                <p>Not registered? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
}

export default Login;
