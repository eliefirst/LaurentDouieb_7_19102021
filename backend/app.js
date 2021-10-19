"use strict";

// Middleware Imports
const express = require('express'); 
const path = require('path'); 
require('dotenv').config();

// securite
// Import de Cors (pour éviter erreur CORS)
const cors = require('cors');
// Import du plugin helmet pour sécuriser les en-têtes HTTP
const helmet = require("helmet");
//Import Sanitize-middleware nettoie  la requête,  paramètres body des requêtes pour se protéger contre les scripts intersites (XSS) et les attaques par injection
const sanitizeMiddleware = require("sanitize-middleware");

//import bouncer atténuer les attaques par force brute
const bouncer = require("express-bouncer")(10000, 600000, 5);
// import toobusy interroge la boucle d'événements node.js et garde une trace du "lag", qui correspond aux longues requêtes en attente dans la file d'attente des événements du nœud pour être traitées.
const toobusy = require("toobusy-js");
// Import de express-rate-limit pour prévenir les attaques par force brute (envoi d'un flux infini de requêtes à une API)
const rateLimit = require("express-rate-limit");
// Limit du nombre de connexions d'un seul utilisateur (en lien avec rateLimit)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // à 15 minutes
  max: 100 // et chaque adresse IP est limitée à 100 requêtes


});
const HttpError = require("./models/http-error");





// IMPORTATIONS ROUTEURS

const userRoutes = require('./routes/user');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const postRoutes = require('./routes/posts');



// -----------------------MIDDLEWARES
// app.use = Applique le middleware à toutes les requêtes

// Fonction permettant d'appeler la fonction express (créer une application Express)
const app = express();

// Middleware global remplaçant body-parser (méthode de body-parser pour transformer le corps de la requête en JSON / objet JS utilisable)
app.use(express.json());

// Message s'affichant dans la console quand une requête est reçue
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

// Middleware général appliqué à toute les réquêtes et réponses
// Headers permettent d'accéder : à notre API depuis n'importe quelle origine ( '*' )
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.)
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware global pour éviter erreur CORS
app.use(cors());
// Bouncer Middleware (Brute force Attack)
bouncer.blocked = function (req, res, next, remaining) {
    res.status(429).send("Too many requests have been made, " + "please wait " + remaining / 1000 + " seconds");
};
// Too Busy Middleware (DoS Attacks)
app.use(function (req, res, next) {
    if (toobusy()) {
        res.status(503).send("Server Too Busy");
    } else {
        next();
    }
});

// Express Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize Middleware attaques par injection
app.use(sanitizeMiddleware());

// Pour la securite
app.use(helmet()); // Middleware pour sécuriser les en-têtes HTTP
app.disable('x-powered-by'); // Désactivation de l’en-tête 'X-Powered-By' pour empêcher les intrus de l'utiliser (en-tête activé par défaut)
app.use(limiter); // Middleware pour prévenir les attaques par force brute

// Middleware pour la gestion de l'enregistrement des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware servant à utiliser les routes 
app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/profile", userRoutes);
app.use("/posts", postRoutes);

// Error Handling 404
app.use((req, res, next) => {
    const error = new HttpError("Route non trouvée", 404);
    throw error;
});

// Error Handling App
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Un problème est survenu sur le serveur, veuillez réessayer ultérieurement" });
});

// Exporter cette application pour pouvoir y accéder depuis d'autres fichiers du projet (serveur Node)
module.exports = app;