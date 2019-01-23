// server.js
// Create 1/23/2019
// Stock Class

let express = require('express');

let app = express();


require("./routes/things.js")(app);

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


app.listen(4040);

console.log("Server Started");