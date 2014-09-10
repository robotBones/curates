// Hook up MySQL to the server
var host = process.env.DBHOST || '127.0.0.1';
var user = process.env.DBUSER || 'root';
var dbpass = process.env.DBPASS || '';
var dbname = process.env.DBNAME || 'curates';

var path = require('path');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: host,
    user: user,
    password: dbpass,
    database: dbname,
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

module.exports = db;
