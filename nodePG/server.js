

let express = require('express');

let PostgresPool = require('pg').Pool;

let pgPoolConnections = new PostgresPool(
    {
        user: 'api',
        host: 'localhost',
        database: 'api',
        port: 5432,
        password: 'password'
    }

);


pgPoolConnections.query('select * from users', (error, results) => {

    if (error) {
        console.log(error);
    }
    else {
        console.dir(results.rows);
    }

});

