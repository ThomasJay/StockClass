
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

   exports.customers = function(req, res) {

    res.status(200);
    res.setHeader("Content-Type", "application/json")

    let customer1 = {
        id: "1234",
        name: "Tom",
        address: "100 A Street",
        notes: ["New customer"]
     };

     console.log("Customer1=" + JSON.stringify(customer1));

    let customer2 = {
        id: "2222",
        name: "Bob",
        address: "200 B Street",
        notes: ["Old customer"]
     };

     console.log("Customer2=" + JSON.stringify(customer2));

    let customers = {
        customers: [customer1, customer2]
    };

    console.log("Customers=" + JSON.stringify(customers));



    res.end(JSON.stringify(customers));
   
  
   };

