// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Route pour ajouter un livre à la collection
router.post('/addBook', async (req, res) => {
    const { title, author, image, status, pages, category } = req.body;
    try {
        const newBook = new Book({ title, author, image, status, pages, category });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour récupérer tous les livres de la collection
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour récupérer un livre spécifique par ID
router.get('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour récupérer des livres filtrés
router.get('/book/filter/:filter', async (req, res) => {
    const { filter } = req.params;
    try {
        const books = await Book.find({ category: filter });
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour modifier l'état d'un livre
router.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const book = await Book.findByIdAndUpdate(id, { status }, { new: true });
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour mettre à jour la page en cours de lecture
router.put('/book/status/:id', async (req, res) => {
    const { id } = req.params;
    const { currentPage } = req.body;
    try {
        const book = await Book.findByIdAndUpdate(id, { currentPage }, { new: true });
        if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour ajouter un livre en favori
router.post('/book/:id/favorite', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        if (!user.favorites.includes(id)) {
            user.favorites.push(id);
            await user.save();
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route pour supprimer un livre des favoris
router.delete('/book/:id/favorite', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        user.favorites = user.favorites.filter(favId => favId.toString() !== id);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
