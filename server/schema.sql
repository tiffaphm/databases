DROP DATABASE IF EXISTS `chat`;
CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS `messages`;
CREATE TABLE messages (
  message_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  message VARCHAR(200) NOT NULL,
  roomname VARCHAR(100) NOT NULL,
  PRIMARY KEY ( message_id )
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

