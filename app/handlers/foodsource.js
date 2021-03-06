// npm packages
const { validate } = require("jsonschema");

// app imports
const { FoodSource } = require("../models");
const { APIError } = require("../helpers");
const { foodSourceNewSchema, foodSourceUpdateSchema } = require("../schemas");

/**
 * Validate the POST request body and create a new FoodSource
 */
async function createFoodSource(request, response, next) {
  const validation = validate(request.body, foodSourceNewSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        "Bad Request",
        validation.errors.map(e => e.stack).join(". ")
      )
    );
  }

  try {
    const newFoodSource = await FoodSource.createFoodSource(new FoodSource(request.body));
    return response.status(201).json(newFoodSource);
  } catch (err) {
    return next(err);
  }
}

/**
 * Get a single foodSource by name
 * @param {String} name - the name of the FoodSource to retrieve
 */
async function readFoodSource(request, response, next) {
  const { name } = request.params;
  try {
    const foodSource = await FoodSource.readFoodSource(name);
    return response.json(foodSource);
  } catch (err) {
    return next(err);
  }
}

/**
 * Get a single foodSourceById
 * @param {String} id - id of the foodsource record
 * @param {*} response
 * @param {*} next
 * @returns
 */
 async function readFoodSourceById(request, response, next) {
  const { id } = request.params;
  try {
    const foodSource = await FoodSource.readFoodSourceById(id);
    return response.json(foodSource);
  } catch (err) {
    return next(err);
  }
}


/**
 * Update a single foodSource
 * @param {String} name - the name of the FoodSource to update
 */
async function updateFoodSource(request, response, next) {
  const { name } = request.params;

  const validation = validate(request.body, foodSourceUpdateSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        "Bad Request",
        validation.errors.map(e => e.stack).join(". ")
      )
    );
  }

  try {
    const foodSource = await FoodSource.updateFoodSource(name, request.body);
    return response.json(foodSource);
  } catch (err) {
    return next(err);
  }
}
/**
 * Update a single foodSource
 * @param {String} name - the id of the FoodSource to update
 */
 async function updateFoodSourceById(request, response, next) {
  const { id } = request.params;

  const validation = validate(request.body, foodSourceUpdateSchema);
  if (!validation.valid) {
    return next(
      new APIError(
        400,
        "Bad Request",
        validation.errors.map(e => e.stack).join(". ")
      )
    );
  }

  try {
    const foodSource = await FoodSource.updateFoodSourceById(id, request.body);
    return response.json(foodSource);
  } catch (err) {
    return next(err);
  }
}

/**
 * Remove a single foodSource by name
 * @param {String} name - the name of the FoodSource to remove
 */
async function deleteFoodSource(request, response, next) {
  const { name } = request.params;
  try {
    const deleteMsg = await FoodSource.deleteFoodSource(name);
    return response.json(deleteMsg);
  } catch (err) {
    return next(err);
  }
}

/**
 * Remove a single foodSource by id
 * @param {String} id - the id of the FoodSource to remove
 */
 async function deleteFoodSourceById(request, response, next) {
  const { id } = request.params;
  try {
    const deleteMsg = await FoodSource.deleteFoodSourceById(id);
    return response.json(deleteMsg);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createFoodSource,
  readFoodSource,
  readFoodSourceById,
  updateFoodSource,
  updateFoodSourceById,
  deleteFoodSource,
  deleteFoodSourceById

};
