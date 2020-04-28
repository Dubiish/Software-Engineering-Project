const mysql = require("mysql");

class Database {
    connect() {
        const connection = mysql.createConnection({
            host: 'localhost',
            port: 3307,
            user: 'root',
            password: 'root',
            database: 'oakify'
        });
        connection.connect();
        return connection;
    }
}

module.exports = Database;