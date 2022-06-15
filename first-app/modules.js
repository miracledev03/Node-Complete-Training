// Path Module

const path = require("path");

const pathObj = path.parse(__filename);

console.log(pathObj);



// OS Module
const os = require("os");

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

// console.log('Total Memory: ' + totalMemory);

// Template string
// ES6 / ES2015 : ECMAScript 6

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);




// FS Module
const fs = require("fs");

// Sync
const files = fs.readdirSync("./");

console.log(files);

// Async
fs.readdir("./", (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log(files);
  }
});




// Events Module
const EventEmitter = require("events");
// const emitter = new EventEmitter();

const Logger = require("./logger");
const logger = new Logger();

// Register a listner
// emitter.on("messageLogged", (arg) => {
//   console.log("Listener called", arg);
// });

// Making a noise, produce - signalling
// Raise an event => It's a trigger function
// emitter.emit("messageLogged", { id: 1, url: "http://" });

// const log = require('./logger');
// log('message');

logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

logger.log("message");




// HTTP Module
const http = require('http');

// const server = http.createServer();

// server.on('connection', (socket) => {
//   console.log('New connection!', socket);
// });

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

console.log('Listening on port 3000...');

