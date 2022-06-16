const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const home = require('./routes/home');
const courses = require('./routes/courses');
const express = require("express");
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);  // => undefined
// console.log(`app: ${app.get('env')}`);  // => development

// Pug
app.set("view engine", "pug");
app.set("views", "./views"); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// DB work...
dbDebugger("Connected to the database...");

app.use(logger);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
