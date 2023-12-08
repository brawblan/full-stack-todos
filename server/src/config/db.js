const { JsonDB, Config } = require('node-json-db');

const db = new JsonDB(new Config('../../db.json', true, true, '/'));

module.exports = db;