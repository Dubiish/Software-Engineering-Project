var express = require('express');
var router = express.Router();

var Database = require("../settings");

// Database connection
const db = new Database;
const connection = db.connect();

// Add Customer
router.post("/add", (req, res) => {
    connection.query(`INSERT INTO customers 
    (customer_name, customer_surname, customer_addr, house_no, city, country, postcode, tel_number, email, note) 
    VALUES ${req.query.name}, ${req.query.surname}, ${req.query.addr}, ${req.query.houseNo}, ${req.query.city}, ${req.query.country}, ${req.query.postcode}, ${req.query.telNum}, ${req.query.email}, ${req.query.note};`, (err, result) => {
        if(err) {
            throw err;
            //res.status(400).end();
        } else {
            console.log("Customer added")
            res.json({result});
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

// GET SPECIFIC
router.get("/get/:customerid", (req, res) => {
    connection.query(`SELECT * FROM customers WHERE customer_id = ${req.params.customerid}`, (err, result) => {
        if(err) {
            throw err;
        } else {
            console.log(`Requested data about customer ${req.params.customerid}`);
            res.json({result});
            res.status(200).end();
        }
    })
})

// GET ALL
router.get("/get/all", (req, res) => {
    connection.query(`SELECT * FROM customers`, (err, result) => {
        if(err) {
            throw err;
        } else {
            console.log(`Request data about all customers`);
            res.json({result});
            res.status(200).end();
        }
    });
}) 

// GET TOP
router.get("/get/top", (req, res) => {
    connection.query(`SELECT customer_id FROM orders GROUP BY customer_id ORDER BY COUNT(*) DESC LIMIT 10`, (err, customers) => {
        if(err) {
            throw err;
        } else {
            let data = Array();
            for (const key in customers) {
                if (customers.hasOwnProperty(key)) {
                    const element = customers[key];
                    connection.query(`SELECT * FROM customers WHERE customer_id = ${element};`, (err, result) => {
                        if(err) {
                            throw err;
                        } else {
                            let customer = {
                                "customer_id" : result.customer_id,
                                "customer_name" : result.customer_name,
                                "customer_surname" : result.customer_surname,
                                "customer_addr" : result.customer_addr,
                                "house_no" : result.house_no,
                                "city" : result.house,
                                "country" : result.country,
                                "postcode" : result.postcode,
                                "tel_number" : result.tel_number,
                                "email" : result.email,
                                "note" : result.note
                            }
                            data.push(customer);
                        }
                    });
                }
            }
            console.log("Requested data about top customers");
            res.json({data}).status(200).end();
        }
    });
});

// Edit Customer
router.put("/edit/:customerid", (req, res) => {
    connection.query(`UPDATE customers WHERE customer_id = ${req.params.customerid}
    SET customer_name = ${req.query.customer_name},
    customer_surname = ${req.query.customer_surname},
    customer_addr = ${req.query.customer_addr},
    house_no = ${req.query.house_no},
    city = ${req.query.city},
    country = ${req.query.country},
    postcode = ${req.query.postcode},
    tel_number = ${req.query.tel_number},
    email = ${req.query.email},
    note = ${req.query.note};`, (err, result) => {
        if(err) {
            throw err;
        } else {
            console.log(`Edited customers with id ${req.params.customerid}`);
            res.json({result}).status(200).end();
        }
    });
});

module.exports = router;