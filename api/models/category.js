const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

class Categorie {
  // GET /category (Public, Admin, User)
  static async getCategoryById(id) {
    const result = await pool.query("SELECT * FROM Categorie WHERE id_categorie = $1", [id]);
    return result.rows[0] || null;
  }

  // GET /allCategories (Public, Admin, User)
  static async getAllCategories() {
    const result = await pool.query("SELECT * FROM Categorie");
    return result.rows;
  }

  // POST /createCategory (Admin)
  static async createCategory({ nom, picture, description }) {
    const result = await pool.query(
      "INSERT INTO Categorie (Nom, Picture, Description, Created_at, Updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *",
      [nom, picture, description]
    );
    return result.rows[0];
  }

  // PUT /updateCategory (Admin)
  static async updateCategory(id, { nom, picture, description }) {
    const result = await pool.query(
      "UPDATE Categorie SET Nom = $1, Picture = $2, Description = $3, Updated_at = NOW() WHERE id_categorie = $4 RETURNING *",
      [nom, picture, description, id]
    );
    return result.rows[0] || null;
  }

  // DEL /deleteCategory (Admin)
  static async deleteCategory(id) {
    const result = await pool.query("DELETE FROM Categorie WHERE id_categorie = $1 RETURNING *", [id]);
    return result.rows[0] || null;
  }
}

module.exports = Categorie;
