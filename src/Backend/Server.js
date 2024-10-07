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
 
// Configure the multer storage for image files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images")); // Save images in the 'images' directory
  },
  filename: (req, file, cb) => {
    // Generate the current date in YYYY-MM-DD format
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
 
    // Remove any path-related characters (slashes) from the original name
    const sanitizedFilename = file.originalname.replace(/[\\/]/g, "");
 
    // Use the imagepath-[date]-originalfilename format
    cb(null, `${formattedDate}-${sanitizedFilename}`);
  },
});
 
// Configure multer to handle multiple image fields
const upload = multer({
  storage: storage,
});
 
// Add property details endpoint
// Add property details endpoint
app.post(
  "/AddProperty",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
    // Check if all 3 images were uploaded
    if (
      !req.files ||
      !req.files.image1 ||
      !req.files.image2 ||
      !req.files.image3
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All 3 images must be uploaded" });
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
 
    // Prepare image paths for storage
    const formatDate = new Date().toISOString().slice(0, 10);
    const basePath = `${formatDate}-`;
    const image1 = req.files?.image1 ? req.files.image1[0].filename : null;
    const image2 = req.files?.image2 ? req.files.image2[0].filename : null;
    const image3 = req.files?.image3 ? req.files.image3[0].filename : null;
 
    // Insert property details along with the image paths into the database
    const query = `
      INSERT INTO property 
      (house_no, place, district, bedroom, bathroom, description, price, squarefeet, status, furnishing, image1, image2, image3) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
 
    db.query(
      query,
      [
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
        image1,
        image2,
        image3,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting property details:", err);
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
        res
          .status(200)
          .json({ success: true, message: "Property added successfully" });
      }
    );
  }
);
 
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
// Endpoint to delete a property by house_no
app.delete("/property/:house_no", (req, res) => {
  const houseNo = req.params.house_no;
 
  // MySQL query to delete a property based on house_no
  const deleteQuery = "DELETE FROM property WHERE house_no = ?";
 
  db.query(deleteQuery, [houseNo], (err, result) => {
    if (err) {
      console.error("Error deleting property:", err);
      return res.json({ success: false, message: "Error deleting property" });
    }
 
    if (result.affectedRows === 0) {
      return res.json({
        success: false,
        message: "Property not found",
      });
    }
 
    res.json({ success: true, message: "Property deleted successfully" });
  });
});
 
// Update property details endpoint
app.put(
  "/updateProperty/:house_no",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (req, res) => {
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
 
    // Prepare image fields for update (use existing images if new ones aren't provided)
    const image1 = req.files?.image1 ? req.files.image1[0].filename : null;
    const image2 = req.files?.image2 ? req.files.image2[0].filename : null;
    const image3 = req.files?.image3 ? req.files.image3[0].filename : null;
 
    // Construct the SQL query for updating the property, including images
    const sql = `
      UPDATE property
      SET 
        place = ?,
        district = ?,
        bedroom = ?,
        bathroom = ?,
        description = ?,
        price = ?,
        squarefeet = ?,
        status = ?,
        furnishing = ?,
        image1 = COALESCE(?, image1),
        image2 = COALESCE(?, image2),
        image3 = COALESCE(?, image3)
      WHERE house_no = ?
    `;
 
    const values = [
      place,
      district,
      bedroom,
      bathroom,
      description,
      price,
      squarefeet,
      status,
      furnishing,
      image1, // Update image1 if provided, else use existing
      image2, // Update image2 if provided, else use existing
      image3, // Update image3 if provided, else use existing
      house_no,
    ];
 
    // Execute the query
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
  }
);
 
// Endpoint to get property details by house_no
app.get("/getProperty", (req, res) => {
  const house_no = req.query.house_no; // Getting the house_no from query parameters
 
  // Query to select the necessary property details based on house_no
  const sql = `
    SELECT 
      image1, image2, image3, 
      description, price, place, 
      district, bedroom, bathroom, 
      status, furnishing, squarefeet 
    FROM property 
    WHERE house_no = ?
  `;
 
  db.query(sql, [house_no], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error occurred." });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Property not found." });
    }
 
    res.json(result); // Sending the property details as a response
  });
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
 
// Endpoint to disapprove a booking
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
 
// Endpoint to update booking reason
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
 
app.get("/getPropertyDetails/:house_no", (req, res) => {
  const houseNo = req.params.house_no;
 
  const query = `
    SELECT image1, price, place, district 
    FROM property
    WHERE house_no = ?`;
 
  db.query(query, [houseNo], (err, results) => {
    if (err) {
      console.error("Error fetching property details:", err);
      res.status(500).json({ error: "Error fetching property details" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Property not found" });
    } else {
      console.log(results[0]); // Log the response to see if the image URL is correct
      res.json(results[0]);
    }
  });
});
 
app.listen(8081, () => {
  console.log("Listening on port 8081");
});