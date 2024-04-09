import axios from 'axios'
import {React,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'

function AddEmployee() {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address:"",
        category_id: "",
        image:""

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
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append( "name", employee.name);
        formData.append( "email", employee.email);
        formData.append( "password", employee.password);
        formData.append( "address", employee.address);
        formData.append( "salary", employee.salary);
        formData.append( "image", employee.image);
        formData.append( "category_id", employee.category_id);
        axios.post('http://localhost:3001/auth/add_employee', formData)
        .then(result =>{
            if(result.data.Status) {
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
                <form className='row g-1'onSubmit={handleSubmit} >
                    <div className='col-12 '>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" className='form-control rounded-0' id='inputName' placeholder='Enter Employee Name' onChange={(e)=> setEmployee({...employee, name: e.target.value})} />
                    </div>
                    <div className='col-12 '>
                        <label htmlFor="inputEmail" className='form-label'>Email</label>
                        <input type="email" className='form-control rounded-0' id='inputEmail' placeholder='Enter Employee Email' autoComplete='off' onChange={(e)=> setEmployee({...employee, email: e.target.value})}/>
                    </div>
                    <div className='col-12 '>
                        <label htmlFor="inputPassword" className='form-label'>Password</label>
                        <input type="password" className='form-control rounded-0' id='inputPassword' placeholder='Enter Employee Password' onChange={(e)=> setEmployee({...employee, password: e.target.value})}/>
                    </div>
                    <div className='col-12 '>
                        <label htmlFor="inputSalary" className='form-label'>Salary</label>
                        <input type="text" className='form-control rounded-0' id='inputSalary' placeholder='Enter Employee Salary' autoComplete='off' onChange={(e)=> setEmployee({...employee, salary: e.target.value})}/>
                    </div>
                    <div className='col-12 '>
                        <label htmlFor="inputAdress" className='form-label'>Address</label>
                        <input type="text" className='form-control rounded-0' id='inputAddress' placeholder='Enter Employee Address' autoComplete='off' onChange={(e)=> setEmployee({...employee, address: e.target.value})}/>
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
                        <label htmlFor="inputGroupFile01" className='form-label'>Select Image</label>
                        <input type="file" className='form-control rounded-0' id='inputGroupFile01' name='image' onChange={(e)=> setEmployee({...employee, image: e.target.files[0]})}/>
                    </div>
                    <div className='col-12 mb-3 '>
                        
                    <button type="submit" className='btn btn-primary w-100'>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee