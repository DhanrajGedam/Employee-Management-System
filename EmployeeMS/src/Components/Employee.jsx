import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



function Employee() {
    const [employee, setEmployee] = useState([])
 
    useEffect(()=>{
        axios.get('http://localhost:3001/auth/employee')
        .then(result => {
            if(result.data.Status){
                setEmployee(result.data.Result)
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    },[])
     
    const handleDelete = (id)=>{
        axios.delete('http://localhost:3001/auth/delete_employee/'+id)
        .then(result =>{
            if(result.data.Status){
                window.location.reload()
            }else{
                alert(result.data.Error)
            }
        })
    }
    return (
        <div className='px-5 mt-3 '>
            <div className='d-flex justify-content-center align-items-center'>
                <h3>Employee List</h3>
            </div>
            <Link className='btn btn-success' to="/dashboard/add_employee">Add Employee</Link>
            <div className='mt-3 '>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employee.map((e,index) =>(
                                <tr key={index} className='my-auto'> 
                                    <td ><em>{e.name}</em></td>
                                    <td ><img src={`http://localhost:3001/images/`+ e.image} className='employee_image'/></td>
                                    <td><em>{e.email}</em></td>
                                    <td><em>{e.address}</em></td>
                                    <td><em>{e.salary}</em></td>
                                    <td>
                                    <Link to={`/dashboard/edit_employee/`+e.id} className='btn btn-info btn-sm me-2'><em>Edit</em></Link>
                                        <button onClick={() => handleDelete(e.id)} className='btn btn-warning btn-sm'><em>Delete</em></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Employee