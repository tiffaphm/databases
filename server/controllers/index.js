var models = require('../models');
var queryString = require('query-string');

module.exports = {
  messages: {
    get: function (req, res) {
      res.writeHead(200, {'Content-Type': 'application/json'});

      models.messages.get(function(result) {
        var obj = {results: result};
        res.end(JSON.stringify(obj));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('checking if POST request is working');
      var body = req.body;
      req.statusCode = 302;
      res.end();
      models.messages.post(body);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var body = req.body;
      req.statusCode = 302;
      res.end();
      models.users.post(body.username);
    }
  }
};

