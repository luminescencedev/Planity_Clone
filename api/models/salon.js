const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

class Salons {
    static async findById(id) {
        const result = await pool.query("SELECT * FROM Salons WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }

    static async getNameSalon(id) {
        const result = await pool.query("SELECT Name FROM Salons WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getDescriptionSalon(id) {
        const result = await pool.query("SELECT Description FROM Salons WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getAdressSalon(id) {
        const result = await pool.query("SELECT Adress FROM Salons WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getcitySalon(id) {
        const result = await pool.query("SELECT city FROM Salons WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getPictureSalon(id) {
        const result = await pool.query("SELECT Picture FROM Salons WHERE id_salon = $1", [id]);
        return result.rows[0] || null;
      }
    
      static async getReviewSalon(id) {
        const result = await pool.query("SELECT * FROM Review WHERE id_salon = $1", [id]);
        return result.rows;
      }
    
      static async getAllSalons() {
        const result = await pool.query("SELECT * FROM Salons");
        return result.rows;
      }
    
      static async getAllSalonsByLocalisation(city) {
        const result = await pool.query("SELECT * FROM Salons WHERE city = $1", [city]);
        return result.rows;
      }
    
      static async getHairdresserSalon(id_hairdresser) {
        const result = await pool.query("SELECT * FROM Salons WHERE id_hairdresser = $1", [id_hairdresser]);
        return result.rows;
      }
    
      static async getSalonsByCategoryId(id_category) {
        const result = await pool.query("SELECT * FROM Salons WHERE id_category = $1", [id_category]);
        return result.rows;
      }

      static async getSalonsByCategoryAndCity(id_category, city) {
        const result = await pool.query(
          `SELECT s.*, 
                  COALESCE(AVG(r.rating), 0) AS moyenne_rating, 
                  COALESCE(json_agg(r) FILTER (WHERE r.id_review IS NOT NULL), '[]') AS reviews,
                  COALESCE(json_agg(service) FILTER (WHERE service.id_service IS NOT NULL), '[]') AS services
           FROM Salons s
           LEFT JOIN Reviews r ON s.id_salon = r.id_salon
           LEFT JOIN Services service ON s.id_salon = service.id_salon
           WHERE s.id_category = $1 AND LOWER(s.city) = LOWER($2)
           GROUP BY s.id_salon`,
          [id_category, city]
        );
        return result.rows; // renvoie les salons avec leurs services, avis et notes
      }
      
      static async getSalonByName(name) {
        try {
          console.log("Tentative de récupération du salon avec le nom :", name); // Log pour vérifier le nom du salon
      
          const result = await pool.query(
            `SELECT s.*, 
                    COALESCE(AVG(r.rating), 0) AS moyenne_rating, 
                    COALESCE(json_agg(r) FILTER (WHERE r.id_review IS NOT NULL), '[]') AS reviews,
                    COALESCE(json_agg(service) FILTER (WHERE service.id_service IS NOT NULL), '[]') AS services
             FROM Salons s
             LEFT JOIN Reviews r ON s.id_salon = r.id_salon
             LEFT JOIN Services service ON s.id_salon = service.id_salon
             WHERE LOWER(s.name) = LOWER($1)
             GROUP BY s.id_salon`,
            [name]
          );
      
          console.log("Résultat de la requête SQL :", result.rows); // Log pour vérifier ce que la requête retourne
      
          if (result.rows.length === 0) {
            console.log("Aucun salon trouvé avec ce nom"); // Log si aucun salon n'est trouvé
            return { error: "Salon non trouvé" }; // Retourne une erreur explicite
          }
      
          return result.rows[0]; // Retourne le salon trouvé
        } catch (error) {
          console.error("Erreur lors de la récupération du salon :", error.message); // Log détaillé de l'erreur
          return { error: error.message }; // Retourne l'erreur dans le format attendu
        }
      }
      
      
      static async getSalonById(salonName) {
        const result = await pool.query(
          `SELECT s.*, 
                  COALESCE(AVG(r.rating), 0) AS moyenne_rating, 
                  COALESCE(json_agg(r) FILTER (WHERE r.id_review IS NOT NULL), '[]') AS reviews
           FROM Salons s
           LEFT JOIN Reviews r ON s.id_salon = r.id_salon
           WHERE LOWER(s.name) = LOWER($1)
           GROUP BY s.id_salon`,
          [salonName]
        );
    
        if (result.rows.length === 0) {
          throw new Error("Salon non trouvé");
        }
    
        return result.rows[0]; // Retourne le salon trouvé
      }
    


    
      static async getSalonByCategoriesByLocalisation(id_category, city) {
        const result = await pool.query("SELECT * FROM Salons WHERE id_category = $1 AND city = $2", [id_category, city]);
        return result.rows;
      }
    
      static async createSalon({ name, adress, city, description, id_category, picture }) {
        try {
          const result = await pool.query(
            `INSERT INTO Salons (name, adress, city, description, id_category, picture, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            RETURNING *`,
            [name, adress, city, description, id_category, picture]
          );
          return result.rows[0];
        } catch (error) {
          console.error("Erreur lors de l'insertion du salon :", error.message);
          throw error;
        }
      }
    
      static async updateSalon(id, { nom, adresse, city, photos, description }) {
        const result = await pool.query(
          "UPDATE Salons SET Nom = $1, Adresse = $2, city = $3, photos = $4, Description = $5, Updated_at = NOW() WHERE id_salon = $6 RETURNING *",
          [nom, adresse, city, photos, description, id]
        );
        return result.rows[0] || null;
      }
    
      static async updateSalonNom(id, nom) {
        const result = await pool.query("UPDATE Salons SET Nom = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [nom, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonAdresse(id, adresse) {
        const result = await pool.query("UPDATE Salons SET Adresse = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [adresse, id]);
        return result.rows[0] || null;
      }
    
      static async updateSaloncity(id, city) {
        const result = await pool.query("UPDATE Salons SET city = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [city, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonPictures(id, pictures) {
        const result = await pool.query("UPDATE Salons SET Pictures = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [photos, id]);
        return result.rows[0] || null;
      }
    
      static async updateSalonDescription(id, description) {
        const result = await pool.query("UPDATE Salons SET Description = $1, Updated_at = NOW() WHERE id_salon = $2 RETURNING *", [description, id]);
        return result.rows[0] || null;
      }
    
      static async deleteSalonPicture(id) {
        const result = await pool.query("UPDATE Salons SET Pictures = NULL, Updated_at = NOW() WHERE id_salon = $1 RETURNING *", [id]);
        return result.rows[0] || null;
      }
    
      static async deleteSalonDescription(id) {
        const result = await pool.query("UPDATE Salons SET Description = NULL, Updated_at = NOW() WHERE id_salon = $1 RETURNING *", [id]);
        return result.rows[0] || null;
      }
    
      static async deleteSalon(id_salon) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
    
            // First set users' id_salon to NULL to avoid constraint violation
            await client.query(
                'UPDATE users SET id_salon = NULL WHERE id_salon = $1',
                [id_salon]
            );
    
            // Then delete the salon (will cascade to services, rendez_vous, reviews)
            const result = await client.query(
                'DELETE FROM salons WHERE id_salon = $1 RETURNING *',
                [id_salon]
            );
    
            if (result.rowCount === 0) {
                await client.query('ROLLBACK');
                return { 
                    success: false, 
                    status: 404, 
                    message: "Salon not found" 
                };
            }
    
            await client.query('COMMIT');
    
            return { 
                success: true, 
                status: 200, 
                message: "Salon and all related data deleted successfully",
                data: result.rows[0]
            };
    
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Database error:", error);
            
            return {
                success: false,
                status: 500,
                message: error.message || "Database operation failed",
                errorDetails: process.env.NODE_ENV === 'development' ? {
                    error: error.toString(),
                    stack: error.stack
                } : undefined
            };
        } finally {
            client.release();
        }
    }

}

module.exports = Salons;