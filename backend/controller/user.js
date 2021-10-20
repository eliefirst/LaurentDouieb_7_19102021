"use strict";

//bcrypt pour crypter les mots de passe
//créer et vérifier les tokens d'authentification
//'User' deux fonctions 'signup' et 'login'
//crypte email++ Maskdata
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require("mysql");
const fs = require("fs");
const validator = require("validator");
const passValid = require("secure-password-validator");

///////////////////////////////////////

// ---- Fonction/Middleware 'login' permettant de connecter les utilisateurs existants ---- //

exports.login = (req, res, next) => {
    const emailMask2Options = {
        maskWith: "*",
        unmaskedStartCharactersBeforeAt: 3,
        unmaskedEndCharactersAfterAt: 5,
        maskAtTheRate: false
    };
    // Récupération de l'utilisateur de la base de données qui correspond à l'adresse email rentrée
    const email = req.body.email;

    User.findOne({ email: Maskdata.maskEmail2(email, emailMask2Options) })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé ! ' })
            }
            // Comparaison du mdp rentré avec le hash qui est gardé dans la base de données
            bcrypt.compare(req.body.password, user.password)
                // Si la comparaison est mauvaise on renvoie un message d'erreur
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    // On renvoie l'identifiant de l'utilisateur et un TOKEN permettant de se connecter à sa session
                    res.status(200).json({
                        userId: user._id,
                        // Méthode sign de jwt pour encoder un nouveau token
                        token: jwt.sign(
                            // Ce token contient l'ID de l'utilisateur en tant que payload (données encodées dans le token)
                            { userId: user._id },
                            // Chaîne secrète de développement temporaire pour encoder notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production)
                            process.env.TOKEN_SECRET_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};