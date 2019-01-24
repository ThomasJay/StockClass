let uuid = require('uuid');

var analyticsEventEmitter;

var pgPoolConnections;


 exports.setAnalyticsEventEmitter = function(analyticsEventEmitterParam) {
    analyticsEventEmitter = analyticsEventEmitterParam;
 }

 
 exports.setPGPoolConnections = function(pgPoolConnectionsParam) {
    pgPoolConnections = pgPoolConnectionsParam;
 }


 exports.newFindAllUsers = function(req, res) {

    let startTimestamp = Date.now();

    res.status(200);
    res.setHeader("Content-Type", "application/json")

    pgPoolConnections.query('select * from users', (error, results) => {

        if (error) {
            console.log(error);

            let endTimestamp = Date.now();
            let totalTime = endTimestamp - startTimestamp;
    
            analyticsEventEmitter.emit('analytic', {eventName: "findAllUsers", totalMS: totalTime, count: 0, status: "Failed"})       
        }
     else {

        let users = results.rows;

        let mappedUsers = [];

        users.forEach(element => {

            let user = {
                uniqueUserId : element.id,
                userName : element.name,
                userEmail : element.email
            }

            mappedUsers.push(user);

           // delete element.password;
        });

        let usersHolder = {
            users: mappedUsers
        };

        let endTimestamp = Date.now();
        let totalTime = endTimestamp - startTimestamp;

        analyticsEventEmitter.emit('analytic', {eventName: "findAllUsers", totalMS: totalTime, count: users.length, status: "Success"})

        res.json(usersHolder);

        console.dir(results.rows);
     }

    });


  
   };
 
    exports.findAllUsers = function(req, res) {

        let startTimestamp = Date.now();
    
        res.status(200);
        res.setHeader("Content-Type", "application/json")
    
        pgPoolConnections.query('select * from users', (error, results) => {
    
            if (error) {
                console.log(error);
    
                let endTimestamp = Date.now();
                let totalTime = endTimestamp - startTimestamp;
        
                analyticsEventEmitter.emit('analytic', {eventName: "findAllUsers", totalMS: totalTime, count: 0, status: "Failed"})       
            }
         else {
    
            let users = results.rows;
    
            let mappedUsers = [];
    
            users.forEach(element => {
    
                let user = {
                    userId : element.id,
                    userName : element.name
                }
    
                mappedUsers.push(user);
    
               // delete element.password;
            });
    
            let usersHolder = {
                users: mappedUsers
            };
    
            let endTimestamp = Date.now();
            let totalTime = endTimestamp - startTimestamp;
    
            analyticsEventEmitter.emit('analytic', {eventName: "findAllUsers", totalMS: totalTime, count: users.length, status: "Success"})
    
            res.json(usersHolder);
    
            console.dir(results.rows);
         }
    
        });
     
 
  
   };


   exports.findUserById = function(req, res) {

    let startTimestamp = Date.now();

    let userId = req.params.id

    console.log("userId=" + userId);

    

    pgPoolConnections.query('select * from users where id=$1', [userId], (error, results) => {
    
        if (error) {
            console.log(error);

            let endTimestamp = Date.now();
            let totalTime = endTimestamp - startTimestamp;
    
            analyticsEventEmitter.emit('analytic', {eventName: "findUserById", totalMS: totalTime, count: 0, status: "Failed"})       
        }
     else {

        let users = results.rows;

            if (users.length > 0) {

            let user = users[0];

            let endTimestamp = Date.now();
            let totalTime = endTimestamp - startTimestamp;

             analyticsEventEmitter.emit('analytic', {eventName: "findAllUsers", totalMS: totalTime, count: users.length, status: "Success"})

            res.json(user);

            console.dir(user);
        }
        else {
            res.status(400);
         res.setHeader("Content-Type", "application/json")
    
         let notFoundMessage = {
             status: "Failed",
             message: "Not found"
         };

         let endTimestamp = Date.now();
         let totalTime = endTimestamp - startTimestamp;

          analyticsEventEmitter.emit('analytic', {eventName: "findAllUsers", totalMS: totalTime, count: 0, status: "Not Found"})

         res.json(notFoundMessage);
        }

     }

    });

   

 
  
   };

   exports.createUser = function(req, res) {

    res.status(201);
    res.setHeader("Content-Type", "application/json")

    let body = req.body;

    //console.log("createUser processing");
    //console.dir(body);

    let user = body;

    user.id = uuid.v4();

    pgPoolConnections.query('INSERT INTO users (id, name, email, password) VALUES($1, $2, $3, $4)', 
           [user.id, user.name, user.email, user.password], (error, results) => {

        if (error) {
            console.log(error);

            res.status(400);
            res.setHeader("Content-Type", "application/json")
       
            let notInsertedMessage = {
                status: "Failed",
                message: "Did not insert"
            };
   
    
    
            res.json(notInsertedMessage);
        }
        else {
            console.log("Insert users id=" + user.id);

            res.json(user);
        }

    });

    
  
   };


   exports.updateUserWithId = function(req, res) {

    let userId = req.params.id

    console.log("userId=" + userId);


    let body = req.body;

    let user = body;
    user.id = userId;

    console.log("updateUserWithId processing");
    console.dir(body);

    pgPoolConnections.query('UPDATE users set name = $1, email=$2, password = $3 where id = $4', 
    [body.name, body.email, body.password, userId], (error, results) => {

    if (error) {
        console.log(error);

        res.status(400);
        res.setHeader("Content-Type", "application/json")

        let notUpdatedMessage = {
            status: "Failed",
            message: "Did not update"
        };



        res.json(notUpdatedMessage);
    }
    else {
        console.log("Updated users id=" + user.id);

        res.json(user);
    }


    
});
    

 
    
  
   };


   exports.deleteUserWithId = function(req, res) {

    let userId = req.params.id

    console.log("userId=" + userId);


  
    pgPoolConnections.query('DELETE FROM users where id = $1', 
    [userId], (error, results) => {

    if (error) {
        console.log(error);

        res.status(400);
        res.setHeader("Content-Type", "application/json")

        let notDeletedMessage = {
            status: "Failed",
            message: "Did not deleted"
        };



        res.json(notDeletedMessage);
    }
    else {

        if (results.rowCount > 0) {
            console.log("Delete users id=" + userId);

          //  console.dir(results);
    
            res.json({deleteUserId: userId});
        }
        else {
            res.status(400);
        res.setHeader("Content-Type", "application/json")

        let notDeletedMessage = {
            status: "Failed",
            message: "Did not found / deleted"
        };



        res.json(notDeletedMessage);
        }
        
    }


    
});
    



    
  
   };


   