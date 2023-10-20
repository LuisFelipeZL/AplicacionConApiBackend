CREATE DATABASE  IF NOT EXISTS `inmobiliara_model_1` ;
USE `inmobiliara_model_1`;


DROP TABLE IF EXISTS `authors`;

CREATE TABLE `authors` (
  `authorid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`authorid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `authors` WRITE;

INSERT INTO `authors` VALUES (1,'Julieta','julieta_11_2@gmail.com','https://4.bp.blogspot.com/-XTj2j1Mf2To/WJHZujQ79WI/AAAAAAAAAcU/c7tg_0ktzzs80g5JYAiN72IqKWhhpqAQACLcB/s1600/avatar%2Bchica.png'),(2,'Martina','martina_99_22@gmail.com','http://3.bp.blogspot.com/-NsVwoVL3fwM/VXB_WelG4jI/AAAAAAAAAYc/Pu4XZ5ezUvE/s1600/myAvatar.png'),(3,'Jose Hernandez','jose_hernandez@gmail.com','https://i.pinimg.com/236x/e9/57/2a/e9572a70726980ed5445c02e1058760b.jpg');

UNLOCK TABLES;



DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `postid` tinyint NOT NULL AUTO_INCREMENT,
  `title` varchar(65) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorid` int NOT NULL,
  PRIMARY KEY (`postid`),
  KEY `fk_blogs_authors_idx` (`authorid`),
  CONSTRAINT `fk_blogs_authors` FOREIGN KEY (`authorid`) REFERENCES `authors` (`authorid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




LOCK TABLES `posts` WRITE;

INSERT INTO `posts` VALUES (1,'Arial Black','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','2022-11-07 12:22:43','Sport',1),(2,'Lorem Ipsum','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','2022-11-07 12:22:54','News',2),(3,'Comic Sans','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','2022-11-07 12:23:12','News',1);

UNLOCK TABLES;


