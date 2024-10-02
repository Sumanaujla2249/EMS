import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Addcategory = () => {
  const [category,setCategory]=useState()
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/auth/add_category',{category})
    .then(result=>{
         if(result.data.status){
             navigate('/dashboard/Category')
         }
         else{
            alert(result.data.error)
         }
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className='d-flex' style={{width:'1500px', justifyContent: 'center' }}>
            <div className='p-3 rounded w-25 border'>
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="category">Category:</label>
                        <input 
                            type="text" 
                            name='category' 
                            autoComplete='off' 
                            placeholder='Enter Category'
                            onChange={(e) =>setCategory(e.target.value) }
                            className='form-control rounded-0' 
                        />
                    </div>
                    
                    <button className='btn btn-success w-100 rounded-0'>Add Category</button>
                </form>
            </div>
        </div>
  )
}

export default Addcategory