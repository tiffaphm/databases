DROP DATABASE IF EXISTS `chat`;
CREATE DATABASE chat;

USE chat;

-- DROP TABLE IF EXISTS `messages`;
-- CREATE TABLE messages (
--   message_id INT NOT NULL AUTO_INCREMENT,
--   username VARCHAR(100) NOT NULL,
--   message VARCHAR(200) NOT NULL,
--   roomname VARCHAR(100) NOT NULL,
--   PRIMARY KEY ( message_id )
-- );

-- /* Create other tables and define schemas for them here! */




-- /*  Execute this file from the command line by typing:
--  *    mysql -u root < server/schema.sql
--  *  to create the database and the tables.*/

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'username'
-- 
-- ---

DROP TABLE IF EXISTS `username`;
    
CREATE TABLE `username` (
  `username_id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (`username_id`)
);

-- ---
-- Table 'roomname'
-- 
-- ---

DROP TABLE IF EXISTS `roomname`;
    
CREATE TABLE `roomname` (
  `roomname_id` INTEGER NOT NULL AUTO_INCREMENT,
  `roomname` VARCHAR(100) NOT NULL DEFAULT 'NOT NULL',
  PRIMARY KEY (`roomname_id`)
);

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `messages_id` INTEGER NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(200) NOT NULL DEFAULT 'NOT NULL',
  PRIMARY KEY (`messages_id`)
);

-- ---
-- Table 'user_room'
-- 
-- ---

DROP TABLE IF EXISTS `user_room`;
    
CREATE TABLE `user_room` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username_id` INTEGER NOT NULL,
  `roomname_id` INTEGER NOT NULL,
  `messages_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

-- ALTER TABLE `user_room` ADD FOREIGN KEY (username_id) REFERENCES `username` (`username_id`);
-- ALTER TABLE `user_room` ADD FOREIGN KEY (roomname_id) REFERENCES `roomname` (`roomname_id`);
-- ALTER TABLE `user_room` ADD FOREIGN KEY (messages_id) REFERENCES `messages` (`messages_id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `username` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `roomname` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user_room` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `username` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `roomname` (`id`,`roomname`) VALUES
-- ('','');
-- INSERT INTO `messages` (`id`,`message`) VALUES
-- ('','');
-- INSERT INTO `user_room` (`id`,`username_id`,`roomname_id`,`messages_id`) VALUES
-- ('','','','');