const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


class Service {
  static async getAllServices() {
    const result = await pool.query("SELECT * FROM Services");
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM Services WHERE id_service = $1", [id]);
    return result.rows[0] || null;
  }

  static async getServiceById(id) {
    const result = await pool.query("SELECT * FROM Services WHERE id_service = $1", [id]);  // Récupérer le service par ID
    return result.rows[0] || null;  // Retourner le service trouvé, ou null si aucun service trouvé
  }
  

  static async getPrixService(id) {
    const result = await pool.query("SELECT Prix FROM Services WHERE id_Service = $1", [id]);
    return result.rows[0] || null;
  }

  static async getDureeService(id) {
    const result = await pool.query("SELECT duree FROM Services WHERE id_Service = $1", [id]);
    return result.rows[0] || null;
  }

  static async getDescriptionService(id) {
    const result = await pool.query("SELECT description FROM Services WHERE id_Service = $1", [id]);
    return result.rows[0] || null;
  }

  static async getServiceByDescription(description) {
    try {
      console.log("Recherche du service avec la description:", description);  // Log pour vérifier la description reçue

      const result = await pool.query("SELECT * FROM Services WHERE description = $1", [description]);
      if (result.rows.length === 0) {
        console.log("Aucun service trouvé avec cette description");
        return null; // Aucun service trouvé
      }

      return result.rows[0]; // Retourne le premier service trouvé
    } catch (error) {
      console.error("Erreur lors de la récupération du service:", error);  // Log de l'erreur
      throw new Error("Erreur lors de la récupération du service par description");
    }
  }

  static async getServicesBySalon(id_salon) {
    const result = await pool.query("SELECT * FROM Services WHERE id_salon = $1", [id_salon]);
    return result.rows;
  }

  static async getServicesBySalonPriceAsc(id_salon) {
    const result = await pool.query("SELECT * FROM Services WHERE id_salon = $1 ORDER BY Prix ASC", [id_salon]);
    return result.rows;
  }

  static async getServicesBySalonPriceDesc(id_salon) {
    const result = await pool.query("SELECT * FROM Services WHERE id_salon = $1 ORDER BY Prix DESC", [id_salon]);
    return result.rows;
  }

  static async createService({ prix, duree, description, id_salon }) {
    const result = await pool.query(
      "INSERT INTO Services (Prix, duree, description, Created_at, Updated_at, id_salon) VALUES ($1, $2, $3, NOW(), NOW(), $4) RETURNING *",
      [prix, duree, description, id_salon]
    );
    return result.rows[0];
  }

  static async updateService(id, { prix, duree, description }) {
    const result = await pool.query(
      "UPDATE Services SET Prix = $1, duree = $2, description = $3, Updated_at = NOW() WHERE id_Service = $4 RETURNING *",
      [prix, duree, description, id]
    );
    return result.rows[0] || null;
  }

  static async updatePrixService(id, prix) {
    const result = await pool.query(
      "UPDATE Services SET Prix = $1, Updated_at = NOW() WHERE id_Service = $2 RETURNING *",
      [prix, id]
    );
    return result.rows[0] || null;
  }

  static async updateDureeService(id, duree) {
    const result = await pool.query(
      "UPDATE Services SET duree = $1, Updated_at = NOW() WHERE id_Service = $2 RETURNING *",
      [duree, id]
    );
    return result.rows[0] || null;
  }

  static async updateDescriptionService(id, description) {
    const result = await pool.query(
      "UPDATE Services SET description = $1, Updated_at = NOW() WHERE id_Service = $2 RETURNING *",
      [description, id]
    );
    return result.rows[0] || null;
  }

  static async deleteService(id) {
    const result = await pool.query("DELETE FROM Services WHERE id_Service = $1 RETURNING *", [id]);
    return result.rows[0] || null;
  }
}

module.exports = Service;
