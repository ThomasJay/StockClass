module.exports = function(app) {

    let userController = require("../controllers/users.js");

    userController.setAnalyticsEventEmitter(app.get("analyticsEventEmitter"));
    userController.setPGPoolConnections(app.get("pgPoolConnections"));

    app.get("/services/v1/users", userController.findAllUsers);
    app.get("/services/v2/users", userController.newFindAllUsers);
    // app.get("/services/v1/users/:id", customerController.findCustomerById);
    // app.post("/services/v1/users", customerController.createCustomer);
    // app.put("/services/v1/users/:id", customerController.updateCustomerWithId);
    // app.delete("/services/v1/users/:id", customerController.deleteCustomerWithId);

    // app.post("/services/v1/users/signup", customerController.signupCustomer);
    // app.post("/services/v1/users/login", customerController.loginCustomer);


}