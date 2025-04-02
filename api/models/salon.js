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
    static async getNameSalon(id) {
        const result = await pool.query("SELECT Name FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getDescriptionSalon(id) {
        const result = await pool.query("SELECT Description FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getAdressSalon(id) {
        const result = await pool.query("SELECT Adress FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getCitySalon(id) {
        const result = await pool.query("SELECT City FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getPictureSalon(id) {
        const result = await pool.query("SELECT Picture FROM Salon WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getReviewSalon(id) {
        const result = await pool.query("SELECT * FROM Review WHERE id_salon = $1", [id]);
        return result.rows;
      }
    
      static async getAllSalons() {
        const result = await pool.query("SELECT * FROM Salon");
        return result.rows;
      }
    
      static async getAllSalonsByLocalisation(City) {
        const result = await pool.query("SELECT * FROM Salon WHERE City = $1", [City]);
        return result.rows;
      }
    
      static async getHairdresserSalon(id_hairdresser) {
        const result = await pool.query("SELECT * FROM Salon WHERE id_hairdresser = $1", [id_hairdresser]);
        return result.rows;
      }
    
      static async getSalonByCategories(id_category) {
        const result = await pool.query("SELECT * FROM Salon WHERE id_category = $1", [id_category]);
        return result.rows;
      }
    
      static async getSalonByCategoriesByLocalisation(id_category, City) {
        const result = await pool.query("SELECT * FROM Salon WHERE id_category = $1 AND City = $2", [id_category, City]);
        return result.rows;
      }
    
      static async createSalon({ nom, adresse, City, photos, date, description, id_categorie }) {
        const result = await pool.query(
          "INSERT INTO Salon (Nom, Adresse, City, photos, Date, Description, id_categorie, Created_at, Updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *",
          [nom, adresse, City, photos, date, description, id_categorie]
        );
        return result.rows[0];
      }
    
      static async updateSalon(id, { nom, adresse, City, photos, description }) {
        const result = await pool.query(
          "UPDATE Salon SET Nom = $1, Adresse = $2, City = $3, photos = $4, Description = $5, Updated_at = NOW() WHERE id_salon = $6 RETURNING *",
          [nom, adresse, City, photos, description, id]
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
    
      static async updateSalonCity(id, City) {
        const result = await pool.query("UPDATE Salon SET City = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [City, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonPictures(id, pictures) {
        const result = await pool.query("UPDATE Salon SET Pictures = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [photos, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonDescription(id, description) {
        const result = await pool.query("UPDATE Salon SET Description = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [description, id]);
        return result.rows[0] || null;
      }
    
      static async deleteSalonPicture(id) {
        const result = await pool.query("UPDATE Salon SET Pictures = NULL, Updated_at = NOW() WHERE id_salon = $1 RETURNING *", [id]);
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