SET NAMES utf8;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS Likes;

CREATE TABLE users (
  id SMALLINT unsigned NOT NULL AUTO_INCREMENT,
  account VARCHAR(45)  NOT NULL DEFAULT user,
  user_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45)  NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) DEFAULT NULL,
  department VARCHAR(255) DEFAULT NULL,
  role VARCHAR(255) DEFAULT NULL,
  linkedin_url VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY ind_uni_email (email)
) ENGINE=InnoDB;


CREATE TABLE categories  (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  category VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name_UNIQUE (category)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT;


CREATE TABLE comments (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  post_id MEDIUMINT unsigned NOT NULL, /*3 octet-non negatif*/
  user_id SMALLINT unsigned,
  comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  message  varchar(255) NOT NULL,
  PRIMARY KEY (id,posts_id,Users_id),
  KEY fk_Comments_Users1_idx (Users_id),
  KEY fk_Comments_posts1_idx (posts_id),
  CONSTRAINT fk_Comments_posts1 FOREIGN KEY (posts_id) REFERENCES posts (id) ON DELETE CASCADE;
  CONSTRAINT fk_Comments_Users1 FOREIGN KEY (Users_id) REFERENCES users (id) ON DELETE CASCADE;
) ENGINE=InnoDB;


CREATE TABLE posts (
  id MEDIUMINT unsigned NOT NULL AUTO_INCREMENT,
  Users_id INT NOT NULL,
  Categories_id INT NOT NULL,
  post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(100) COLLATE utf8_bin NOT NULL,
  image_url TEXT COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (id,Users_id,Categories_id),
  KEY fk_posts_Categories_idx (Categories_id),
  KEY fk_posts_Users1_idx (Users_id),
  CONSTRAINT fk_posts_Categories FOREIGN KEY (Categories_id) REFERENCES categories (id),
  CONSTRAINT fk_posts_Users1 FOREIGN KEY (Users_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT;


CREATE TABLE Likes (
  posts_id INT NOT NULL,
  Users_id INT NOT NULL,
  reaction VARCHAR(45) NOT NULL,
  PRIMARY KEY (posts_id,Users_id),
  KEY fk_Likes_Users1_idx (Users_id),
  KEY fk_Likes_posts1_idx (posts_id),
  CONSTRAINT fk_Likes_User1 FOREIGN KEY (Users_id) REFERENCES users (id) ON DELETE CASCADE;
  CONSTRAINT fk_Likes_posts1 FOREIGN KEY (posts_id) REFERENCES posts (id) ON DELETE CASCADE;
) ENGINE=InnoDB;

