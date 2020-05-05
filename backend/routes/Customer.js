var express = require('express');
var router = express.Router();

var Database = require("../settings");

// Database connection
const db = new Database;
const connection = db.connect();

// Add Customer
router.post("/add", (req, res) => {
    console.log(req.body);
    connection.query(`INSERT INTO customers (customer_name, customer_surname, street_name, house_number, city, country, post_code, phone_number, email, note) VALUES ("${req.body.name}", "${req.body.surname}", "${req.body.street}", "${req.body.houseNumber}", "${req.body.city}", "${req.body.country}", "${req.body.postCode}", "${req.body.phoneNumber}", "${req.body.email}", "${req.body.note}");`, (err, result) => {
        if(err) {
            throw err;
        } else {
            console.log("Customer added")
            res.json(result);//
            res.status(200).end();
        }
    });
});


// Delete Customer
router.delete("/delete/:customerid", (req, res) => {
    connection.query(`SELECT * FROM customers WHERE customer_id = ${req.params.customerid};`, (err, result) => {
        if(err) {
            throw err;
        } else {
            connection.query(`DELETE from customers WHERE customer_id = ${req.params.customerid};`, (err, result) => {
                if(err) {
                    throw err;
                } else {
                    console.log("Customer deleted")
                    res.status(200).end();
                }
            })
        }
    });
});

// GET ALL
router.get("/get/all", (req, res) => {
    connection.query("SELECT * FROM customers", (err, result) => {
        if(err) {
            throw err;
        } else {
            console.log(`Request data about all customers`);
            res.json(result).status(200).end();
        }
    });
})

// GET TOP
router.get("/get/top", (req, res) => {
    connection.query(`SELECT customer_id FROM orders GROUP BY customer_id ORDER BY COUNT(*) DESC LIMIT 10`, (err, customers) => {
        if(err) {
            throw err;
        } else {
            var data = new Array();
            customers.forEach(element => {
                console.log(element.customer_id);
                connection.query(`SELECT * FROM customers WHERE customer_id = ${parseInt(element.customer_id)};`, (err, result) => {
                    if(err) {
                        throw err;
                    } else {
                        data.push(...result);
                    }
                });
            });
            console.log("Requested data about top customers");
            res.json({data}).status(200).end();
        }
    });
});

// Edit Customer
router.post("/edit/:customerid", (req, res) => {
    connection.query(`UPDATE customers SET customer_name = "${req.body.customer_name}", customer_surname = "${req.body.customer_surname}", street_name = "${req.body.customer_addr}", house_number = "${req.body.house_no}", city = "${req.body.city}", country = "${req.body.country}", post_code = "${req.body.postcode}", phone_number = "${req.body.tel_number}", email = "${req.body.email}", note = "${req.body.note}" WHERE customer_id = ${req.params.customerid} ;`, (err, result) => {
        if(err) {
            throw err;
        } else {
            console.log(`Edited customers with id ${req.params.customerid}`);
            res.json({result}).status(200).end();
        }
    });
});

// Get count of customers
router.get("/get/count", (req, res) => {
    connection.query("SELECT Count(customer_id) AS Count FROM customers;", (err, result) => {
        if(err) {
            throw err;
        } else {
            res.json(result).status(200).end();
            //console.log("Requested count of customers")
        }
    });
});

// GET SPECIFIC
router.get("/get/:customerid", (req, res) => {
    connection.query(`SELECT * FROM customers WHERE customer_id = ${parseInt(req.params.customerid)};`, (err, result) => {
        if(err) {
            throw err;
        } else {
            console.log(`Requested data about customer ${req.params.customerid}`);
            res.json(result);
            res.status(200).end();
        }
    })
})

module.exports = router;