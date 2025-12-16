const Game = require("../models/Game");

exports.addGame = async (req, res) => {
  try {
    console.log("REQ BODY =>", req.body);

    const game = await Game.create(req.body);
    res.status(201).json(game);

  } catch (error) {
    console.log("MONGOOSE ERROR =>", error);   // 🔥 THIS LINE IS KEY
    res.status(500).json({
      message: error.message,
      error: error
    });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch games" });
  }
};

exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.json(game);
  } catch (error) {
    res.status(404).json({ message: "Game not found" });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    console.log("UPDATE ERROR =>", error);
    res.status(500).json({
      message: error.message,
      error: error
    });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete game" });
  }
};
