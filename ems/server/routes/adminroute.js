import express from 'express';
import con from '../utils/db.js';
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Admin login
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from admin where email=?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Email or password error" });
        if (result.length > 0) {
            const user = result[0];
            // Compare the hashed password
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) return res.json({ loginStatus: false, Error: "Email or password error" });
                if (isMatch) {
                    const email = user.email;
                    const token = jwt.sign(
                        { role: "admin", email: email ,id:result[0].id},
                        "jwt_secret_key",
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token);
                    return res.json({ loginStatus: true });
                } else {
                    return res.json({ loginStatus: false, Error: "Wrong email or password" });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

// Admin registration
// Admin registration
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Check if the email already exists
    const checkSql = "SELECT * from admin where email=?";
    con.query(checkSql, [email], (err, result) => {
        if (err) return res.json({ registerStatus: false, Error: "Error checking email" });
        if (result.length > 0) {
            return res.json({ registerStatus: false, Error: "Email already in use" });
        } else {
            // Hash the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.json({ registerStatus: false, Error: "Error hashing password" });

                // Insert the new user into the database
                const insertSql = "INSERT INTO admin (email, password) VALUES (?, ?)";
                con.query(insertSql, [email, hashedPassword], (err, result) => {
                    if (err) {
                        console.error("Error details:", err);  // Log the error details
                        return res.json({ registerStatus: false, Error: "Error registering user" });
                    }
                    return res.json({ registerStatus: true });
                });
            });
        }
    });
});

// Example in an Express route
// Backend route: /category
router.get('/category', (req, res) => {
    con.query('SELECT * FROM category', (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ status: false, Error: 'Database query error' });
      }
      res.json({ status: true, category: results });
    });
  });
  
  

router.post('/add_category',(req,res)=>{
     const sql="INSERT INTO category (`name`) VALUES (?)"
     con.query(sql,[req.body.category],(err,result)=>{
        if(err) return res.json({status:false,Error:"Query Error"})
        return res.json({status:true})
        })
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'Public/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.filename+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
})

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name, email, password, address, salary, image, category_id) 
    VALUES (?)`;

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ status: false, Error: "Query Error" });

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id
        ];

        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ status: false, Error: err });
            return res.json({ status: true });
        });
    });
});


// Node.js/Express route example

// In your Express route for fetching employees
router.get('/employee', (req, res) => {
  const query = `
    SELECT employee.id, employee.name AS employee_name, employee.image, employee.email, employee.address, employee.salary, category.name AS category_name
    FROM employee 
    LEFT JOIN category ON employee.category_id = category.id
  `;

  con.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ status: false, Error: 'Failed to fetch employees.' });
    }

    res.status(200).json({ status: true, Result: result });
  });
});



router.get('/employee/:id',(req,res)=>{
    const id=req.params.id;
    con.query('SELECT * FROM employee WHERE id=?',[id] ,(error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ status: false, Error: 'Database query error' });
        }
        console.log('Employee Query Results:', results);  // Log the query results
        res.json({ status: true, Result: results });
      });
})
  
router.put('/edit_employee/:id',(req,res)=>{
const id=req.params.id;
const sql=`UPDATE employee 
set name=?,email=?,salary=?,address=?,category_id=? 
WHERE id=?`
const values = [
    req.body.name,
    req.body.email,
    req.body.salary, 
    req.body.address,
    req.body.category_id
];
con.query(sql,[...values,id] ,(error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ status: false, Error: 'Database query error' });
    }
    console.log('Employee Query Results:', results);  // Log the query results
    res.json({ status: true, Result: results });
  });
})

router.delete('/delete_employee/:id',(req,res)=>{
    const id=req.params.id;
    const sql="DELETE FROM employee WHERE id=?"
    con.query(sql,[id] ,(error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ status: false, Error: 'Database query error' });
        }
        console.log('Employee Query Results:', results);  // Log the query results
        res.json({ status: true, Result: results });
      });
})

router.get('/admin_count',(req,res)=>{
    const sql="SELECT count(id) as admin from admin";
    con.query(sql,(error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ status: false, Error: 'Database query error' });
        }
        console.log('Employee Query Results:', results);  // Log the query results
        res.json({ status: true, Result: results });
      });
})

router.get('/employee_count',(req,res)=>{
    const sql="SELECT count(id) as employee from employee";
    con.query(sql,(error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ status: false, Error: 'Database query error' });
        }
        console.log('Employee Query Results:', results);  // Log the query results
        res.json({ status: true, Result: results });
      });
})

router.get('/salary_count',(req,res)=>{
    const sql="SELECT sum(salary) as salary from employee";
    con.query(sql,(error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ status: false, Error: 'Database query error' });
        }
        console.log('Employee Query Results:', results);  // Log the query results
        res.json({ status: true, Result: results });
      });
})

router.get('/admin_records',(req,res)=>{
    const sql="SELECT * from admin";
    con.query(sql,(error, results) => {
        if (error) {
          console.error('Database query error:', error);
          return res.status(500).json({ status: false, Error: 'Database query error' });
        }
        console.log('Employee Query Results:', results);  // Log the query results
        res.json({ status: true, Result: results });
      });
})

router.delete('/delete_admin/:id',(req,res)=>{
  const id=req.params.id;
  const sql="DELETE FROM admin WHERE id=?"
  con.query(sql,[id] ,(error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ status: false, Error: 'Database query error' });
      }
      console.log('Employee Query Results:', results);  // Log the query results
      res.json({ status: true, Result: results });
    });
})

router.get('/logout',(req,res)=>{
  res.clearCookie('token')
  return res.json({status:true})
})

export { router as adminRouter };
