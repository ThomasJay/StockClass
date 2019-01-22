


var programName = process.argv[0];
var scriptPath = process.argv[1];
var portString = process.argv[2];

console.log("programName: " + programName);
console.log("scriptPath: " + scriptPath);
console.log("portString: " + portString);


var portNumber = 4444;

if (typeof portString != "undefined" && portString.length > 0) {
    portNumber = Number(portString);
}

console.log("My Port Number is " + portNumber);