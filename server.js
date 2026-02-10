const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
  
  process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/recipes-api', (req, res) => {
  res.json({ message: "Success!" });
});

let recipes = []; // Temporary data storage

// GET: Retrieve all recipes
app.get('/recipes-api', (req, res) => {
  res.json({ 
    success: true, 
    data: recipes 
  });
});

// POST: Add a new recipe
app.post('/recipes-api', (req, res) => {
  const newRecipe = req.body; // Extract data from the request body
  
  if (!newRecipe.name) {
    return res.status(400).json({ error: "Recipe name is required" });
  }

  recipes.push(newRecipe); // Save the recipe to our list
  res.status(201).json({ 
    message: "Recipe added successfully!", 
    recipe: newRecipe 
  });
});