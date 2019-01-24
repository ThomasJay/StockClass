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
