module.exports = function(app) {

    let userController = require("../controllers/users.js");

    userController.setAnalyticsEventEmitter(app.get("analyticsEventEmitter"));
    userController.setPGPoolConnections(app.get("pgPoolConnections"));

    app.get("/services/v1/users", userController.findAllUsers);
    app.get("/services/v2/users", userController.newFindAllUsers);
    app.get("/services/v1/users/:id", userController.findUserById);
    app.post("/services/v1/users", userController.createUser);
    app.put("/services/v1/users/:id", userController.updateUserWithId);
    app.delete("/services/v1/users/:id", userController.deleteUserWithId);

 //   app.delete("/services/v1/users/:id/transactions", userController.deleteUserWithId);
 //   app.delete("/services/v1/users/:id/transactions/:transactiontype", userController.deleteUserWithId);


}