// npm packages
const express = require("express");

// app imports
const { usersHandler, userHandler } = require("../handlers");

// globals
const router = new express.Router();
const { readUsers } = usersHandler;
const { createUser } = userHandler;
// const { createUser, readFoodSource, readFoodSourceById, updateFoodSourceById, updateFoodSource, deleteFoodSourceById, deleteFoodSource } = userHandler;


/* All the FoodSources Route */
router
  .route("")
  .get(readUsers)
  .post(createUser);

module.exports = router;
