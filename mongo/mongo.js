// Establish connection with the server
var mongoose = require('mongoose');
mongoose.connect('mongodb://@ds035240.mongolab.com:35240/curates-hack-reactor');
var db = mongoose.connection;

// Attach useful listeners to the database
db.on('error', function(error) {
  console.error('Mongoose encountered an error:', error);
});

db.once('open', function() {
  console.log('Mongoose successfully opened connection with the database');
});

// Set up Schema
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: [],
    default: []
  }
});

var collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  links: [{
    url: String,
    title: String,
    description: String
    upVote: {
      type: Number,
      default: 0
    },
    downVote: {
      type: Number,
      default: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
var Collection = mongoose.model('Collection', collectionSchema);
var User = mongoose.model('User', userSchema);

exports.collection = Collection;
exports.user = User;


