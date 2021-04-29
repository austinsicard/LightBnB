const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const getUserWithEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const queryParams = [email];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0] || null) 
    .catch((error) => console.log(error.message));
};
// Export 
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  // User Values
  const queryParams = [id];

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0] || null)
    .catch((error) => console.log(error.message));
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
 const addUser = function(user) {
  const queryString = `
    INSERT INTO users(name, email, password) 
    VALUES ($1, $2, $3) RETURNING *;`;

  // User Values
  const queryParams = [user.name, user.email, user.password];

  // Run query on database
  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows[0])
    .catch((error) => console.log(error.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {

  // 1

  const queParam = [];

  // 2

  let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE true`;

  // 3

  if (options.city) {
    queParam.push(`%${options.city}%`);
    queryString += `AND city LIKE $${values.length}`;
  }
  if (options.owner_id) {
    queParam.push(options.owner_id);
    queryString += `AND owner_id = $${values.length}`;
  }
  if (options.minimum_price_per_night) {
    queParam.push(options.minimum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${values.length}`;
  }
  if (options.maximum_price_per_night) {
    queParam.push(options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night <= $${values.length}`;
  }
  if (options.minimum_rating) {
    queParam.push(options.minimum_rating);
    queryString += `AND rating >= $${values.length}`;
  }

  // 4

  queParam.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queParam.length};
  `;

  // 5

  console.log(queryString, queParam)

  // 6

  return pool.query(queryString, queParam).then((result) => result.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
