const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

class Avis {
  static async getAllAvis() {
    const result = await pool.query("SELECT * FROM Avis");
    return result.rows;
  }

  static async getRatingAvis(id) {
    const result = await pool.query("SELECT Rating FROM Avis WHERE id_avis = $1", [id]);
    return result.rows[0] || null;
  }

  static async getAvisBySalon(id_salon) {
    const result = await pool.query("SELECT * FROM Avis WHERE id_salon = $1", [id_salon]);
    return result.rows;
  }

  static async getAvisByDateAsc(id_salon) {
    const result = await pool.query("SELECT * FROM Avis WHERE id_salon = $1 ORDER BY Created_at ASC", [id_salon]);
    return result.rows;
  }

  static async getAvisByDateDesc(id_salon) {
    const result = await pool.query("SELECT * FROM Avis WHERE id_salon = $1 ORDER BY Created_at DESC", [id_salon]);
    return result.rows;
  }

  static async getMoyenneAvisBySalon(id_salon) {
    const result = await pool.query("SELECT AVG(Rating) AS moyenne FROM Avis WHERE id_salon = $1", [id_salon]);
    return result.rows[0] || null;
  }

  static async getAvisByUser(id_user) {
    const result = await pool.query("SELECT * FROM Avis WHERE id_utilisateur = $1", [id_user]);
    return result.rows;
  }

  static async getDescriptionAvis(id) {
    const result = await pool.query("SELECT Description FROM Avis WHERE id_avis = $1", [id]);
    return result.rows[0] || null;
  }

  static async createAvis({ rating, description, id_salon, id_utilisateur }) {
    const result = await pool.query(
      "INSERT INTO Avis (Rating, Description, Created_at, Updated_at, id_salon, id_utilisateur) VALUES ($1, $2, NOW(), NOW(), $3, $4) RETURNING *",
      [rating, description, id_salon, id_utilisateur]
    );
    return result.rows[0];
  }

  static async updateAvis(id, { rating, description }) {
    const result = await pool.query(
      "UPDATE Avis SET Rating = $1, Description = $2, Updated_at = NOW() WHERE id_avis = $3 RETURNING *",
      [rating, description, id]
    );
    return result.rows[0] || null;
  }

  static async updateDescriptionAvis(id, description) {
    const result = await pool.query(
      "UPDATE Avis SET Description = $1, Updated_at = NOW() WHERE id_avis = $2 RETURNING *",
      [description, id]
    );
    return result.rows[0] || null;
  }

  static async updateRatingAvis(id, rating) {
    const result = await pool.query(
      "UPDATE Avis SET Rating = $1, Updated_at = NOW() WHERE id_avis = $2 RETURNING *",
      [rating, id]
    );
    return result.rows[0] || null;
  }

  static async deleteAvis(id) {
    const result = await pool.query("DELETE FROM Avis WHERE id_avis = $1 RETURNING *", [id]);
    return result.rows[0] || null;
  }
}

module.exports = Avis;
