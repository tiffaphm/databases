var models = require('../models');
var queryString = require('query-string');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then((data) => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          var obj = {results: data};
          res.end(JSON.stringify(obj));
        });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var body = req.body;
      req.statusCode = 302;
      res.end();
      models.messages.post(body);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      
      models.users.get()
        .then((data) => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          var obj = {results: data};
          res.end(JSON.stringify(obj));
        })
        .catch((err) => {
          res.statusCode = 404; // needs a review/testing
          console.log(err);
          res.end();
        });

    },
    post: function (req, res) {
      var body = req.body;
      models.users.post(body.username)
        .then(() => {
          req.statusCode = 302;
          res.end();
        });
    }
  },

  rooms: {
    // Ditto as above
    get: function (req, res) {
      models.rooms.get()
        .then((data) => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          var obj = {results: data};
          res.end(JSON.stringify(obj));
        });
    },
    post: function (req, res) {
      var body = req.body;
      models.rooms.post(body.roomname)
        .then(() => {
          req.statusCode = 302;
          res.end();
        });
    }
  }
};

