import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "new_root",
    password: "root",
    database: "employeems"
})

con.connect(function(err){
    if(err){
        console.log(err, "Error to Connect with Database")
    }else{
        console.log("Connected to Database")
    }
})
export default con;