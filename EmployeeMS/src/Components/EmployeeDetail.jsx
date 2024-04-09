import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function EmployeeDetail() {
    const {id} = useParams()
    const [employee, setEmployee] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3001/employee/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    },[])
    const handleLogout = ()=>{
            axios.get('http://localhost:3001/auth/logout')
            .then(result =>{
              if(result.data.Status){
                localStorage.removeItem("valid")
                navigate('/')
              }
            })
          
    }
  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
        </div>
        <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
            <img src={`http://localhost:3001/images/`+employee.image} className='emp_det_image w-25'/>
            <div className='d-flex align-items-center flex-column mt-3'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: ${employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2' >Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail