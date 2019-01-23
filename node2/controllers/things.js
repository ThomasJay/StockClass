
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

