const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

class Prestation {
  static async getAllPrestations() {
    const result = await pool.query("SELECT * FROM Prestation");
    return result.rows;
  }

  static async getPrixPrestation(id) {
    const result = await pool.query("SELECT Prix FROM Prestation WHERE id_prestation = $1", [id]);
    return result.rows[0] || null;
  }

  static async getDureePrestation(id) {
    const result = await pool.query("SELECT duree FROM Prestation WHERE id_prestation = $1", [id]);
    return result.rows[0] || null;
  }

  static async getDescriptionPrestation(id) {
    const result = await pool.query("SELECT description FROM Prestation WHERE id_prestation = $1", [id]);
    return result.rows[0] || null;
  }

  static async getPrestationsBySalon(id_salon) {
    const result = await pool.query("SELECT * FROM Prestation WHERE id_salon = $1", [id_salon]);
    return result.rows;
  }

  static async getPrestationsBySalonPriceAsc(id_salon) {
    const result = await pool.query("SELECT * FROM Prestation WHERE id_salon = $1 ORDER BY Prix ASC", [id_salon]);
    return result.rows;
  }

  static async getPrestationsBySalonPriceDesc(id_salon) {
    const result = await pool.query("SELECT * FROM Prestation WHERE id_salon = $1 ORDER BY Prix DESC", [id_salon]);
    return result.rows;
  }

  static async createPrestation({ prix, duree, description, id_salon }) {
    const result = await pool.query(
      "INSERT INTO Prestation (Prix, duree, description, Created_at, Updated_at, id_salon) VALUES ($1, $2, $3, NOW(), NOW(), $4) RETURNING *",
      [prix, duree, description, id_salon]
    );
    return result.rows[0];
  }

  static async updatePrestation(id, { prix, duree, description }) {
    const result = await pool.query(
      "UPDATE Prestation SET Prix = $1, duree = $2, description = $3, Updated_at = NOW() WHERE id_prestation = $4 RETURNING *",
      [prix, duree, description, id]
    );
    return result.rows[0] || null;
  }

  static async updatePrixPrestation(id, prix) {
    const result = await pool.query(
      "UPDATE Prestation SET Prix = $1, Updated_at = NOW() WHERE id_prestation = $2 RETURNING *",
      [prix, id]
    );
    return result.rows[0] || null;
  }

  static async updateDureePrestation(id, duree) {
    const result = await pool.query(
      "UPDATE Prestation SET duree = $1, Updated_at = NOW() WHERE id_prestation = $2 RETURNING *",
      [duree, id]
    );
    return result.rows[0] || null;
  }

  static async updateDescriptionPrestation(id, description) {
    const result = await pool.query(
      "UPDATE Prestation SET description = $1, Updated_at = NOW() WHERE id_prestation = $2 RETURNING *",
      [description, id]
    );
    return result.rows[0] || null;
  }

  static async deletePrestation(id) {
    const result = await pool.query("DELETE FROM Prestation WHERE id_prestation = $1 RETURNING *", [id]);
    return result.rows[0] || null;
  }
}

module.exports = Prestation;
