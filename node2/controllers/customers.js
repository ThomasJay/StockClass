let uuid = require('uuid');

let customer1 = {
    id: "1234",
    userName: "tom1234",
    password: "password",
    name: "Tom",
    address: "100 A Street",
    notes: ["New customer"]
 };

 let customer2 = {
    id: "2222",
    userName: "bobby2222",
    password: "password",
    name: "Bobby",
    address: "200 B Street",
    notes: ["Old customer"]
 };

 let customers = [customer1, customer2];

 var analyticsEventEmitter;

 exports.setAnalyticsEventEmitter = function(analyticsEventEmitterParam) {
    analyticsEventEmitter = analyticsEventEmitterParam;
 }

exports.findAllCustomers = function(req, res) {

    let startTimestamp = Date.now();

    res.status(200);
    res.setHeader("Content-Type", "application/json")

    let customersHolder = {
        customers: customers
    };

    let endTimestamp = Date.now();

    res.json(customersHolder);


    let totalTime = endTimestamp - startTimestamp;

    analyticsEventEmitter.emit('analytic', {eventName: "findAllCustomersStarted", totalMS: totalTime})

  
   };

   exports.findCustomerById = function(req, res) {

    let startTimestamp = Date.now();

    let customerId = req.params.id

    console.log("CustomerId=" + customerId);

    // Check to see if id is in customers

    let found = false;

    let foundCustomer = {};

    customers.forEach(function(customer) {

        console.log("Iterate CustomerId=" + customer.id);

        if (customer.id == customerId) {

            console.log("Found CustomerId=" + customer.id);

            found = true;

            foundCustomer = customer;

        }

    });

    if (!found) {
        res.status(400);
        res.setHeader("Content-Type", "application/json")
    
        let notFoundMessage = {
            status: "Failed",
            message: "Not found"
        };

        res.json(notFoundMessage);
    }
    else {
        res.status(200);
        res.setHeader("Content-Type", "application/json")
    
        res.json(foundCustomer);
    }

    let endTimestamp = Date.now();

    let totalTime = endTimestamp - startTimestamp;

    analyticsEventEmitter.emit('analytic', {eventName: "findCustomerById", totalMS: totalTime})

 
  
   };

   exports.createCustomer = function(req, res) {

    res.status(201);
    res.setHeader("Content-Type", "application/json")

    let body = req.body;

    console.log("createCustomer processing");
    console.dir(body);

    let customer = body;

    customer.id = uuid.v4();

    customers.push(customer);

    res.json(customer);
  
   };


   exports.updateCustomerWithId = function(req, res) {

    let customerId = req.params.id

    console.log("CustomerId=" + customerId);


    let body = req.body;

    console.log("updateCustomerWithId processing");
    console.dir(body);

    let found = false;

    let index = -1;

    let foundIndex = -1;

    customers.forEach(function(customer) {

        console.log("Iterate CustomerId=" + customer.id);

        index = index + 1;

        if (customer.id == customerId) {

            console.log("Found CustomerId=" + customer.id);

            found = true;

            foundIndex = index;

        }

    });

    if (found) {
        res.status(200);
        res.setHeader("Content-Type", "application/json")
    
        customers[foundIndex] = body;
        res.json(body);
    }
    else {
        res.status(400);
        res.setHeader("Content-Type", "application/json")
    
        res.json({status: "Failed to update, could not find customer"});
    }
    

 
    
  
   };


   exports.deleteCustomerWithId = function(req, res) {

    let customerId = req.params.id

    console.log("CustomerId=" + customerId);


    let found = false;

    let index = -1;

    let foundIndex = -1;

    customers.forEach(function(customer) {

        console.log("Iterate CustomerId=" + customer.id);

        index = index + 1;

        if (customer.id == customerId) {

            console.log("Found CustomerId=" + customer.id);

            found = true;

            foundIndex = index;

        }

    });

    if (found) {
        res.status(200);
        res.setHeader("Content-Type", "application/json")
    
        customers.splice(foundIndex, 1);


        res.json({status:"Sucess"});
    }
    else {
        res.status(400);
        res.setHeader("Content-Type", "application/json")
    
        res.json({status: "Failed to delete, could not find customer"});
    }
    
  


    
  
   };


   
   exports.signupCustomer = function(req, res) {


    let body = req.body;

    console.log("signupCustomer processing");
    console.dir(body);

    // {
    //     "name": "Tom",
    //     "userName":"tom1234",
    //     "password":"password",
    //     "address": "100 A Street"
    // }

    if (isEmpty(body.name) || isEmpty(body.userName) || isEmpty(body.password) | isEmpty(body.address)) {

        console.log("Missing fields");

        res.status(400);
        res.setHeader("Content-Type", "application/json")
    
        let notFoundMessage = {
            status: "Failed",
            message: "missing fields"
        };

        res.json(notFoundMessage);

        return
    }

    let tmpCustomer = {
        id: uuid.v4(),
        userName: body.userName,
        password: body.password,
        name: body.name,
        address: body.address,
        notes: []
     };

    // {
    //     "id": "1234",
    //     "userName": "tom1234",
    //     "name": "Tom",
    //     "address": "100 A Street",
    //     "notes": [
    //         "New customer"
    //     ]
    // }

    customers.push(tmpCustomer);

    res.status(201);
    res.setHeader("Content-Type", "application/json")

  

    res.json(tmpCustomer);
}
   
   exports.loginCustomer = function(req, res) {


    let body = req.body;

    console.log("loginCustomer processing");
    console.dir(body);

    let customer = body;

    let userName = customer.userName;
    let password = customer.password;

    let found = false;

    let foundCustomer = {};

    customers.forEach(function(customer) {

        console.log("Iterate CustomerId=" + customer.id);

        if (customer.userName == userName && customer.password == password) {

            console.log("Found CustomerId=" + customer.id);

            found = true;

            foundCustomer = customer;

        }

    });

    if (!found) {
        res.status(400);
        res.setHeader("Content-Type", "application/json")
    
        let notFoundMessage = {
            status: "Failed",
            message: "Not found"
        };

        res.json(notFoundMessage);
    }
    else {
        res.status(200);
        res.setHeader("Content-Type", "application/json")

        let foundCustomerCopy = JSON.parse(JSON.stringify(foundCustomer));

        delete foundCustomerCopy.password;
    
        res.json(foundCustomerCopy);
    }
  

   }


   function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}





