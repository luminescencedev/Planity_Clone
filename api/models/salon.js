const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

class Salon {
    static async getNomSalon(id) {
        const result = await pool.query("SELECT Nom FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getDescriptionSalon(id) {
        const result = await pool.query("SELECT Description FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getAdresseSalon(id) {
        const result = await pool.query("SELECT Adresse FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getZIPSalon(id) {
        const result = await pool.query("SELECT ZIP FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getPhotosSalon(id) {
        const result = await pool.query("SELECT photos FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getAvisSalon(id) {
        const result = await pool.query("SELECT * FROM Avis WHERE id_salon = $1", [id]);
        return result.rows;
      }
    
      static async getTousLesSalons() {
        const result = await pool.query("SELECT * FROM Salon");
        return result.rows;
      }
    
      static async getTousLesSalonsParLocalisation(zip) {
        const result = await pool.query("SELECT * FROM Salon WHERE ZIP = $1", [zip]);
        return result.rows;
      }
    
      static async getSalonDunCoiffeur(id_coiffeur) {
        const result = await pool.query("SELECT * FROM Salon WHERE id_coiffeur = $1", [id_coiffeur]);
        return result.rows;
      }
    
      static async getSalonParCategories(id_categorie) {
        const result = await pool.query("SELECT * FROM Salon WHERE id_categorie = $1", [id_categorie]);
        return result.rows;
      }
    
      static async getSalonParCategoriesParLocalisation(id_categorie, zip) {
        const result = await pool.query("SELECT * FROM Salon WHERE id_categorie = $1 AND ZIP = $2", [id_categorie, zip]);
        return result.rows;
      }
    
      static async createSalon({ nom, adresse, zip, photos, date, description, id_categorie }) {
        const result = await pool.query(
          "INSERT INTO Salon (Nom, Adresse, ZIP, photos, Date, Description, id_categorie, Created_at, Updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *",
          [nom, adresse, zip, photos, date, description, id_categorie]
        );
        return result.rows[0];
      }
    
      static async updateSalon(id, { nom, adresse, zip, photos, description }) {
        const result = await pool.query(
          "UPDATE Salon SET Nom = $1, Adresse = $2, ZIP = $3, photos = $4, Description = $5, Updated_at = NOW() WHERE id_salon = $6 RETURNING *",
          [nom, adresse, zip, photos, description, id]
        );
        return result.rows[0] || null;
      }
    
      static async updateSalonNom(id, nom) {
        const result = await pool.query("UPDATE Salon SET Nom = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [nom, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonAdresse(id, adresse) {
        const result = await pool.query("UPDATE Salon SET Adresse = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [adresse, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonZIP(id, zip) {
        const result = await pool.query("UPDATE Salon SET ZIP = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [zip, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonPhotos(id, photos) {
        const result = await pool.query("UPDATE Salon SET photos = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [photos, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonDescription(id, description) {
        const result = await pool.query("UPDATE Salon SET Description = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [description, id]);
        return result.rows[0] || null;
      }
    
      static async deleteSalonPhotos(id) {
        const result = await pool.query("UPDATE Salon SET photos = NULL, Updated_at = NOW() WHERE id_salon = $1 RETURNING *", [id]);
        return result.rows[0] || null;
      }
    
      static async deleteSalonDescription(id) {
        const result = await pool.query("UPDATE Salon SET Description = NULL, Updated_at = NOW() WHERE id_salon = $1 RETURNING *", [id]);
        return result.rows[0] || null;
      }
    
      static async deleteSalon(id) {
        const result = await pool.query("DELETE FROM Salon WHERE id_salon = $1 RETURNING *", [id]);
        return result.rows[0] || null;
      }

}

module.exports = Salon;