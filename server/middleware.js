var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/../client'));

  var userRouter = express.Router();
  var collectionRouter = express.Router();
  var linksRouter = express.Router();

  app.use('/api/collection', collectionRouter);
  app.use('/api/collection', collectionRouter);
  app.use('/api/collection', collectionRouter);
  // app.use('api/collection/:url' linksRouter);
  // app.use('/api/links/', linksRouter);
  app.use('/users', userRouter);
  app.use('/users', userRouter);
  app.use('/users', userRouter);

  app.get('/*', function(req, res) {
    res.redirect('/');
  });

  require('../MySQL/users/usersRoutes.js')(userRouter);
  require('../MySQL/collections/collectionsRoutes.js')(collectionRouter);
};