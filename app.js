const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));

  const Recipe = require("./models/Recipe.model");


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res, next) => {
    Recipe.create({
      title: req.body.title,
      instructions: req.body.instructions,
      level: req.body.level,
      ingredients: req.body.ingredients,
      image:req.body.image,
      duration: req.body.duration,
      isArchived: req.body.isArchived,
      created: req.body.created,
    })
      .then((createdRecipe) => {
          console.log("Recipe created ->", createdRecipe);
          res.status(201).send(createdRecipe);
    })
      .catch((error) => {
        console.error("Error while creating recipe ->", error);
        res.status(500).send({ error: "Failed to create recipe" });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", (req, res, next) => {
    Recipe.find({})
      .then((recipes) => {
        console.log("Retrieved Recipes ->",recipes);
        res.status(200).json(recipes);
      })
      .catch((error) => {
        console.error("Error while retrieving recipes ->", error);
        res.status(500).send({ error: "Failed to retrieve recipes" });
      });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:id", (req, res, next) => {
    const { id } = req.params;
    Recipe.findById(id)
      .then((recipe) => {
        console.log("Retrieved Recipe ->", recipe);
        res.status(200).json(recipe);
      })
      .catch((error) => {
        console.error("Error while retrieving recipe ->", error);
        res.status(500).send({ error: "Failed to retrieve recipe" });
      });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res, next) => {
    const { id } = req.params;
    Recipe.findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedRecipe) => {
          console.log("Updated recipe ->", updatedRecipe);
          res.status(200).json(updatedRecipe);
        })
        .catch((error) => {
          console.error("Error while updating recipe ->", error);
          res.status(500).send({ error: "Failed to update recipe" });
      });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete("/recipes/:id", (req, res, next) => {
    const { id } = req.params;
    Recipe.findByIdAndDelete(id)
    .then((result) => {
      console.log("Recipe deleted!");
      res.status(200).json(result);
      })
    .catch((error) => {
      console.error("Error while deleting recipe ->", error);    
        res.status(500).send({error: "Deleting recipe failed"})
    });
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
