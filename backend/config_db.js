const mysql = require("mysql");
require("dotenv").config();

const connectParams = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWD,
});

const db = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWD,
    database: process.env.SQL_DB,
});
// DataBase

const schema = `CREATE DATABASE ${process.env.SQL_DB}`;

// user table

const userTable =
    "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `account` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT 'user', `user_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `firstName` varchar(45) COLLATE utf8_bin NOT NULL, `lastName` varchar(45) COLLATE utf8_bin NOT NULL, `email` varchar(100) COLLATE utf8_bin NOT NULL, `password` varchar(60) COLLATE utf8_bin NOT NULL, `pictureurl` varchar(255) COLLATE utf8_bin DEFAULT NULL, `department` varchar(65) COLLATE utf8_bin DEFAULT NULL, `role` varchar(65) COLLATE utf8_bin DEFAULT NULL, `linkedin_url` varchar(255) COLLATE utf8_bin DEFAULT NULL, PRIMARY KEY (`id`), UNIQUE KEY `email_UNIQUE` (`email`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";

// categories table

const categoriesTable =
    "CREATE TABLE `categories` (`id` int NOT NULL AUTO_INCREMENT, `category` varchar(255) COLLATE utf8_bin NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `name_UNIQUE` (`category`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";

const InsertCategories =
    "INSERT INTO `categories` (`category`) VALUES ('Passions'),('Sciences'),('Best Of Groupomania'),('Rencontre');";

// posts table

const postTable =
    "CREATE TABLE `posts` (`id` int NOT NULL AUTO_INCREMENT, `Users_id` int NOT NULL, `Categories_id` int NOT NULL, `post_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `title` varchar(100) COLLATE utf8_bin NOT NULL, `image_url` text COLLATE utf8_bin NOT NULL, PRIMARY KEY (`id`,`Users_id`,`Categories_id`), KEY `fk_Posts_Categories_idx` (`Categories_id`), KEY `fk_Posts_Users1_idx` (`Users_id`),  CONSTRAINT `fk_Posts_Categories` FOREIGN KEY (`Categories_id`) REFERENCES `categories` (`id`), CONSTRAINT `fk_Posts_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";

// comments table

const commentsTable =
    "CREATE TABLE `comments` ( `id` int NOT NULL AUTO_INCREMENT, `Posts_id` int NOT NULL, `Users_id` int NOT NULL, `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `message` varchar(255) COLLATE utf8_bin NOT NULL, PRIMARY KEY (`id`,`Posts_id`,`Users_id`), KEY `fk_Comments_Users1_idx` (`Users_id`), KEY `fk_Comments_Posts1_idx` (`Posts_id`), CONSTRAINT `fk_Comments_Posts1` FOREIGN KEY (`Posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_Comments_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";

// Likes table

const LikesTable =
    "CREATE TABLE `Likes` (`Posts_id` int NOT NULL, `Users_id` int NOT NULL, `reaction` varchar(45) COLLATE utf8_bin NOT NULL, PRIMARY KEY (`Posts_id`,`Users_id`), KEY `fk_Likes_Users1_idx` (`Users_id`), KEY `fk_Likes_Posts1_idx` (`Posts_id`), CONSTRAINT `fk_Likes_Users1` FOREIGN KEY (`Users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE, CONSTRAINT `fk_Likes_Posts1` FOREIGN KEY (`Posts_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;";

const globalSelect = "SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));";

const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(query, function (err, result) {
                if (err) throw err;
                resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
};

const runInstall = () => {
    const cycle = async () => {
        const createDB = () => {
            return new Promise((resolve, reject) => {
                try {
                    connectParams.connect(function (err) {
                        if (err) throw err;
                        console.log("--- Bienvenu au configurateur de la base de donn??es pour groupomania ---");
                        console.log("Veuillez patienter quelques seconds...");
                        console.log("Connect?? au serveur MySQL");
                        connectParams.query(schema, function (err, result) {
                            if (err) throw err;
                            console.log(`Schema ${process.env.SQL_DB} cr???? correctement`);
                            resolve(true);
                        });
                    });
                } catch (err) {
                    reject(err);
                }
            });
        };
        await createDB();
        db.connect(async function (err) {
            if (err) throw err;
            try {
                const users = await runQuery(userTable);
                console.log("Tableau users cr???? correctement");
                const categories = await runQuery(categoriesTable);
                console.log("Tableau categories cr???? correctement");
                const categoryValues = await runQuery(InsertCategories);
                console.log("categories cr????es correctement");
                const post = await runQuery(postTable);
                console.log("Tableau posts cr???? correctement");
                const comments = await runQuery(commentsTable);
                console.log("Tableau comments cr???? correctement");
                const Likes = await runQuery(LikesTable);
                console.log("Tableaux Likes cr???? correctement");
                const selectInfo = await runQuery(globalSelect);
                console.log("option global select activ??e");
                console.log("Votre base de donn??es a ??t?? bien configur??e");
                console.log("--- Fin du programme ---");
                process.exit();
            } catch (err) {
                console.log("ERROR =>", err);
            }
        });
    };
    cycle();
};

runInstall();
