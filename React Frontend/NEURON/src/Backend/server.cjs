const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "hope623THINIJA",  
    database: "neuron",  
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// Sign-Up Route
app.post("/signup", (req, res) => {
    const { fullName, email, password } = req.body;

    const query = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
    db.query(query, [fullName, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error while signing up" });
        }
        res.status(201).json({ message: "User registered successfully" });
    });
});

// Sign-In Route
app.post("/signin", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
        if (results.length > 0) {
            const user = {
                fullName: results[0].fullname,
                email: results[0].email
            };
            res.status(200).json({ message: "Login successful", user });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

app.post("/update-password", (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ error: "Missing email or new password" });
    }

    const query = "UPDATE users SET password = ? WHERE email = ?";
    db.query(query, [newPassword, email], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "Password updated successfully" });
    });
});

// Feedback Submission Route
app.post("/submit-feedback", (req, res) => {
    const { q1, q2, q3, q4 } = req.body;

    if (!q1 || !q2 || !q3 || !q4) {
        return res.status(400).json({ error: "All feedback questions are required" });
    }

    const query = "INSERT INTO feedback (Q1, Q2, Q3, Q4) VALUES (?, ?, ?, ?)";
    db.query(query, [q1, q2, q3, q4], (err, result) => {
        if (err) {
            console.error("Error inserting feedback:", err);
            return res.status(500).json({ error: "Failed to save feedback" });
        }
        res.status(201).json({ message: "Feedback submitted successfully" });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
