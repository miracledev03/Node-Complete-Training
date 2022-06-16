const express = require('express');
const router = express.Router();

// GET Requests
router.get("/", (req, res) => {
  // res.send("Hello World!!!");
  res.render("index", { title: "My Express App", message: "Hello" });
});

module.exports = router;
