# Planity Clone - API & Frontend

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 18 ou supérieure)
- **npm** (inclus avec Node.js)
- **PostgreSQL** (pour la base de données)
- Un éditeur de texte comme **VS Code** (optionnel mais recommandé)

## Configuration

1. **Cloner le projet :**
   ```sh
   git clone <URL_DU_REPO>
   cd Planity_Clone
   ```

2. **Créer un fichier `.env` dans le dossier `api` :**
   Ce fichier doit contenir les informations suivantes :
   ```
   DB_HOST=<adresse_hôte_de_la_base_de_données>
   DB_USER=<nom_utilisateur_de_la_base_de_données>
   DB_PASSWORD=<mot_de_passe_de_la_base_de_données>
   DB_NAME=<nom_de_la_base_de_données>
   DB_PORT=<port_de_la_base_de_données>
   SECRET_KEY=<clé_secrète_pour_les_tokens_JWT>
   ```

3. **Installer les dépendances :**
   - Pour le backend :
     ```sh
     cd api
     npm install
     ```
   - Pour le frontend :
     ```sh
     cd ../frontend
     npm install
     ```

## Lancer le projet

### Backend (API)

1. Naviguez dans le dossier `api` :
   ```sh
   cd api
   ```

2. Démarrez le serveur backend avec **Nodemon** :
   ```sh
   npx nodemon index.js
   ```

3. L'API sera disponible sur `http://localhost:3001`.

### Frontend

1. Naviguez dans le dossier `frontend` :
   ```sh
   cd frontend
   ```

2. Lancez le serveur de développement :
   ```sh
   npm run dev
   ```

3. L'application sera accessible sur `http://localhost:3000`.

## Utilisation du projet

### Fonctionnalités principales

- **Inscription et Connexion :**
  - Les utilisateurs peuvent s'inscrire et se connecter pour accéder à leur compte.
  
- **Recherche de services :**
  - Recherchez des salons par catégorie (Coiffeur, Barbier, Manucure) et par ville.

- **Réservation :**
  - Prenez rendez-vous en ligne avec des professionnels de la beauté.

- **Gestion des salons :**
  - Les administrateurs peuvent créer et gérer des salons.

### Structure du projet

- **Backend (`api`) :**
  - Contient les routes API, la logique métier et les modèles pour interagir avec la base de données PostgreSQL.

- **Frontend (`frontend`) :**
  - Développé avec **Next.js**, il gère l'interface utilisateur et les interactions avec l'API.

### Stack utilisée

- **Backend :**
  - Node.js, Express.js
  - PostgreSQL
  - JWT pour l'authentification
  - Bcrypt pour le hachage des mots de passe

- **Frontend :**
  - React.js avec Next.js
  - TailwindCSS pour le style

## Notes supplémentaires

- Assurez-vous que PostgreSQL est en cours d'exécution et que la base de données est correctement configurée avant de lancer le backend.
- Si vous rencontrez des problèmes, vérifiez les logs dans la console pour des messages d'erreur détaillés.

Bon développement !
