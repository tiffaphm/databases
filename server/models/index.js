// var db = require('../db');
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'plantlife');


var Messages = db.define('Messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  text: Sequelize.STRING,
  username_id: {
    type: Sequelize.INTEGER,
    references: "Users",
    referencesKey: "id"
  },
  roomname_id: {
    type: Sequelize.INTEGER,
    references: "Rooms",
    referencesKey: "id"
  }
}, {
  timestamps: false
});

var Users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username: Sequelize.STRING
}, {
  timestamps: false
});

var Rooms = db.define('Rooms', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  roomname: Sequelize.STRING
}, {
  timestamps: false
});




module.exports = {
  messages: {
    get: function () {
      var messages = Messages.findAll();
      return messages;
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

        var sql = 'INSERT INTO messages SET ?';
        db.dbConnection.query(sql, obj, function (err, result) {
          if (err) { console.log(err); }
          console.log('message inserted');
        });
      });

      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      return Users.findAll();
    },
    post: function (username) {
      return Users.create({
        username: username
      });
    }
  },

  rooms: {
    get: function() {
      var rooms = Rooms.findAll();
      return rooms;

      // var sql = sql || 'SELECT roomname from rooms';
      // db.dbConnection.query(sql, function (err, result) {
      //   if (err) { console.log(err); }
      //   callback(result);
      // });
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

