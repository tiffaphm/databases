var models = require('../models');
var queryString = require('query-string');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(result) {
        res.send(JSON.stringify(result));
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

