const express = require('express');
const Category = require('./models/category');
const User = require('./models/user');
const Salon = require('./models/salon');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());


const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

// Middleware de protection des routes
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { id: decoded.id }; // Make sure this matches what you put in the token
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
}

// Endpoints 




//User Endpoints

app.get('/account', authenticate, async (req, res) => {
  try {
    const user = await User.getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      id: user.id_user,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.mail,
      phone: user.phone,
      zip: user.zip,
      role: user.role
    });
  } catch (error) {
    console.error('Account endpoint error:', error);
    res.status(500).json({ 
      error: "Internal server error",
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
});




//Salon Endpoints

// GET

app.get('/salon/:salon', authenticate, async (req, res) => {
  try {
    const salonName = req.params.salon;
    const salon = await Salon.getSalonByName(salonName); // Assurez-vous que getSalonById existe
    
    if (!salon) {
      return res.status(404).json({ message: "Salon non trouvé" });
    }
    console.log("Données du salon récupérées :", salon); // Log pour vérifier les données récupérées
    res.status(200).json(salon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});






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

// /citySalon (Public, Admin, User) 

app.get('/citySalon', authenticate, async (req,res) =>{
    try {
      const salon = await Salon.getcitySalon(req.params.id);
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
    console.log("Données reçues :", req.body); // Ajout pour debug
    const { role, first_name, last_name, age, mail, phone, city, password } = req.body;
    const user = await User.createUser({ role, first_name, last_name, age, mail, phone, city, password });
    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (error) {
    console.error("Erreur dans /register :", error.message); // Ajout pour voir l'erreur
    res.status(500).json({ error: error.message });
  }
});

  
  // ROUTE : Connexion
  app.post("/login", async (req, res) => {
    try {
      const { mail, password } = req.body;
      const user = await User.getUserByMail(mail);
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Make sure to include the user ID in the token
      const token = jwt.sign({ 
        id: user.id_user, // or whatever your ID field is called
        mail: user.mail 
      }, SECRET_KEY, {
        expiresIn: "2h",
      });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// CATEGORIES
//GET
app.get('/allCategories', authenticate, async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    if (categories && categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "Pas trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET by name
app.get('/categories/:name', authenticate, async (req, res) => {
  try {
    const category = await Category.getCategoryByName(req.params.name);
    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/categories/:name/salons', authenticate, async (req, res) => {
  try {
    const { name } = req.params;
    const { city } = req.query; // Récupérer la ville depuis l'URL

    // Récupérer l'ID de la catégorie
    const category = await Category.getCategoryByName(name);
    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

    let salons;
    if (city) {
      // Filtrer les salons par catégorie et ville
      salons = await Salon.getSalonsByCategoryAndCity(category.id_category, city);
    } else {
      // Récupérer tous les salons de la catégorie
      salons = await Salon.getSalonsByCategoryId(category.id_category);
    }

    if (salons.length === 0) return res.status(404).json({ message: "Aucun salon trouvé" });

    res.status(200).json(salons);
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

    const category = await Category.createCategory({ nom, picture, description });
    res.status(201).json({ message: "Catégorie créée", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//PUT
app.put('/updateCategorie/:id', authenticate, async (req, res) => {
  try {
    const updatedCategorie = await Category.updateCategory(req.params.id, req.body);
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
    const category = await Category.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    await Category.deleteCategorie(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});