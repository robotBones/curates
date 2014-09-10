var db = require('./dbInit.js');


// Tables for Users, Collections, Links
db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username', 64);
      user.string('passwordHashed', 255);
    }).then(function() {
      console.log("user table created");
    });
  }
});

db.knex.schema.hasTable('collections').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('collections', function(collection) {
      collection.increments('id').primary();
      collection.string('name', 255);
      collection.string('description', 255);
    }).then(function() {
      console.log("collection table created");
    });
  }
});

db.knex.schema.hasTable('links').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('links', function(link) {
      link.increments('id').primary();
      link.string('name', 255);
      link.string('url', 255);
      link.string('description', 255);
      link.integer('upvote', 64);
      link.integer('downvote', 64);
    }).then(function() {
      console.log("link table created");
    });
  }
});

// JOIN Tables
db.knex.schema.hasTable('userscollections').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('userscollections', function(uc) {
      uc.increments('id').primary();
      uc.integer('userid', 64);
      uc.integer('collectionid', 64);
    }).then(function() {
      console.log("usercollection table created");
    });
  }
});

db.knex.schema.hasTable('collectionslinks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('collectionslinks', function(cl) {
      cl.increments('id').primary();
      cl.integer('collectionid', 64);
      cl.integer('linkid', 64);
    }).then(function() {
      console.log("collectionlink table created");
    });
  }
});

