var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      var sql = 'SELECT username, message, roomname FROM messages';
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        callback(result);
      });
     
    }, // a function which produces all the messages
    post: function (body) {
      console.log('post request recieved is', body);
      var message = body.message;
      var roomname = body.roomname;
      var username = body.username;
      var sql = `INSERT INTO messages (username, message, roomname) VALUES ("${username}", "${message}", "${roomname}")`;
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

