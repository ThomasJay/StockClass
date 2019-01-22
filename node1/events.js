var events = require('events');

var eventEmitter = new events.EventEmitter();

console.log('classViews Observer 1 registered');

let obs1 = function() {
    console.log('classViews Observer 1 received successfully.');
 }

eventEmitter.on('classViews', obs1);

 console.log('classViews Observer 2 registered');
eventEmitter.on('classViews', function(info) {
    console.log('classViews Observer 2 received successfully. ' + info.eventName);
 });

 console.log('classViews Sent');

 eventEmitter.emit('classViews', {eventName: "MyEvent"});

 

