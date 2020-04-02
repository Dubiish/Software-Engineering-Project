var express = require('express');
var router = express.Router();

var Database = require("../settings");

// Database connection
const db = new Database;
const connection = db.connect();

// ADD ORDER
router.post("/create/new", (req, res) => {
    connection.query(`INSERT INTO orders (customer_id, order_date, paid_upfront, total_price, note, book_num, status) 
    VALUES (${req.query.customer_id},
        ${req.query.order_date},
        ${req.query.paid_upfront},
        ${req.query.total_price},
        ${req.query.note},
        ${req.query.book_num},
        ${req.query.status});`, (err, result) => {
            if(err) {
                throw err;
            } else {
                res.json({result}).status(200).end();
                console.log(`New order created`);
            }
        });
});

// DELETE ORDER
router.delete("/delete/:orderId", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${req.params.orderId};`, (err, result) => {
        if(err) {
            throw err;
        } else {
            connection.query(`DELETE FROM orders WHERE order_id = ${req.params.orderId};`, (err, result) => {
                if(err) {
                    throw err;
                } else {
                    res.json({result}).status(200).end();
                    console.log(`Deleted order with id ${req.params.orderId}`);
                }
            })
        }
    })
});

// EDIT ORDER
router.put("/update/order/:orderid", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${req.params.orderid};`, (err, result) => {
        if(err) {
            throw err;
        } else {
            connection.query(`UPDATE orders WHERE order_id = ${req.params.orderid}
            SET customer_id = ${req.query.customer_id},
            order_date = ${req.query.order_date},
            paid_upfront = ${req.query.paid_upfront},
            total_price = ${req.query.total_price},
            note = ${req.query.note},
            book_num = ${req.query.book_num},
            status = ${req.query.status};`, (err, result) => {
                if(err) {
                    throw err;
                } else {
                    res.json({result}).status(200).end();
                    console.log(`Updated order ${req.params.orderid}`);
                }
            });
        }
    });
});

// CHANGE STATUS
router.put("/update/status/:orderid", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${req.params.orderid};`, (err, result) => {
        if(err) {
            throw err;
        } else {
            let status = result.status;
            if(status == 0) {
                status = 1 
            } else {
                status = 0;
            }
            connection.query(`UPDATE orders SET status = ${status} WHERE order_id = ${req.params.orderid};`, (err, result) => {
                if(err) {
                    throw err;
                } else {
                    res.json({result}).status(200).end();
                    console.log(`Changed order status of order ${req.params.orderid}`);
                }
            });
        }
    });
});
// GET SPECIFIC
router.get("/get/:orderid", (req, res) => {
    connection.query(`SELECT * FROM orders WHERE order_id = ${req.params.orderid};`, (err, result) => {
        if(err) {
            throw err;
        } else {
            res.json({result}).status(200).end();
            console.log(`Requested data of order ${req.params.orderid}`);
        }
    });
});

// GET ALL
router.get("/get/all", (req, res) => {
    connection.query(`SELECT * FROM orders;`, (err, result) => {
        if(err) {
            throw err;
        } else {
            res.json({result}).status(200).end();
            console.log(`Requested data of all orders`);
        }
    });
});

// GET STATUS SUM
router.get("/get/status/sum", (req, res) => {
    connection.query(`SELECT status, Count(status) AS count FROM orders GROUP BY status;`, (err, result) => {
        if(err) {
            throw err;
        } else {
            res.json({result}).status(200).end();
            console.log(`Requested status sum`);
        }
    });
});

module.exports = router;