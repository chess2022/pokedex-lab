require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;
const pokemon = require("./models/pokemon.js");
const morgan = require("morgan");
const methodOverride = require("method-override");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use("/static", express.static("public"));
app.use(methodOverride("_method"));


// test route - shows parsed data
// app.get("/pokemon/", (req, res) => {
//   res.send(pokemon);
// });

// Index route - show all of the pokemon
app.get("/pokemon/", (req, res) => {
  res.render("index.ejs", {allMon: pokemon});
});

// Show route - show a specific pokemon
app.get("/pokemon/:id", (req, res) => {
    res.render('show.ejs', {pokedude: pokemon[req.params.id]} )
});

// New route - show a pokemon to display
app.get("/pokemon/new", (req, res) => {

});

// Edit route - edit an existing pokemon
app.get("/pokemon/:id/edit", (req, res) => {

});

// Create route - create a new pokemon
app.post("/pokemon", (req, res) => {

});

// Update route - update pokemon to the data file
app.put("/pokemon/:id", (req, res) => {

});

// Destroy route - delete pokemon from data file
app.delete("/pokemon:id", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`We are listening on port ${PORT}`);
});
