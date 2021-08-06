// npm packages
const { validate } = require("jsonschema");

// app imports
const { User } = require("../models");
const { APIError } = require("../helpers");
const { userNewSchema } = require("../schemas");

/**
 * Validate the POST request body and create a new User
 */
async function createUser(request, response, next) {
  const validation = validate(request.body, userNewSchema);
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
    const newUser = await User.createUser(new User(request.body));
    return response.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
}

/**
 * Get a single user by name
 * @param {String} name - the name of the User to retrieve
 */
async function readUser(request, response, next) {
  const { name } = request.params;
  try {
    const user = await User.readUser(name);
    return response.json(user);
  } catch (err) {
    return next(err);
  }
}

/**
 * Get a single userById
 * @param {String} id - id of the foodsource record
 * @param {*} response
 * @param {*} next
 * @returns
 */
 async function readUserById(request, response, next) {
  const { id } = request.params;
  try {
    const user = await User.readUserById(id);
    return response.json(user);
  } catch (err) {
    return next(err);
  }
}


/**
 * Update a single user
 * @param {String} name - the name of the User to update
 */
// async function updateFoodSource(request, response, next) {
//   const { name } = request.params;

//   const validation = validate(request.body, userUpdateSchema);
//   if (!validation.valid) {
//     return next(
//       new APIError(
//         400,
//         "Bad Request",
//         validation.errors.map(e => e.stack).join(". ")
//       )
//     );
//   }

//   try {
//     const user = await User.updateFoodSource(name, request.body);
//     return response.json(user);
//   } catch (err) {
//     return next(err);
//   }
// }
/**
 * Update a single user
 * @param {String} name - the id of the User to update
 */
//  async function updateFoodSourceById(request, response, next) {
//   const { id } = request.params;

//   const validation = validate(request.body, userUpdateSchema);
//   if (!validation.valid) {
//     return next(
//       new APIError(
//         400,
//         "Bad Request",
//         validation.errors.map(e => e.stack).join(". ")
//       )
//     );
//   }

//   try {
//     const user = await User.updateFoodSourceById(id, request.body);
//     return response.json(user);
//   } catch (err) {
//     return next(err);
//   }
// }

/**
 * Remove a single user by name
 * @param {String} name - the name of the User to remove
 */
async function deleteUser(request, response, next) {
  const { name } = request.params;
  try {
    const deleteMsg = await User.deleteUser(name);
    return response.json(deleteMsg);
  } catch (err) {
    return next(err);
  }
}

// /**
//  * Remove a single user by id
//  * @param {String} id - the id of the User to remove
//  */
 async function deleteUserById(request, response, next) {
  const { id } = request.params;
  try {
    const deleteMsg = await User.deleteUserById(id);
    return response.json(deleteMsg);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createUser,
  readUser,
  readUserById,
  // updateUser,
  // updateUserById,
  deleteUser,
  deleteUserById

};
