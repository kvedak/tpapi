// npm packages
const express = require("express");

// app imports
const { foodSourceHandler, foodSourcesHandler } = require("../handlers");

// globals
const router = new express.Router();
const { readFoodSources } = foodSourcesHandler;
const { createFoodSource, readFoodSource, updateFoodSource, deleteFoodSource } = foodSourceHandler;

/* All the FoodSources Route */
router
  .route("")
  .get(readFoodSources)
  .post(createFoodSource);

/* Single FoodSource by Name Route */
router
  .route("/:name")
  .get(readFoodSource)
  .patch(updateFoodSource)
  .delete(deleteFoodSource);

module.exports = router;
