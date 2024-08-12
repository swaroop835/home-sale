const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const { log } = require("console");

const app = express();
app.use(express.json());
app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  method: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the images directory
app.use("/images", express.static(path.join(__dirname, "images")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "houserental",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Signup endpoint
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

// Admin login endpoint
app.post("/admin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
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

// User login endpoint
app.post("/userlogin", (req, res) => {
  const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
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

// User listing endpoint
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

// Add property details endpoint
app.post("/AddProperty", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const {
    house_no,
    place,
    district,
    bedroom,
    bathroom,
    description,
    price,
    squarefeet,
    status,
    furnishing,
  } = req.body;

  // Log the received data
  console.log(req.file);
  console.log("File upload successful");

  const sql = `
    INSERT INTO property (image, house_no, place, district, bedroom, bathroom, description, price, squarefeet, status, furnishing) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    req.file.filename,
    house_no,
    place,
    district,
    bedroom,
    bathroom,
    description,
    price,
    squarefeet,
    status,
    furnishing,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
    return res.json({
      success: true,
      message: "Property added successfully",
      data,
    });
  });
});

//feedback

app.post("/submit-feedback", (req, res) => {
  const { username, feedback } = req.body;

  const query = "INSERT INTO feedback (username, feedback) VALUES (?, ?)";
  db.query(query, [username, feedback], (error, results) => {
    if (error) {
      res.status(500).send("Error saving feedback");
    } else {
      res.status(200).send("Feedback saved successfully");
    }
  });
});

//Feedback listing

app.get("/feedback", (req, res) => {
  const sql = "SELECT * FROM feedback";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Display all properties
app.get("/properties", (req, res) => {
  const sql = "SELECT * FROM property";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//display using id
app.get("/getProperty", (req, res) => {
  const house_no = req.query.house_no;
  const sql = "SELECT * FROM property WHERE house_no = ?";
  db.query(sql, [house_no], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log(result);
    res.json(result);
  });
  //booking
  app.post("/bookProperty", (req, res) => {
    const { username, house_no, booking_date, time_slot } = req.body;
    console.log(username);
    const query =
      "INSERT INTO bookings (username, house_no, booking_date, time_slot) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [username, house_no, booking_date, time_slot],
      (err, result) => {
        if (err) {
          console.error("Error booking property:", err);
          res.status(500).send("Error booking property");
        } else {
          res.status(200).send("Booking confirmed");
        }
      }
    );
  });
});

// Update property details endpoint
app.put("/updateProperty/:house_no", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const { house_no } = req.params;
  const {
    place,
    district,
    bedroom,
    bathroom,
    description,
    price,
    squarefeet,
    status,
    furnishing,
  } = req.body;

  const sql = `
    UPDATE property
    SET 
      image = ?,
      place = ?,
      district = ?,
      bedroom = ?,
      bathroom = ?,
      description = ?,
      price = ?,
      squarefeet =?,
      status = ?,
      furnishing =?

    WHERE house_no = ?
  `;

  const values = [
    req.file.filename,
    place,
    district,
    bedroom,
    bathroom,
    description,
    price,
    squarefeet,
    status,
    furnishing,
    house_no,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
    return res.json({
      success: true,
      message: "Property updated successfully",
      data,
    });
  });
});

app.get("/getBookings", (req, res) => {
  const query = `
    SELECT username, house_no, booking_date, time_slot, reason, status 
    FROM bookings 
    ORDER BY booking_date DESC, time_slot ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      res.status(500).send("Error fetching bookings");
    } else {
      res.status(200).json(results);
    }
  });
});

app.delete("/deleteBooking", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query = `
    DELETE FROM bookings 
    WHERE username = ?
  `;

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error deleting booking:", err);
      res.status(500).send("Error deleting booking");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Booking not found");
    } else {
      res.status(200).send("Booking deleted");
    }
  });
});
// Approve booking
app.post("/approveBooking", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query = `
    UPDATE bookings 
    SET status = 'Approved', reason = 'nil'
    WHERE username = ?
  `;

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error approving booking:", err);
      res.status(500).json({ error: "Error approving booking" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Booking not found" });
    } else {
      res.status(200).json({ message: "Booking approved" });
    }
  });
});

// Disapprove booking
app.post("/disapproveBooking", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query = `
    UPDATE bookings 
    SET status = 'Disapproved'
    WHERE username = ?
  `;

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error disapproving booking:", err);
      res.status(500).send("Error disapproving booking");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Booking not found");
    } else {
      res.status(200).send("Booking disapproved");
    }
  });
});

app.post("/updateBookingReason", (req, res) => {
  const { username, reason } = req.body;

  if (!username || !reason) {
    return res.status(400).send("Username and reason are required");
  }

  const query = `
    UPDATE bookings 
    SET reason = ? 
    WHERE username = ?
  `;

  db.query(query, [reason, username], (err, result) => {
    if (err) {
      console.error("Error updating booking reason:", err);
      res.status(500).send("Error updating booking reason");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Booking not found");
    } else {
      res.status(200).send("Booking reason updated");
    }
  });
});

// Get booking by username
app.get("/getBooking", (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  const query = "SELECT * FROM bookings WHERE username = ?";

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error fetching booking:", err);
      res.status(500).send("Error fetching booking");
    } else if (result.length === 0) {
      res.status(404).send("Booking not found");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
