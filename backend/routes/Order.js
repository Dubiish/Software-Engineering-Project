var express = require('express');
var router = express.Router();

var Database = require("../settings");

// Database connection
const db = new Database;
const connection = db.connect();

// ADD ORDER
router.post("/create/new", (req, res) => {
    connection.query(`INSERT INTO orders (customer_id, order_date, paid_upfront, total_price, note, book_number, status) VALUES (${req.body.customer_id}, "${req.body.order_date}", ${req.body.paid_upfront}, ${req.body.total_price}, "${req.body.note}", ${req.body.book_number}, ${req.body.status});`, (err, result) => {
        if (err) {
            res.status(404).end();
        } else {
            res.json({ result }).status(200).end();
            console.log(`New order created`);
        }
    });
});

// DELETE ORDER
router.delete("/delete/:orderId", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${req.params.orderId};`, (err, result) => {
        if (err) {
            throw err;
        } else {
            connection.query(`DELETE FROM orders WHERE order_id = ${req.params.orderId};`, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.json({ result }).status(200).end();
                    console.log(`Deleted order with id ${req.params.orderId}`);
                }
            })
        }
    })
});

// EDIT ORDER
router.post("/update/order/:orderid", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${req.params.orderid};`, (err, result) => {
        if (err) {
            throw err;
        } else {
            connection.query(`UPDATE orders SET customer_id = ${req.body.customer_id}, order_date = "${req.body.order_date}", paid_upfront = ${req.body.advance_payment}, total_price = ${req.body.total_price}, note = "${req.body.note}", book_number = ${req.body.book_number}, status = ${req.body.status} WHERE order_id = ${req.params.orderid};`, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.json(result).status(200).end();
                    console.log(`Updated order ${req.params.orderid}`);
                }
            });
        }
    });
});

// CHANGE STATUS
router.post("/update/status/:orderid", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${parseInt(req.params.orderid)};`, (err, result) => {
        if (err) {
            throw err;
        } else {
            let status = result.status;
            if (status == 0) {
                status = 1;
            } else {
                status = 0;
            }
            connection.query(`UPDATE orders SET status = ${status} WHERE order_id = ${req.params.orderid};`, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.json({ result }).status(200).end();
                    console.log(`Changed order status of order ${req.params.orderid}`);
                }
            });
        }
    });
});

// GET ALL
router.get("/get/all", (req, res) => {
    connection.query(`SELECT * FROM orders;`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result).status(200).end();
            console.log(`Requested data of all orders`);
        }
    });
});



// GET STATUS SUM
router.get("/get/status/sum", (req, res) => {
    connection.query(`SELECT status, Count(status) AS count FROM orders GROUP BY status;`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result).status(200).end();
            console.log(`Requested status sum`);
        }
    });
});

// Get count of orders
router.get("/get/count", (req, res) => {
    connection.query(`SELECT Count(order_id) AS count FROM orders;`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result).status(200).end();
            console.log("Requested count of orders");
        }
    })
});

// Get profit sum for last 30 days
router.get("/get/profit/sum", (req, res) => {
    connection.query("SELECT SUM(total_price) AS profit FROM orders WHERE DATEDIFF(order_date, CURDATE()) <= 30;", (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            res.json(result).status(200).end();
            console.log("Requested sum of profit");
        }
    })
});

// GET SPECIFIC
router.get("/get/:orderid", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${req.params.orderid};`, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.json(result).status(200).end();
            console.log(`Requested data of order ${req.params.orderid}`);
        }
    });
});

module.exports = router;