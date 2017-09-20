// var db = require('../db');
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'plantlife');

var Users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING
}, {
  timestamps: false
});

var Rooms = db.define('Rooms', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomname: Sequelize.STRING
}, {
  timestamps: false
});

var Messages = db.define('Messages', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: Sequelize.STRING,
  username_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'id'
    }
  },
  roomname_id: {
    type: Sequelize.INTEGER,
    references: {
      mode: Rooms,
      key: 'id'
    }
  }
}, {
  timestamps: false
});




//Messages.hasMany(Users, { foreignKey: 'username_id', sourceKey: 'id'});
//Messages.hasMany(Rooms, { foreignKey: 'roomname_id', sourceKey: 'id'});


module.exports = {
  messages: {
    get: function () {
      return Messages.findAll();
    }, // a function which produces all the messages
    post: function (body) {
      var sql = `SELECT users.id as username_id, rooms.id as roomname_id FROM users, rooms WHERE username = "${body.username}" AND roomname = "${body.roomname}"`;
      db.query(sql)
        .then( (data) => {
          obj = {
            text: body.text,
            username_id: data[0][0].username_id,
            roomname_id: data[0][0].roomname_id
          };
          return Messages.create(obj);
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
      return Rooms.findAll();
    },
    post: function(roomname) {
      return Rooms.create({
        roomname: roomname
      });
    }
  }
};

