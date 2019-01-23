module.exports = function(app) {

    let customerController = require("../controllers/customers.js");

    customerController.setAnalyticsEventEmitter(app.get("analyticsEventEmitter"));

    app.get("/services/v1/customers", customerController.findAllCustomers);
    app.get("/services/v1/customers/:id", customerController.findCustomerById);
    app.post("/services/v1/customers", customerController.createCustomer);
    app.put("/services/v1/customers/:id", customerController.updateCustomerWithId);
    app.delete("/services/v1/customers/:id", customerController.deleteCustomerWithId);

    app.post("/services/v1/customers/signup", customerController.signupCustomer);
    app.post("/services/v1/customers/login", customerController.loginCustomer);


}