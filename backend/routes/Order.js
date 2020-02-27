var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello order!");
});

module.exports = router;