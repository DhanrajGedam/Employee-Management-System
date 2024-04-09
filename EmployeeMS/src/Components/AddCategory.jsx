import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function AddCategory() {
    const [category, setCategory] = useState();
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/auth/add_category', {category})
        .then(result=>{
            if(result.data.Status) {
                navigate('/dashboard/category')
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err=> console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-25 border '>
        <h2 className=' d-flex justify-content-center align-items-center'>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="" className='mb-2'><strong>Category:</strong></label>
            <input type="text" name='category'  placeholder='Add Category' className='form-control rounded'
             onChange={(e) => setCategory(e.target.value)} />
          </div>
          
          <button type="submit" className='btn btn-success w-100 mb-2'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory