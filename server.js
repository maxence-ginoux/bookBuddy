// server.js
// Import des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialisation de l'application Express
const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Configuration de la connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/booktracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Définition du port d'écoute
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
