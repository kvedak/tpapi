// npm packages
const express = require("express");

// app imports
const { usersHandler, userHandler } = require("../handlers");

// globals
const router = new express.Router();
const { readUsers } = usersHandler;
const { createUser, readUser, readUserById, deleteUser, deleteUserById, updateUser, updateUserById } = userHandler;

/* All the FoodSources Route */
router
  .route("")
  .get(readUsers)
  .post(createUser);

/* Single FoodSource by Name Route */
router
  .route("/byname/:name")
  .get(readUser)
  .patch(updateUser)
  .delete(deleteUser);
  
/* Single FoodSource by Id Route */
router
  .route("/byid/:id")
  .get(readUserById)
  .patch(updateUserById)
  .delete(deleteUserById);


module.exports = router;
