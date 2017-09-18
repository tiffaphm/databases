var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // req.statusCode = 200;
      // req.setHeader('Content-Type', 'application/json');
      // req.end(JSON.stringify(message));
    }, // a function which handles a get request for all messages
    post: function (req, res) {

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

