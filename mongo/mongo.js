// Establish connection with the server
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://jimjea:hack123@ds035240.mongolab.com:35240/curates-hack-reactor');
var db = mongoose.connection;
var Q = require('q');

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
    description: String,
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

// Compare passwords
userSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

var Collection = mongoose.model('Collection', collectionSchema);
var User = mongoose.model('User', userSchema);

// Hash passwords
userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});


exports.collection = Collection;
exports.user = User;


