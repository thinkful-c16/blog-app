'use strict';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost/blog-app';

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  pool: { min: 0, max: 3}, // elephantSQL
  debug: true // show/hide debugging
};

exports.PORT = process.env.PORT || 8080; 