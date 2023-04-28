const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

// connection to the database

connection_host = "localhost";
connection_user = "root";
connection_password = "dayim";
connection_database = "crud_contact";

const db = mysql.createPool({
    host: connection_host,
    user: connection_user,
    password: connection_password,
    database: connection_database
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// getting the data from the database
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);

    });
});

// to add details

app.post("/api/post", (req, res) => {
    const {name, phone, school, myclass, rollNo, address} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name, phone, school, myclass, rollNo, address) VALUES (?, ?,?,?,?,?)";
    db.query(sqlInsert, [name, phone, school, myclass, rollNo, address], (error, result) => {
        if(error){
            console.log(error);
        }
    })
});


// to remove details

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Error deleting contact");
        } else {
            res.status(200).send("Contact deleted successfully");
        }
    })
});


// creating a home route to display stuff on home page

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('orhan', 'orhan@gmail.com', 279481 )";

    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("hello, express");
    // });
    
})

// setting up 5000 port to listen requests
app.listen(5000, ()=>{
    console.log("server is running on 5000")
})