const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

class Reviews {
  static async getReviewById(id) {
    const result = await pool.query("SELECT * FROM Reviews WHERE id_Reviews = $1", [id]);
    return result.rows[0] || null;
  }

  static async getAllReviews() {
    const result = await pool.query("SELECT * FROM Reviews");
    return result.rows;
  }

  static async getRatingReview(id) {
    const result = await pool.query("SELECT Rating FROM Reviews WHERE id_Reviews = $1", [id]);
    return result.rows[0] || null;
  }

  static async getAllReviewsBySalon(id_salon) {
    const result = await pool.query("SELECT * FROM Reviews WHERE id_salon = $1", [id_salon]);
    return result.rows;
  }

  static async getAllReviewsByDate(id_salon, order = "ASC") {
    const query = `SELECT * FROM Reviews WHERE id_salon = $1 ORDER BY Created_at ${order}`;
    const result = await pool.query(query, [id_salon]);
    return result.rows;
  }

  static async getRatingBySalon(id_salon) {
    const result = await pool.query("SELECT AVG(Rating) AS moyenne FROM Reviews WHERE id_salon = $1", [id_salon]);
    return result.rows[0] || null;
  }

  static async getAllReviewsByUser(id_user) {
    const result = await pool.query("SELECT * FROM Reviews WHERE id_utilisateur = $1", [id_user]);
    return result.rows;
  }

  static async getReviewDescription(id) {
    const result = await pool.query("SELECT Description FROM Reviews WHERE id_Reviews = $1", [id]);
    return result.rows[0] || null;
  }

  static async getAverageReviewBySalon(id_salon) {
    const result = await pool.query(
      "SELECT AVG(Rating) AS average_rating FROM Reviews WHERE id_salon = $1",
      [id_salon]
    );
    return result.rows[0] || null;
  }

  static async createReview({ rating, description, id_salon }) {
    try {
      const result = await pool.query(
        `INSERT INTO Reviews (rating, description, created_at, updated_at, id_salon)
         VALUES ($1, $2, NOW(), NOW(), $3) 
         RETURNING *`,
        [rating, description, id_salon]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  

  static async updateReview(id, { rating, description }) {
    const result = await pool.query(
      "UPDATE Reviews SET Rating = $1, Description = $2, Updated_at = NOW() WHERE id_Reviews = $3 RETURNING *",
      [rating, description, id]
    );
    return result.rows[0] || null;
  }

  static async updateReviewDescription(id, description) {
    const result = await pool.query(
      "UPDATE Reviews SET Description = $1, Updated_at = NOW() WHERE id_Reviews = $2 RETURNING *",
      [description, id]
    );
    return result.rows[0] || null;
  }

  static async updateRatingReview(id, rating) {
    const result = await pool.query(
      "UPDATE Reviews SET Rating = $1, Updated_at = NOW() WHERE id_Reviews = $2 RETURNING *",
      [rating, id]
    );
    return result.rows[0] || null;
  }

  static async deleteReview(id) {
    const result = await pool.query("DELETE FROM Reviews WHERE id_Reviews = $1 RETURNING *", [id]);
    return result.rows[0] || null;
  }
}

module.exports = Reviews;
