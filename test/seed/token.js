const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config().parsed;

const data = {};
data.id = 0;

const options = {};
options.expiresIn = 1000000;

const token = jwt.sign(data, dotenv.SECRET, options);

module.exports = {
    token,
};