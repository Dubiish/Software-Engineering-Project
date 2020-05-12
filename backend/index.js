const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const bodyParser = require('body-parser');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'oakify',
    port: 3307
});
connection.connect();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ROUTES
app.use('/customer', require('./routes/Customer'));
app.use('/order', require('./routes/Order'));
app.use('/utils', require("./routes/Utils"));
app.use('/user', require('./routes/User'));
app.use('/log', require('./routes/Log'));

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to OAKIFY API!',
        database_state: connection.state
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
})