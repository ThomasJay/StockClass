var http = require("http");

let server = http.createServer(function (request, response) {
  
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    response.end('Hello World\n');
});

server.listen(4040);

// Console will print the message
console.log('Server running');

