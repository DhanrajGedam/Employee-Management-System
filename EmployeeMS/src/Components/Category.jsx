import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Category() {
    const [category, setCategory] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/auth/category')
        .then(result => {
            if(result.data.Status){
                setCategory(result.data.Result)
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    },[])
  return (
        <div className='px-5 mt-3 '>
            <div className='d-flex justify-content-center align-items-center'>
                <h3>Category List</h3>
            </div>
            <Link className='btn btn-success' to="/dashboard/add_category">Add Category</Link>
            <div className='mt-3 '>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((c,index) =>(
                                <tr key={index}> 
                                    <td ><em>{c.name}</em></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Category