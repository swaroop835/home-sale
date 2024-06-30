const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "houserental",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

//signup

app.post("/usersignup", (req, res) => {
  const sql =
    "INSERT INTO user(email,username,password,phoneno,place) values(?,?,?,?,?)";
  const values = [
    req.body.email,
    req.body.username,
    req.body.password,
    req.body.phoneno,
    req.body.place,
  ];
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json({ status: "User added successfully", data });
  });
});

// admin login
app.post("/admin", (req, res) => {
  const sql = "select * from admin where username = ? and password = ?";
  const values = [req.body.username, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
    if (data.length > 0) {
      console.log("Login successful:", data);
      return res.json({ success: true, message: "Login successful" });
    } else {
      console.log("Login failed: No record found");
      return res.json({ success: false, message: "No record found" });
    }
  });
});

//user login

app.post("/userlogin", (req, res) => {
  const sql = "select * from user where username = ? and password = ?";
  const values = [req.body.username, req.body.password];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
    if (data.length > 0) {
      console.log("Login successful:", data);
      return res.json({ success: true, message: "Login successful" });
    } else {
      console.log("Login failed: No record found");
      return res.json({ success: false, message: "No record found" });
    }
  });
});

//user listing

app.get("/userlisting", (req, res) => {
  const sql = "SELECT username, email, phoneno FROM user";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
    return res.json(data);
  });
});

// Delete user listing endpoint
app.delete("/userlisting/:email", (req, res) => {
  const email = req.params.email;
  const sql = "DELETE FROM user WHERE email=?";
  const values = [email];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
    if (data.affectedRows === 1) {
      return res.json({ success: true, message: "User deleted successfully" });
    } else {
      return res.json({ success: false, message: "No user found" });
    }
  });
});

//add Property

app.post("/addproperty", (req, res) => {
  const sql =
    "INSERT INTO property(place,type,bedroom,bathroom,description,city) values(?,?,?,?,?,?)";
  const values = [
    req.body.place,
    req.body.type,
    req.body.bedroom,
    req.body.bathroom,
    req.body.description,
    req.body.city,
  ];
  db.query(sql, values, (err, data) => {
    if (err) return res.json(err);
    return res.json({ status: "property added successfully", data });
  });
});


//feedback

app.post('/submit-feedback', (req, res) => {
  const { username, feedback } = req.body;

  const query = 'INSERT INTO feedback (username, feedback) VALUES (?, ?)';
  db.query(query, [username, feedback], (error, results) => {
      if (error) {
          res.status(500).send('Error saving feedback');
      } else {
          res.status(200).send('Feedback saved successfully');
      }
  });
});

//Feedback listing

app.get('/feedback', (req, res) => {
  const sql = 'SELECT * FROM feedback';
  db.query(sql, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});



app.listen(8081, () => {
  console.log("listening.. go to port 8081");
});
