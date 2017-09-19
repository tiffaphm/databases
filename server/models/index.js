var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // var sql = 'SELECT username_id, roomname_id, text FROM messages';
      var sql = 'select messages.text, users.username, rooms.roomname from messages, users, rooms where messages.username_id = users.id AND messages.roomname_id=rooms.id;';
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        var newArray = [];
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
      obj.text = body.text;

      // userId
      var sql = `SELECT users.id as username_id, rooms.id as roomname_id FROM users, rooms WHERE username = "${body.username}" AND roomname = "${body.roomname}"`;
      db.dbConnection.query(sql, (err, result) => {
        if (obj.username_id === undefined) {

        }
        obj.username_id = result[0].username_id;
        obj.roomname_id = result[0].roomname_id;

        var sql = 'INSERT IGNORE INTO messages SET ?';
        db.dbConnection.query(sql, obj, function (err, result) {
          if (err) { console.log(err); }
          console.log('message inserted');
        });
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
      var sql = `INSERT IGNORE INTO users (username) VALUES ("${username}")`;
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
      var sql = `INSERT IGNORE INTO rooms (roomname) VALUES ("${roomname}")`;
      db.dbConnection.query(sql, function (err, result) {
        if (err) { console.log(err); }
        console.log('roomname inserted');
      });
    }
  }
};

