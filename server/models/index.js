var db = require('../db');

module.exports = {
  messages: {
    get: function () {

    }, // a function which produces all the messages
    post: function (message) {
      console.log(message);
      var sql = `INSERT INTO messages (message) VALUES ("${message}")`;
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        console.log('message inserted');
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function (username) {
      var sql = `INSERT INTO username (username) VALUES ('${username}')`;
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        console.log('username inserted');
      });
    }
  }
};

