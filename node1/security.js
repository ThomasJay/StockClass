exports.authorization = function(req, res, next) {

    let apiKey = req.header("apikey");

    console.log("In Security Code apikey=" + apiKey);

    if (apiKey != "112233") {

        res.status(401);
        res.setHeader("Content-Type", "application/json");
      
        var responseMessage = {
            error: "224498",
            message: "You should not be here"
        };
    
        res.end(JSON.stringify(responseMessage));

        return;
    }

    next();

};



