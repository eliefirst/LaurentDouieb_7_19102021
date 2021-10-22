Creation Backend
#  Groupomania Installation#
'cd backend'
install npm install
npm init


Groupomania Installation
cd backend
install npm install
npm init
cd backend
npm install --save nodemon;
npm install --save bcrypt;
npm install --save dotenv;
npm install --save express;
npm install --save express-bouncer;
npm install --save jsonwebtoken;
npm install --save multer;
npm install --save sanitize-middleware;
npm install --save secure-password-validator;
npm install --save toobusy-js;
npm install --save validator;
npm install --save cors;
npm install --save helmet;
npm install --save mysql;
npm install --save ratelimit;
npm install --save toobusy;
npm install fs-extra
    

touch server.js;
mkdir controller;
mkdir models;
mkdir routes;
mkdir middelware;
touch .gitignore;
touch app.js


touch app.js
npm start
nodemon server
//npm i maskdata --save

SELECT user, host FROM mysql.user;
mysql -h localhost -u elie -p
pour mysql revenir a 
ALTER USER 'elie'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Ut4h0us!';
DROP DATABASE p7openclass;

SHOW DATABASES;
SHOW GLOBAL VARIABLES LIKE 'PORT';

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Ut4h0us!';
GRANT ALL PRIVILEGES ON p7openclass.* TO 'admin'@'localhost';
 
 SELECT user, host FROM mysql.user;


 mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| groupomania        |
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
7 rows in set (0.00 sec)

mysql> SELECT user, host FROM mysql.user;
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| admin            | localhost |
| elie             | localhost |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
6 rows in set (0.00 sec)

mysql> use groupomania
Database changed
mysql> show tables;
+-----------------------+
| Tables_in_groupomania |
+-----------------------+
| categories            |
| comments              |
| posts                 |
| Likes             |
| users                 |
+-----------------------+
5 rows in set (0.03 sec)

mysql> describe comments;
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| id           | int          | NO   | PRI | NULL              | auto_increment    |
| Posts_id     | int          | NO   | PRI | NULL              |                   |
| Users_id     | int          | NO   | PRI | NULL              |                   |
| comment_date | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| message      | varchar(255) | NO   |     | NULL              |                   |
+--------------+--------------+------+-----+-------------------+-------------------+
5 rows in set (0.02 sec)
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| groupomania        |
| information_schema |
| mysql              |
| performance_schema |
| sakila             |
| sys                |
| world              |
+--------------------+
7 rows in set (0.00 sec)

mysql> SELECT user, host FROM mysql.user;
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| admin            | localhost |
| elie             | localhost |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
6 rows in set (0.00 sec)

mysql> use groupomania
Database changed
mysql> show tables;
+-----------------------+
| Tables_in_groupomania |
+-----------------------+
| categories            |
| comments              |
| posts                 |
| Likes             |
| users                 |
+-----------------------+
5 rows in set (0.03 sec)

mysql> describe comments
    -> ;
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| id           | int          | NO   | PRI | NULL              | auto_increment    |
| Posts_id     | int          | NO   | PRI | NULL              |                   |
| Users_id     | int          | NO   | PRI | NULL              |                   |
| comment_date | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| message      | varchar(255) | NO   |     | NULL              |                   |
+--------------+--------------+------+-----+-------------------+-------------------+
5 rows in set (0.02 sec)
mysql> describe categories;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| category | varchar(255) | NO   | UNI | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
2 rows in set (0.01 sec)

mysql> describe posts;
+---------------+--------------+------+-----+-------------------+-------------------+
| Field         | Type         | Null | Key | Default           | Extra             |
+---------------+--------------+------+-----+-------------------+-------------------+
| id            | int          | NO   | PRI | NULL              | auto_increment    |
| Users_id      | int          | NO   | PRI | NULL              |                   |
| Categories_id | int          | NO   | PRI | NULL              |                   |
| post_date     | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| title         | varchar(100) | NO   |     | NULL              |                   |
| image_url     | text         | NO   |     | NULL              |                   |
+---------------+--------------+------+-----+-------------------+-------------------+
6 rows in set (0.01 sec)

mysql> describe users;
+--------------+--------------+------+-----+-------------------+-------------------+
| Field        | Type         | Null | Key | Default           | Extra             |
+--------------+--------------+------+-----+-------------------+-------------------+
| id           | int          | NO   | PRI | NULL              | auto_increment    |
| account      | varchar(45)  | NO   |     | user              |                   |
| user_created | timestamp    | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| firstName    | varchar(45)  | NO   |     | NULL              |                   |
| lastName     | varchar(45)  | NO   |     | NULL              |                   |
| email        | varchar(100) | NO   | UNI | NULL              |                   |
| password     | varchar(60)  | NO   |     | NULL              |                   |
| pictureurl    | varchar(255) | YES  |     | NULL              |                   |
| department   | varchar(65)  | YES  |     | NULL              |                   |
| role         | varchar(65)  | YES  |     | NULL              |                   |
| linkedin_url | varchar(255) | YES  |     | NULL              |                   |
+--------------+--------------+------+-----+-------------------+-------------------+
11 rows in set (0.01 sec)

mysql> describe Likes;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| Posts_id | int         | NO   | PRI | NULL    |       |
| Users_id | int         | NO   | PRI | NULL    |       |
| reaction | varchar(45) | NO   |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
