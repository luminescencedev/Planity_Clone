const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Your User model
const router = express.Router();

router.get("/account", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.getUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Do NOT return the password for security reasons
    const { password, ...userData } = user[0];

    res.json(userData);
  } catch (error) {
    console.error("Erreur API:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
