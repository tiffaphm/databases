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
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER(10) NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(400) NOT NULL,
  `username_id` INTEGER(4) NOT NULL,
  `roomname_id` INTEGER(4) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER(10) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  CONSTRAINT `id_username` UNIQUE (id, username),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` INTEGER(10) NOT NULL AUTO_INCREMENT,
  `roomname` VARCHAR(100) NOT NULL UNIQUE,
  CONSTRAINT `id_roomname` UNIQUE (id, roomname),
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (username_id) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (roomname_id) REFERENCES `rooms` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `messages` (`id`,`text`,`username_id`,`roomname_id`) VALUES
-- ('','','','');
-- INSERT INTO `users` (`id`,`username`) VALUES
-- ('','');
-- INSERT INTO `rooms` (`id`,`roomname`) VALUES
-- ('','');