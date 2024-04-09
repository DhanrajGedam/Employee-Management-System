import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import { Employeerouter } from "./Routes/EmployeeRoute.js";
import Jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";



const app = express();

// Enable CORS for specific origin and methods
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.options('/auth/adminlogin', cors(corsOptions)); // Handling OPTIONS preflight request

app.use(cors(corsOptions)); // Use CORS middleware for all routes

app.use(express.json()); // for parsing application/json
app.use(cookieParser())
app.use('/auth', adminRouter);
app.use('/employee', Employeerouter)
app.use(express.static('Public'))

const verifyUser = (req, res, next)=>{
    const token = req.cookies.token
    if(token){
        Jwt.verify(token, "jwt_secret_key", (err, decoded)=>{
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id
            req.role = decoded.role
        })
    }else{
        return res.json({Status: false, Error: "Not Authenticated"})
    }
}
app.get('/verify', verifyUser, (req, res) =>{
    return res.json({Status: true, role: req.role, id: req.id})
} )

app.listen(3001, () => {
    console.log("Connected to Database");
    console.log("Happy Coding :)");
});
