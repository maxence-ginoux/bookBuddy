// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma du livre
const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: String,
    status: {
        type: String,
        enum: ['à lire', 'en cours de lecture', 'fini'],
        default: 'à lire'
    },
    pages: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    currentPage: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Book', BookSchema);

