
var express = require("express");
var assert = require("assert");
var path = require("path");

var security = require("./security.js");

var app = express();

app.get("/hi", security.authorization, function(req, res)  {

    let location = "San Francisco";

 


    console.log("personId=" + req.query.personId);
    console.log("count=" + req.query.count);

    var person = {
        name: "Tom",
        location: location
    };

    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Magic", "xxyyzz");

    res.end(JSON.stringify(person));
});


app.get("/say/:id/xxx/:name", function(req, res)  {

 

    res.status(200);
    
    let idParam = req.params.id;
    let nameParam = req.params.name;

   // next('route');

    res.end("Say Say Say " + idParam + " " + nameParam);

    
});

app.get("/", function(req, res, next) {
 
    res.status(200);
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.use(function(req, res, next) {
    console.log("In 404");

    res.status(404);
    res.sendFile(path.join(__dirname, './public', '404.html'));
});

app.use(function(err, req, res, next) {
console.log("In 500");

    console.log(err.stack);

    res.status(500);

    res.sendFile(path.join(__dirname, './public', '500.html'));


});




app.listen(4040);
console.log("Server Started");

