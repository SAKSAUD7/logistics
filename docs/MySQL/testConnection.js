const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Asrar@121', // Update this to your MySQL password
    database: 'logistics_billing', // Update this to your actual database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testing the connection
pool.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Connection successful, results:', results);
});

// Close the pool when the application terminates
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing the connection pool:', err);
        } else {
            console.log('Connection pool closed');
        }
        process.exit(0);
    });
});
