const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Schema
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [String],
  instructions: String,
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.json({ success: true, data: allRecipes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a recipe
router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json({ success: true, data: savedRecipe });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
