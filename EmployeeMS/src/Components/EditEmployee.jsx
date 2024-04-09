import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'; // Import useParams
import {useNavigate} from 'react-router-dom'

function EditEmployee() {
    const { id } = useParams(); // Use useParams to get the id parameter
    const [employee, setEmployee] = useState({
      name: "",
      email: "",
      salary: "",
      address:"",
      category_id: "",
      

  })
  const [category, setCategory] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:3001/auth/category')
    .then(result => {
        if(result.data.Status){
            setCategory(result.data.Result)
        }else{
            alert(result.data.Error)
        }
    }).catch(err => console.log(err))

    axios.get(`http://localhost:3001/auth/employee/${id}`)
    .then(result => {
      console.log(result.data);
      setEmployee({
        ...employee, 
        name: result.data.Result[0].name,
        email: result.data.Result[0].email,
        address: result.data.Result[0].address,
        salary: result.data.Result[0].salary,
        category_id: result.data.Result[0].category_id,
      })
    }).catch(err => console.log(err))
}, [id]) // Add id to the dependency array to re-fetch data when id changes

function handleSubmit(e) {
    e.preventDefault();
    axios.put('http://localhost:3001/auth/edit_employee/'+id, employee)
    .then(result =>{
        console.log(result.data)
        if(result.data.Status){
            navigate('/dashboard/employee')
        }else{
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
}

  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
            <div className='p-3 rounded w-50 border '>
                <h2 className='text-center'>Add Employee</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12 '>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" className='form-control rounded-0' id='inputName' placeholder='Enter Employee Name' value={employee.name} onChange={(e)=> setEmployee({...employee, name: e.target.value})} />
                    </div>
                    <div className='col-12 '>
                        <label htmlFor="inputEmail" className='form-label'>Email</label>
                        <input type="email" className='form-control rounded-0' id='inputEmail' placeholder='Enter Employee Email' value={employee.email} autoComplete='off' onChange={(e)=> setEmployee({...employee, email: e.target.value})}/>
                    </div>
                    
                    <div className='col-12 '>
                        <label htmlFor="inputSalary" className='form-label'>Salary</label>
                        <input type="text" className='form-control rounded-0' id='inputSalary' placeholder='Enter Employee Salary' value={employee.salary} autoComplete='off' onChange={(e)=> setEmployee({...employee, salary: e.target.value})}/>
                    </div>
                    <div className='col-12 '>
                        <label htmlFor="inputAdress" className='form-label'>Address</label>
                        <input type="text" className='form-control rounded-0' id='inputAddress' placeholder='Enter Employee Address' value={employee.address} autoComplete='off' onChange={(e)=> setEmployee({...employee, address: e.target.value})}/>
                    </div>
                    <div className='col-12 '>
                        <label htmlFor="category" className='form-label'>Category</label>
                        <select name="category" id="category" className='form-select' onChange={(e)=> setEmployee({...employee, category_id: e.target.value})}>
                            {category.map((c,index) =>{
                                return <option key={index} value= {c.id} >{c.name}</option>
                            })}
                        </select>
                    </div>
                    
                    <div className='col-12 mb-3 '>
                        
                    <button type="submit" className='btn btn-primary w-100'>Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EditEmployee
