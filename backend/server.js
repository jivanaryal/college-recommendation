const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Setup file storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Corrected destination path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appends extension of the original file
  },
});
const upload = multer({ storage });

// Create MySQL database connection using mysql2
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jivan', // Set your MySQL password here
  database: 'college_recommendation',
  port: 3306, // Default MySQL port
});

// Connect to database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL Database...');
});

// Create tables if not already created
const createTables = () => {
  const createCollegeTable = `
    CREATE TABLE IF NOT EXISTS colleges (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      min_cgpa FLOAT NOT NULL,
      tuition_fees DECIMAL(10, 2) NOT NULL,
      programs TEXT,
      facilities TEXT,
      photos VARCHAR(255)
    )`;

  const createStudentTable = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      cgpa FLOAT NOT NULL,
      college_id INT,
      FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE SET NULL
    )`;

  db.query(createCollegeTable, (err, result) => {
    if (err) throw err;
    console.log('Colleges table created or already exists');
  });

  db.query(createStudentTable, (err, result) => {
    if (err) throw err;
    console.log('Students table created or already exists');
  });
};

// Initialize tables on server start
createTables();

// API to add a new college
app.post('/addCollege', upload.single('photo'), (req, res) => {
  const { name, location, min_cgpa, tuition_fees, programs, facilities } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO colleges (name, location, min_cgpa, tuition_fees, programs, facilities, photos) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [name, location, min_cgpa, tuition_fees, programs, facilities, photo];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send({ success: true, message: 'College added successfully!' });
  });
});

app.get('/college/:id', (req, res) => {
  const collegeId = req.params.id; // Get the college ID from the request parameters
  const sql = 'SELECT * FROM colleges WHERE id = ?';

  db.query(sql, [collegeId], (err, results) => {
    if (err) throw err;

    // Check if the college exists
    if (results.length === 0) {
      return res.status(404).send({ success: false, message: 'College not found' });
    }

    res.send(results[0]); // Return the first (and only) college found
  });
});app.get('/colleges/:id', (req, res) => {
  const collegeId = req.params.id; // Get the college ID from the request parameters
  const sql = 'SELECT * FROM colleges WHERE id = ?';

  db.query(sql, [collegeId], (err, results) => {
    if (err) throw err;

    // Check if the college exists
    if (results.length === 0) {
      return res.status(404).send({ success: false, message: 'College not found' });
    }

    res.send(results[0]); // Return the first (and only) college found
  });
});

// API to add a student
app.post('/addStudent', (req, res) => {
  const { name, cgpa, college_id } = req.body; // Accept college_id from the request
  const sql = `INSERT INTO students (name, cgpa, college_id) VALUES (?, ?, ?)`;

  db.query(sql, [name, cgpa, college_id], (err, result) => {
    if (err) throw err;
    res.send({ success: true, message: 'Student added successfully!' });
  });
});

// API to filter colleges by CGPA, tuition fees, and facilities
app.get('/filterColleges', (req, res) => {
  const { cgpa, tuition_fees, facilities } = req.query;

  // Base query
  let sql = 'SELECT * FROM colleges WHERE min_cgpa <= ?';
  let queryParams = [cgpa];

  // Add filtering by tuition fees if specified
  if (tuition_fees) {
    sql += ' AND tuition_fees <= ?';
    queryParams.push(tuition_fees);
  }

  // Add filtering by facilities if specified
  if (facilities) {
    sql += ' AND facilities LIKE ?';
    queryParams.push(`%${facilities}%`);
  }

  db.query(sql, queryParams, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// API to get colleges sorted by highest CGPA and lowest tuition fees
app.get('/colleges', (req, res) => {
  const sql = `
    SELECT * FROM colleges
    ORDER BY min_cgpa DESC, tuition_fees ASC
  `;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// API to get all students with their respective colleges
app.get('/students', (req, res) => {
  const sql = `
    SELECT students.id, students.name, students.cgpa, colleges.name AS college_name
    FROM students
    LEFT JOIN colleges ON students.college_id = colleges.id
  `;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Server listening
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
