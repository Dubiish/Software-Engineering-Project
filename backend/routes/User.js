var express = require('express');
var router = express.Router();
var Database = require("../settings");

// Database connection
const db = new Database;
const connection = db.connect();

// Hash library
const crypto = require("crypto")

// ADD USER
router.post("/add", (req, res) => {
    let hash = crypto.createHash("sha256");
    hash = hash.update(req.query.password);
    hash = hash.digest("hex");
    connection.query(`INSERT INTO users (user_name, user_password, status) VALUES ("${req.query.name}", "${hash}", "${req.query.status}")`, (err) => {
        if (err) {
            res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// GET ALL USERS
router.get("/get/all", (req, res) => {
    console.log("Getting all user data");
    connection.query(`SELECT user_id, user_name, status FROM users;`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
            res.end();
        }
    });
});

// GET USER
router.get("/get/:userid", (req, res) => {
    console.log(`Getting user data of user: ${req.params.userid}`);
    connection.query(`SELECT user_id, user_name, status FROM users WHERE user_id = ${parseInt(req.params.userid)};`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).end();
        } else {
            res.status(200);
            res.json(result);
            res.end();
        }
    });
});

// EDIT USER
router.put("/edit/:userid", (req, res) => {
    console.log(`Editing data of user: ${req.params.userid}`);
    connection.query(`SELECT user_id FROM users WHERE user_id = ${parseInt(req.params.userid)};`, (err, resut) => {
        if (err) {
            console.log(`User with ID: ${req.params.userid} does not exist!`);
            res.status(404).end();
        } else {
            connection.query(`UPDATE users SET user_name = "${req.query.username}", status = ${req.query.status} WHERE user_id = ${parseInt(req.params.userid)} ;`, (err) => {
                if (err) {
                    console.log(err);
                    res.status(404).end();
                } else {
                    res.status(200).end();
                }
            });
        }
    });
});

// DELETE USER
router.delete("/delete/:userid", (req, res) => {
    console.log(`Deleting user: ${req.params.userid}`);
    connection.query(`SELECT user_id FROM users WHERE user_id = ${parseInt(req.params.userid)};`, (err, result) => {
        if (err) {
            console.log(`User with id ${req.params.userid} does not exist!`);
            res.status(404).end();
        } else {
            connection.query(`DELETE from users WHERE user_id = ${parseInt(req.params.userid)};`, (err, result) => {
                console.log("User successfuly deleted!");
                res.status(200).end();
            });
        }
    })
})
// VERIFY USER



// DEFAULT
router.all("/", (req, res) => {
    res.send("Incorrect request!");
});

module.exports = router;