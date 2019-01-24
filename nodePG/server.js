

let express = require('express');
let uuid = require('uuid');
let events = require('events');
let bodyParser = require('body-parser');
let request = require('request');

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

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var analyticsEventEmitter = new events.EventEmitter();

app.set("analyticsEventEmitter", analyticsEventEmitter);

app.set("pgPoolConnections", pgPoolConnections);

analyticsEventEmitter.on('analytic', function(info) {
    console.log('analytic Received. ' + JSON.stringify(info));

    let id = uuid.v4();

    pgPoolConnections.query('INSERT INTO analytics (id, eventName, totalMS, count, status) VALUES($1, $2, $3, $4, $5)', 
           [id, info.eventName, info.totalMS, info.count, info.status], (error, results) => {

        if (error) {
            console.log(error);
        }
        else {
            console.log("Insert analytics id=" + id);
        }

    });

 });

 app.listen(4040, "127.0.0.1", function(err) {

    if (err) {
       // console.log("Faileds to started successfully");
      //  console.log(err);
    }
    else {

        require("./routes/users.js")(app);

        // Default route if no other is defined, this a 404 route
        app.use(function(req, res, next) {

            console.log("Running 404 code");

            res.status(404);
            res.setHeader("Content-Type", "application/json");
            res.end("{\"status\":\"Failed\"}");
        });

        app.use(function(err, req, res, next) {

            console.log("Running 500 code");
        
            console.log(err.stack);
        
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.end("{\"status\":\"Something went really bad\"}");
        });

        console.log("Server started successfully");
    }
});

// pgPoolConnections.query('select * from users', (error, results) => {

//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.dir(results.rows);
//     }
//
//});

//pgPoolConnections.end();

