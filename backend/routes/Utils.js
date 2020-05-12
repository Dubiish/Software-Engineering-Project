var express = require('express');
var router = express.Router();

var mysqldump = require("mysqldump");
var fs = require("fs");
var Database = require("../settings");

router.get("/get/export/all", (req, res) => {
    let file = `${Date.now()}_export.sql`
    const db = (new Database()).getDatabase();
    mysqldump({
        connection: db,
        dumpToFile: `./exports/${file}`
    })
    res.download(`./exports/${file}`, "export.sql", (err) => {
        if(err) {
            throw err;
        } else {
            // WIP!!! THIS DOES NOT WORK
            fs.unlinkSync(`./exports/${file}`, (err) => {
                if(err) {
                    throw err;
                }
            });
        }
    })
})

module.exports = router;