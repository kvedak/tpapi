// npm packages
const express = require("express");

// app imports
const { foodSourceHandler, foodSourcesHandler } = require("../handlers");

// globals
const router = new express.Router();
const { readFoodSources } = foodSourcesHandler;
const { createFoodSource, readFoodSource, readFoodSourceById, updateFoodSourceById, updateFoodSource, deleteFoodSourceById, deleteFoodSource } = foodSourceHandler;

/* All the FoodSources Route */
router
  .route("/foodsources")
  .get(readFoodSources)
  .post(createFoodSource);

/* Single FoodSource by Name Route */
router
  .route("/foodsources/byname/:name")
  .get(readFoodSource)
  .patch(updateFoodSource)
  .delete(deleteFoodSource);
router
  .route("/foodsources/byid/:id")
  .get(readFoodSourceById)
  .patch(updateFoodSourceById)
  .delete(deleteFoodSourceById);

module.exports = router;
