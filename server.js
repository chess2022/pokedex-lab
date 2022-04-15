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

// New route - create a new pokemon
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs", {allMon: pokemon})
});


// Destroy route - delete pokemon from data file
app.delete("/pokemon/:id", (req, res) => {
  const index = req.params.id; // grab the index from params
  pokemon.splice(index, 1); //splice the pokedude from pokemon
  res.redirect("/pokemon"); //redirect back to index page
});

// Update route - update pokemon to the data file
app.put("/pokemon/:id", (req, res) => {
    let updatedPokemon = {...pokemon[req.params.id]}
    updatedPokemon.id = pokemon.length + 1;
    // updatedPokemon.img = ("/static/newMon.jpg")
    updatedPokemon.name = req.body.name
    updatedPokemon.type= [req.body.type1, req.body.type2]
    updatedPokemon.stats= {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      speed: req.body.speed
    }
    pokemon[req.params.id] = updatedPokemon;
    res.redirect(`/pokemon/${req.params.id}`);
});


// Edit route - edit an existing pokemon
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
      pokedude: pokemon[req.params.id],
      index: req.params.id
    })
});


// Show route - show a specific pokemon
app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {
      pokedude: pokemon[req.params.id],
      index: req.params.id,
    });
});



app.listen(PORT, () => {
  console.log(`We are listening on port ${PORT}`);
});
