const express = require('express');
const Book = require('./models/book');
const User = require('./models/user');
const Salon = require('./models/salon');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());

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

// Endpoints 




//User Endpoints














//Salon Endpoints

// GET

// /nameSalon (Public, Admin, User) 

app.get('/nameSalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getNameSalon(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /descriptionSalon (Public, Admin, User) 

app.get('/descritpionSalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getDescriptionSalon(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /adressSalon (Public, Admin, User) 

app.get('/adressSalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getAdressSalon(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /ZIPSalon (Public, Admin, User) 

app.get('/ZIPSalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getZIPSalon(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /pictureSalon (Public, Admin, User) 

app.get('/pictureSalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getPictureSalon(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /reviewSalon (Public, Admin, User) 

app.get('/reviewSalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getReviewSalon(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /allSalons (Public, Admin, User) 

app.get('/allSalons', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getAllSalons();
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /allSalonsByLocalisation (Public, Admin, User) 

app.get('/allSalonsByLocalisation', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getAllSalonsByLocalisation(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /hairdresserSalon (Public, Admin, User) 

app.get('/hairdresserSalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getHairdresserSalon(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

// /salonByCategories (Public, Admin, User) 

app.get('/salonByCategories', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getSalonByCategories(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})
// /salonByCategoriesByLocalisation (Public, Admin, User) 

app.get('/salonByCategoriesByLocalisation', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getSalonByCategoriesByLocalisation(req.params.id);
      salon ? res.status(200).json(salon) : res.status(404).json({
        message: "Pas trouvé"
    });
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

//POST

// /createSalon (Admin, Salon Owner) 

app.post('/createSalon', authenticate, async (req, res) => {
  try {
      const newSalon = await Salon.createSalon(req.body);
      res.status(201).json(newSalon);
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

//PUT

// /updateSalon (Admin, Salon Owner) 

app.put('/updateSalon/:id', authenticate, async (req, res) => {
    try {
        const updateSalon = await Salon.updateSalon(req.params.id, req.body);
        res.status(200).json(updateSalon);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//PATCH


















// DELETE

// /deleteSalonPicture (Admin, Salon Owner) 

app.delete('/deleteSalonPicture/:id', authenticate, async (req, res) => {
    try {
        await Salon.deleteSalonPicture(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// /deleteSalonDescription (Admin, Salon Owner) 

app.delete('/deleteSalonDescription/:id', authenticate, async (req, res) => {
    try {
        await Salon.deleteSalonDescription(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// /deleteSalon (Admin, Salon Owner) 

app.delete('/deleteSalon/:id', authenticate, async (req, res) => {
    try {
        await Salon.deleteSalon(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


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
      const { username, password } = req.body;
      const user = await User.getUserByUsername(username);
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Identifiants invalides" });
      }
  
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: "2h",
      });
  
      res.json({ token });
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