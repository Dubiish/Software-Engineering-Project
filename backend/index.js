const express = require('express');
const app = express();
const port = 4000;

const bodyParser = require('body-parser');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'oakify'
});
connection.connect();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/customer', require('./routes/Customer'));
app.use('/order', require('./routes/Order'));
app.use('/user', require('./routes/User'));
app.use('/log', require('./routes/Log'));
//app.use('/backup', require('./routes/Backups'));

/* app.get('/data', (req, res) => {
    connection.query("SELECT * FROM people", (err, result, fields) => {
        if(err) throw err;
        console.log(result);
        res.json({
            message: 'Request to database!',
            result: result
        });
    });
}); */

/* app.get('/insert', (req, res) => {
    connection.query("INSERT people(name, surname) VALUES ('Sample', 'Person')", (err, result, fields) => {
        if(err) throw err;
        res.json({
            message: 'Data insertion',
            result: result
        })
    });
}); */

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to sample_shop API!',
        database_state: connection.state
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
})