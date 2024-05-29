// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma de l'utilisateur
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('User', UserSchema);
