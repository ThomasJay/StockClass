let uuid = require('uuid');

let customer1 = {
    id: "1234",
    name: "Tom",
    address: "100 A Street",
    notes: ["New customer"]
 };

 let customer2 = {
    id: "2222",
    name: "Bobby",
    address: "200 B Street",
    notes: ["Old customer"]
 };

 let customers = [customer1, customer2];

exports.findAllCustomers = function(req, res) {

    res.status(200);
    res.setHeader("Content-Type", "application/json")

    let customersHolder = {
        customers: customers
    };

    res.json(customersHolder);
  
   };

   exports.findCustomerById = function(req, res) {

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

 
  
   };

   exports.createCustomer = function(req, res) {

    res.status(200);
    res.setHeader("Content-Type", "application/json")

    let body = req.body;

    console.log("createCustomer processing");
    console.dir(body);

    let customer = body;

    customer.id = uuid.v4();

    customers.push(customer);

    res.json(customer);
  
   };

// TODO:
 
// updateCustomerWithId
// deleteCustomerWithId

