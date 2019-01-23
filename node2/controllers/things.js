let request = require('request');

exports.hi = function(req, res) {

    res.status(200);
    res.setHeader("Content-Type", "application/json")

    res.end("{\"msg\":\"Hi There\"}");

   };


   exports.hello = function(req, res) {

    res.status(200);
    res.setHeader("Content-Type", "application/json")

    res.end("{\"msg\":\"Hello There\"}");
   

   };




   exports.other = function(req0, res0) {  
   
    request.get("http://httpbin.org/ip", (error, response, body) => {

    if (error) {
        console.log(error);

        res0.status(400);
        res0.setHeader("Content-Type", "application/json")

        res0.json({status:"Failed"});
    }
    else {
        console.log("Got data " + body);

        let info = JSON.parse(body);

        console.log("origin=" + info.origin);

        res0.status(200);
        res0.setHeader("Content-Type", "application/json")

        res0.json({status:"Success", yourIP: info.origin});
    }

})


   };
