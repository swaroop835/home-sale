const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "houserental"
})

db.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database');
  });

//signup

app.post('/user',(req,res) => {
    const sql='INSERT INTO user(email,username,password,address,city) values(?,?,?,?,?)';
const values =[
    req.body.email,
    req.body.username,
    req.body.password,
    req.body.address,
    req.body.city,
];
db.query(sql, values,(err,data) => {
    if(err) return res.json(err)
    return res.json({ status: 'User added successfully', data });
})
})



// admin login
app.post('/admin', (req,res) =>{
    const sql = "select * from admin where username = ? and password = ?";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql,values,(err,data) =>{
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        if (data.length > 0) {
            console.log('Login successful:', data);
            return res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('Login failed: No record found');
            return res.json({ success: false, message: 'No record found' });
        }
    })
}) 

//user login

app.post('/user2', (req,res) =>{
    const sql = "select * from user where username = ? and password = ?";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql,values,(err,data) =>{
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
        if (data.length > 0) {
            console.log('Login successful:', data);
            return res.json({ success: true, message: 'Login successful' });
        } else {
            console.log('Login failed: No record found');
            return res.json({ success: false, message: 'No record found' });
        }
    })
}) 

//user listing

app.get('/user', (req, res) => {
    const sql = "SELECT username, email FROM user"; // Add more fields as needed
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, error: 'Internal server error' });
      }
      return res.json(data);
    });
  });
 

app.listen(8081, ()=>{
    console.log("listening.. go to port 8081");
})