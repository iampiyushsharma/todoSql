
const express = require('express');

const mysql = require('mysql');

const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12664828",
    password: "aYMWk1wBEA",
    database: "sql12664828"
});



// Create a new task
app.post('/', (req, res) => {
    console.log(req.body)
    const  serialN = Math.random()*1000000;
    var sql = `INSERT INTO task (id, title) VALUES ('${serialN}', '${req.body.title}')`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error creating task:", err);
            res.status(500).send("Error creating task");
        } else {
            console.log("Task created successfully");
            res.status(201).send("Task created successfully");
        }
    });
});
//update

app.patch('/', (req, res) => {
    console.log(req.body)
    
    var sql = `UPDATE task SET title = '${req.body.title}' WHERE id = '${req.body.id}'`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error creating task:", err);
            res.status(500).send("Error updating task");
        } else {
            console.log("Task updated successfully");
            res.status(201).send("Task updated successfully");
        }
    });
});

// Get all tasks
app.get('/', (req, res) => {
    var sql = "SELECT * FROM task";
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error retrieving tasks:", err);
            res.status(500).send("Error retrieving tasks");
        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
});



// Delete a task
app.delete('/', (req, res) => {
    console.log(req.body.id);
    var sql = `DELETE FROM task WHERE id = ${req.body.id}`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error deleting task:", err);
            res.status(500).send("Error deleting task");
        } else {
            console.log("Task deleted successfully");
            res.status(200).send("Task deleted successfully");
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to MySQL!");
    });
});
