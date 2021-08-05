// npm packages
const express = require("express");

// app imports
const { foodSourceHandler, foodSourcesHandler } = require("../handlers");
const { readFoodSourceById } = require("../handlers/foodsourcebyid");

// globals
const router = new express.Router();
const { readFoodSources } = foodSourcesHandler;
const { createFoodSource, readFoodSource, updateFoodSource, deleteFoodSource } = foodSourceHandler;

/* All the FoodSources Route */
router
  .route("/foodsources")
  .get(readFoodSources)
  .post(createFoodSource);


  router
  .route("/foodsources/:id")  
  .get(readFoodSourceById)
  // .patch(updateFoodSource)
  .delete(deleteFoodSource);

module.exports = router;
