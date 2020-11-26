var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store'
});

pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query("CREATE TABLE store.jobBook ( jobNum INT UNSIGNED, clientName CHAR(128), PRIMARY KEY (jobNum, clientName))", function(error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
    });
});


pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query("CREATE TABLE store.posiInfo ( ID DECIMAL(10, 5), posiPosition CHAR(25), posiWeight SMALLINT UNSIGNED, jobNum INT UNSIGNED, clientName CHAR(128), PRIMARY KEY (ID), FOREIGN KEY (jobNum, clientName) REFERENCES store.jobBook(jobNum, clientName))", function(error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;

        // Don't use the connection here, it has been returned to the pool.
    });
});