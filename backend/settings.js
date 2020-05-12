const mysql = require("mysql");

class Database {

    constructor() {
        this.database = {
            host: 'localhost',
            port: 3307,
            user: 'root',
            password: 'root',
            database: 'oakify'
        }
    }

    getDatabase() {
        return this.database;
    }

    connect() {
        const connection = mysql.createConnection(this.database);
        connection.connect();
        return connection;
    }
}

module.exports = Database;