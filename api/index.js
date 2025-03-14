const express = require('express');
const Book = require('./models/book');
const User = require('./models/user');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;


const app = express();
app.use(express.json());

const cors = require('cors');
const Categorie = require('./models/categorie');
const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

// Middleware de protection des routes
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token
    if (!token) return res.status(401).json({ error: "Accès non autorisé" });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded; // Ajouter les infos du user à la requête
      next();
    } catch (error) {
      res.status(403).json({ error: "Token invalide" });
    }
}

// ROUTE : Inscription
app.post("/register", async (req, res) => {
  try {
    const { role, first_name, last_name, age, mail, phone, zip, password } = req.body;
    const user = await User.createUser({ role, first_name, last_name, age, mail, phone, zip, password });
    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  
  // ROUTE : Connexion
  app.post("/login", async (req, res) => {
    try {
      const { mail, password } = req.body;
      const user = await User.getUserByMail(mail);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Identifiants invalides" });
      }

      const token = jwt.sign({ id: user.id, mail: user.mail }, SECRET_KEY, {
        expiresIn: "2h",
      });

      res.json({ message: "Connexion réussie", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// CATEGORIES
//GET
app.get('/allCategories', authenticate, async (req, res) => {
  try {
    const categories = await Categorie.getCategories();
    if (categories && categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "Pas trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET by ID
app.get('/categorie/:id', authenticate, async (req, res) => {
  try {
    const categorie = await Categorie.getCategorieById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST
app.post("/createCategorie", async (req, res) => {
  try {
    const { nom, picture, description } = req.body;

    if (!nom || !picture || !description) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const categorie = await Categorie.createCategorie({ nom, picture, description });
    res.status(201).json({ message: "Catégorie créée", categorie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//PUT
app.put('/updateCategorie/:id', authenticate, async (req, res) => {
  try {
    const updatedCategorie = await Categorie.updateCategorie(req.params.id, req.body);
    if (!updatedCategorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.status(200).json(updatedCategorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
app.delete('/deleteCategorie/:id', authenticate, async (req, res) => {
  try {
    const categorie = await Categorie.getCategorieById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    await Categorie.deleteCategorie(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});