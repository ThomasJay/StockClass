module.exports = function(app) {

    let thingController = require("../controllers/things.js");

    app.get("/hi", thingController.hi);
    app.get("/hello", thingController.hello);
    app.get("/customers", thingController.customers);
 


}