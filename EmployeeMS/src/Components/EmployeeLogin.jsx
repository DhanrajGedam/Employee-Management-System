import React, { useState } from 'react'
import './Style.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function EmployeeLogin() {
    const[values, setValues] = useState({
        email: "",
        password: ""
      })
      const [error,setError] = useState(null)
      const navigate = useNavigate();
      axios.defaults.withCredentials=true;
      function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:3001/employee/employee_login', values)
        .then(result => {
          if(result.data.loginStatus){
            localStorage.setItem("valid", true)

            navigate('/employee_detail/'+result.data.id)
          }else{
            setError(result.data.Error)
          }
        })
        .catch(err => console.log(err))
      }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100  loginPage'>
      <div className='p-3 rounded w-15 border loginForm'>
        <div className="text-danger d-flex justify-content-center align-items-center">
          {error && error}
        </div>
        <h2 className=' d-flex justify-content-center align-items-center'>Employee Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor=""><strong>Email:</strong></label>
            <input type="email" name='email'  placeholder='Enter your Email' className='form-control rounded'
             onChange={(e)=>setValues({...values,email : e.target.value})} />
          </div>
          <div className='mb-3'>
            <label htmlFor=""><strong>Password:</strong></label>
            <input type="password" name='password'  placeholder='Enter your Password' className='form-control rounded'
            onChange={(e)=>setValues({...values, password : e.target.value})} />
          </div>
          <button type="submit" className='btn btn-success w-100 mb-2'>Login</button>
          <div className='mb-1'>
            <input type="checkbox" name="tick" id="tick" className='me-2'/> 
            <label htmlFor="password">You are agree with our Terms & Conditions:</label>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EmployeeLogin