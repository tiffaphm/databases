var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // var sql = 'SELECT username_id, roomname_id, text FROM messages';
      var sql = 'select messages.text, users.username, rooms.roomname from messages, users, rooms where messages.username_id = users.id AND messages.roomname_id=rooms.id;';
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        var newArray = [];
        console.log('this is the result', result);
        for (let i = 0; i < result.length; i++) {
          let obj = {};
          
          obj['text'] = result[i].text;
          obj['username'] = result[i].username;
          obj['roomname'] = result[i].roomname;
          
          newArray.push(obj);
        }

        callback(newArray);
      });
     
    }, // a function which produces all the messages
    post: function (body) {
      console.log('post request recieved is', body);
      var obj = {};

      // text
      obj['text'] = body.text;
      
      // roomId
      var sql = `SELECT id FROM rooms WHERE roomname = "${body.roomname}"`;
      module.exports.rooms.get(sql, (roomId) => {
        obj['roomId'] = roomId;
      });

      // userId
      var sql = `SELECT id FROM users WHERE username = "${body.username}"`;
      module.exports.users.get(sql, (userId) => {
        obj['userId'] = userId;
      });

      var sql = `INSERT INTO messages (username_id, roomname_id, text) VALUES (${obj['userId']}, ${obj['roomId']}, "${obj['text']}")`;
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        console.log('message inserted');
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (sql, callback) {
      var sql = sql || 'SELECT username from users';
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        callback(result);
      });
    },
    post: function (username) {
      console.log('post username is', username);
      var sql = `INSERT INTO users (username) VALUES ("${username}")`;
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        console.log('username inserted');
      });
    }
  },

  rooms: {
    get: function(sql, callback) {
      var sql = sql || 'SELECT roomname from rooms';
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        callback(result);
      });
    },
    post: function(roomname) {
      var sql = `INSERT INTO rooms (roomname) VALUES ("${roomname}")`;
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        console.log('roomname inserted');
      });
    }
  }
};

