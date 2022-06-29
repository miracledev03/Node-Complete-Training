const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(401).send('Unauthorized');
});

module.exports = router;
