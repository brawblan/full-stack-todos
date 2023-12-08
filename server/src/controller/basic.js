const express = require('express');

const BasicRoute = express.Router();

BasicRoute.get('/', (req, res) => res.status(200).send('Basic Route'));

module.exports = BasicRoute;