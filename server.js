require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Game state
let gameState = {
  flips: 0,
  heads: 0,
  tails: 0,
  lastResult: null,
};

app.get("/", (req, res) => {
  res.render("index", { gameState });
});

app.post("/flip", (req, res) => {
  if (gameState.flips >= 10) {
    // Reset the game if 10 flips have been reached
    gameState = { flips: 0, heads: 0, tails: 0, lastResult: null };
  } else {
    // Perform the coin flip
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    gameState.flips++;
    gameState.lastResult = result;
    if (result === "Heads") {
      gameState.heads++;
    } else {
      gameState.tails++;
    }
  }
  res.render("index", { gameState });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
