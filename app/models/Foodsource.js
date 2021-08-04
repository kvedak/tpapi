// npm packages
const mongoose = require("mongoose");

// app imports
const { APIError } = require("../helpers");

// globals
const Schema = mongoose.Schema;

const foodSourceSchema = new Schema({
  name: String,
  type: String,
  address: String,
  phoneNo: String,
  location: Object,
  freshMeats: Boolean,
  freshVegies: Boolean
});

foodSourceSchema.statics = {
  /**
   * Create a Single New FoodSource
   * @param {object} newFoodSource - an instance of FoodSource
   * @returns {Promise<FoodSource, APIError>}
   */
  async createFoodSource(newFoodSource) {
    const duplicate = await this.findOne({ name: newFoodSource.name });
    if (duplicate) {
      throw new APIError(
        409,
        "FoodSource Already Exists",
        `There is already a foodSource with name '${newFoodSource.name}'.`
      );
    }
    const foodSource = await newFoodSource.save();
    return foodSource.toObject();
  },
  /**
   * Delete a single FoodSource
   * @param {String} name - the FoodSource's name
   * @returns {Promise<FoodSource, APIError>}
   */
  async deleteFoodSource(name) {
    const deleted = await this.findOneAndRemove({ name });
    if (!deleted) {
      throw new APIError(404, "FoodSource Not Found", `No foodSource '${name}' found.`);
    }
    return deleted.toObject();
  },
  /**
   * Get a single FoodSource by name
   * @param {String} name - the FoodSource's name
   * @returns {Promise<FoodSource, APIError>}
   */
  async readFoodSource(name) {
    const foodSource = await this.findOne({ name });

    if (!foodSource) {
      throw new APIError(404, "FoodSource Not Found", `No foodSource '${name}' found.`);
    }
    return foodSource.toObject();
  },
/**
 * Find source by id
 * @param {*} query
 * @param {*} fields
 * @param {*} skip
 * @param {*} limit
 * @returns
 */
async readFoodSourceById(id) {
  const foodSource = await this.findById(id);
  if (!foodSource) {
    throw new APIError(404, "FoodSource Not Found", `No foodSource for '${id}' found.`);
  }
  return foodSource.toObject();
},

  /**
   * Get a list of FoodSources
   * @param {Object} query - pre-formatted query to retrieve foodSources.
   * @param {Object} fields - a list of fields to select or not in object form
   * @param {String} skip - number of docs to skip (for pagination)
   * @param {String} limit - number of docs to limit by (for pagination)
   * @returns {Promise<FoodSources, APIError>}
   */
  async readFoodSources(query, fields, skip, limit) {
    const foodSources = await this.find(query, fields)
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .exec();
    if (!foodSources.length) {
      return [];
    }
    return foodSources.map(foodSource => foodSource.toObject());
  },
  /**
   * Patch/Update a single FoodSource
   * @param {String} name - the FoodSource's name
   * @param {Object} foodSourceUpdate - the json containing the FoodSource attributes
   * @returns {Promise<FoodSource, APIError>}
   */
  async updateFoodSource(name, foodSourceUpdate) {
    const foodSource = await this.findOneAndUpdate({ name }, foodSourceUpdate, {
      new: true
    });
    if (!foodSource) {
      throw new APIError(404, "FoodSource Not Found", `No foodSource '${name}' found.`);
    }
    return foodSource.toObject();
  }
};

/* Transform with .toObject to remove __v and _id from response */
if (!foodSourceSchema.options.toObject) foodSourceSchema.options.toObject = {};
foodSourceSchema.options.toObject.transform = (doc, ret) => {
  const transformed = ret;
  // delete transformed._id;
  delete transformed.__v;
  return transformed;
};

/** Ensure MongoDB Indices **/
// foodSourceSchema.index({ name: 1, number: 1 }, { unique: true }); // example compound idx

module.exports = mongoose.model("FoodSource", foodSourceSchema);
