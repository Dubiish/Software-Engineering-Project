var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'oakify'
});
connection.connect();

router.get("/", (req, res) => {
    res.send("Hello customer!");
});

router.get("/get/all", (req, res) => {
    connection.query("SELECT * FROM customers", (err, result) => {
        if(err) throw err;
        res.json({result});
    });
})

router.get("/get/:userid", (req, res) => {
    connection.query(`SELECT * FROM customers WHERE customer_id = ${req.params.userid}`, (err, result) => {
        if(err) throw err;
        res.json({result});
    });
});

router.post("/post/new", (req, res) => {
    res.json({
        name: req.query.name,
        surname: req.query.surname,
        street: req.query.street,
        city: req.query.city,
        country: req.query.county,
        postalCode: req.query.postal,
        telNum: req.query.tel,
        email: req.query.email,
        note: req.query.note
    });
});

module.exports = router;