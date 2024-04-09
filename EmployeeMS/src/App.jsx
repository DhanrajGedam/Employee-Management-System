import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import PrivateRoute from './Components/PrivateRoute';


function App() {
  
    
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element= {<Start />}></Route>
      <Route path='/adminlogin' exact element= {<Login />}/>
      <Route path='/employee_login' exact element= {<EmployeeLogin />}/>
      <Route path='/employee_detail/:id' exact element= {<EmployeeDetail/> }/>

      <Route path='/dashboard' exact element={
      <PrivateRoute>
          <Dashboard/>
      </PrivateRoute>
      }> 
        <Route path=''  exact element= {<Home/> }/>
        <Route path='/dashboard/employee' exact element= {<Employee/> }/>
        <Route path='/dashboard/category' exact element= {<Category/> }/>
        <Route path='/dashboard/profile' exact element= {<Profile/> }/>
        <Route path='/dashboard/add_category' exact element= {<AddCategory/> }/>
        <Route path='/dashboard/add_employee' exact element= {<AddEmployee/> }/>
        <Route path='/dashboard/edit_employee/:id' exact element= {<EditEmployee/> }/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
