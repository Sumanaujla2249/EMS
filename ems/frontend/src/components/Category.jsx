import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

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
  }, []);

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex' style={{ marginLeft: '500px', justifyContent: 'flex-start' }}>
  <h3>Category List</h3>
</div>


      <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
      <div>
        {error && <p className='text-danger'>{error}</p>}
        <table className='table'>
          <thead>
            <tr>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((c, index) => (
                <tr key={index}>
                  <td>{c.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
