import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
const Start = () => {
    const navigate=useNavigate()
useEffect(()=>{
  axios.get('http://localhost:3000/verify')
  .then(result=>{
     if(result.data.status){
      if(result.data.role==="admin"){
         navigate('/dashboard')
      }
      else{
        navigate('/employee_detail/'+result.data.id)
      }
     }
  }).catch(err=>console.log(err))
},[])
  return (
    <div className='loginPage'>
            <div className='loginForm'>
                <h2>Login As</h2>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button type="button" onClick={()=>{navigate('/adminlogin')}}>Admin</button>
                    <button type="button" onClick={()=>{navigate('/employee_login')}}>Employee</button>
                </div>
            </div>
        </div>
  )
}

export default Start