// npm packages
const express = require("express");

// app imports
const { usersHandler } = require("../handlers");

// globals
const router = new express.Router();
const { readUsers } = usersHandler;
/* All the FoodSources Route */
router
  .route("")
  .get(readUsers);
module.exports = router;
