
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table `categories`

LOCK TABLES `categories` WRITE;

INSERT INTO `categories` VALUES (2,'Animaux'),(4,'Comic'),(1,'Drôle'),(5,'Gaming'),(3,'Meme'),(6,'Random');

UNLOCK TABLES;

-- Table structure for table `comments`

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Posts_id` int NOT NULL,
  `Users_id` int NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`,`Posts_id`,`Users_id`),
  KEY `fk_Comments_Users1_idx` (`Users_id`),
  KEY `fk_Comments_Posts1_idx` (`Posts_id`),
  CONSTRAINT `fk_Comments_Posts1` FOREIGN KEY (`Posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_Comments_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table `comments`

LOCK TABLES `comments` WRITE;

INSERT INTO `comments` VALUES (195,4,2,'2020-09-12 13:57:43','LOL'),(196,5,2,'2020-09-12 14:02:34','ça m\''arrive aussi jajaja');

UNLOCK TABLES;

-- Table structure for table `posts`


DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Users_id` int NOT NULL,
  `Categories_id` int NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(100) COLLATE utf8_bin NOT NULL,
  `image_url` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`,`Users_id`,`Categories_id`),
  KEY `fk_Posts_Categories_idx` (`Categories_id`),
  KEY `fk_Posts_Users1_idx` (`Users_id`),
  CONSTRAINT `fk_Posts_Categories` FOREIGN KEY (`Categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_Posts_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table `posts`

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,2,'2020-07-23 10:35:01','jajajajajaja','https://petcube.com/blog/content/images/2017/07/comic-cat-biting.jpg'),(2,2,6,'2020-07-24 09:37:01','Quand ta journée n\''est pas la meilleur et tu trouve rien sur 9gag','https://img-9gag-fun.9cache.com/photo/az9pe1b_700bwp.webp'),(3,2,1,'2020-07-23 09:35:01','BA DUM TSSSS !','https://img-9gag-fun.9cache.com/photo/aAeXpG9_460swp.webp'),(4,1,4,'2020-07-26 07:35:01','Trop Mignon !','https://img-9gag-fun.9cache.com/photo/aeMqjmq_700bwp.webp'),(5,3,3,'2020-07-27 06:35:01','Tout à fait !','https://img-comment-fun.9cache.com/media/aG1bm35/am0XnRwP_700w_0.jpg'),(43,49,1,'2020-09-07 12:28:58','Quand ta bouche est en pâte à modeler :P','https://jnews.io/gag/wp-content/uploads/sites/9/2017/03/wow.gif');

UNLOCK TABLES;

-- Table structure for table `reactions`

DROP TABLE IF EXISTS `reactions`;

CREATE TABLE `reactions` (
  `Posts_id` int NOT NULL,
  `Users_id` int NOT NULL,
  `reaction` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`Posts_id`,`Users_id`),
  KEY `fk_Likes_Users1_idx` (`Users_id`),
  KEY `fk_Reactions_Posts1_idx` (`Posts_id`),
  CONSTRAINT `fk_Likes_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_Reactions_Posts1` FOREIGN KEY (`Posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table `reactions`


LOCK TABLES `reactions` WRITE;
INSERT INTO `reactions` VALUES (1,1,'like'),(1,2,'like'),(1,3,'like');
UNLOCK TABLES;

-- Table structure for table `users`

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT 'user',
  `user_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `firstName` varchar(45) COLLATE utf8_bin NOT NULL,
  `lastName` varchar(45) COLLATE utf8_bin NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(60) COLLATE utf8_bin NOT NULL,
  `photo_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `department` varchar(65) COLLATE utf8_bin DEFAULT NULL,
  `role` varchar(65) COLLATE utf8_bin DEFAULT NULL,
  `linkedin_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Dumping data for table `users`

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'user','2020-03-05 11:32:07','Angela','GALINDO','a.galindo@groupomania.fr','$2b$10$nkBYDHxZjjWZCi9Tk59d0ujSOIGebPMxJqW4dCRW7P6Id78saPYhq','https://files.virgool.io/upload/users/127995/posts/pbxripaxe0hd/stviq4afzoq6.jpeg','Resources Humaines','Chargée du Comité d\''Entreprise','https://www.linkedin.com/'),(2,'user','2020-03-07 10:55:15','Jean','DUPONT','j.dupont@groupomania.fr','$2b$10$7gUkD19837Ddc/mWrGDyreI06HyPMsljxkkt8ualNrgAn1xyG1aw6','https://gbpoultryblog.files.wordpress.com/2017/06/random-guy.jpg','Gestion de la Relation Client','Chargé de l\'implementation de SalesForce','https://www.linkedin.com/jeandupont'),(3,'user','2020-07-07 05:55:15','Cassandra','LAFAURIE','c.lafaurie@groupomania.fr','123456','https://quizly-s3-sparklette.netdna-ssl.com/wp-content/uploads/2017/10/16144720/30-year-old-woman-e1508256619164-300x300.png','Direction des Systèmes d\'Information','Directrice des Services Informatiques','https://www.linkedin.com/'),(49,'admin','2020-08-30 17:38:56','Sheshuang','XIE','s.xie@groupomania.fr','$2b$10$oqLJqUUubBpiIL2zqMUEX.pjUup8thaBNe5s1x9.pAZzi4GSj.9OG','https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260','Resources Humaines','Chargée de Communication sur les Reseaux Sociaux','https://www.linkedin.com/');

UNLOCK TABLES;

