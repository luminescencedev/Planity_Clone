const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

class RendezVous {
    static async getAllRendezVousDisponibleParSalon() {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_salon IS NOT NULL');
        return result.rows;
    }

    static async getAllRendezVousDisponibleParCoiffeur() {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user IS NOT NULL');
        return result.rows;
    }

    static async getAllRendezVousDisponibleParDate(date) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE date = $1', [date]);
        return result.rows;
    }

    static async getAllRendezVousPassesClient(id_user) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date < current_date', [id_user]);
        return result.rows;
    }

    static async getAllRendezVousAVenirClient(id_user) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date >= current_date', [id_user]);
        return result.rows;
    }

    static async getAllRendezVousPassesClientParDate(id_user, date) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date = $2 AND date < current_date', [id_user, date]);
        return result.rows;
    }

    static async getAllRendezVousAVenirClientParDate(id_user, date) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date = $2 AND date >= current_date', [id_user, date]);
        return result.rows;
    }

    static async getAllRendezVousPassesClientParPrestation(id_user, id_service) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND id_salon = $2 AND date < current_date', [id_user, id_service]);
        return result.rows;
    }

    static async getAllRendezVousAVenirClientParPrestation(id_user, id_service) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND id_salon = $2 AND date >= current_date', [id_user, id_service]);
        return result.rows;
    }

    static async getAllRendezVousPassesCoiffeur(id_user) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date < current_date', [id_user]);
        return result.rows;
    }

    static async getAllRendezVousAVenirCoiffeur(id_user) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date >= current_date', [id_user]);
        return result.rows;
    }

    static async getAllRendezVousPassesCoiffeurParDate(id_user, date) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date = $2 AND date < current_date', [id_user, date]);
        return result.rows;
    }

    static async getAllRendezVousAVenirCoiffeurParDate(id_user, date) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND date = $2 AND date >= current_date', [id_user, date]);
        return result.rows;
    }

    static async getAllRendezVousPassesCoiffeurParPrestation(id_user, id_service) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND id_salon = $2 AND date < current_date', [id_user, id_service]);
        return result.rows;
    }

    static async getAllRendezVousAVenirCoiffeurParPrestation(id_user, id_service) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_user = $1 AND id_salon = $2 AND date >= current_date', [id_user, id_service]);
        return result.rows;
    }

    static async getRendezVous(id) {
        const result = await pool.query('SELECT * FROM Rendez_vous WHERE id_rendezvous = $1', [id]);
        return result.rows[0];
    }

    static async createRendezVousClient({ date, time, created_at, updated_at, id_salon, id_user, id_service }) {
    try {
      console.log('Insertion dans la base de données avec les paramètres :', {
        date, time, created_at, updated_at, id_salon, id_user, id_service,
      });

      const result = await pool.query(
        'INSERT INTO Rendez_vous (date, time, created_at, updated_at, id_salon, id_user, id_service) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [date, time, created_at, updated_at, id_salon, id_user, id_service]
      );

      console.log('Résultat de l\'insertion:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erreur SQL lors de l\'insertion du rendez-vous:', error.message);
      throw new Error('Erreur lors de la création du rendez-vous');
    }
  }
    

    

    static async createRendezVousCoiffeur({ date, created_at, updated_at, id_salon, id_user }) {
        const result = await pool.query(
            'INSERT INTO Rendez_vous (date, created_at, updated_at, id_salon, id_user) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [date, created_at, updated_at, id_salon, id_user]
        );
        return result.rows[0];
    }

    static async updateRendezVous(id, { date, created_at, updated_at, id_salon, id_user }) {
        const result = await pool.query(
            'UPDATE Rendez_vous SET date = $1, created_at = $2, updated_at = $3, id_salon = $4, id_user = $5 WHERE id_rendezvous = $6 RETURNING *',
            [date, created_at, updated_at, id_salon, id_user, id]
        );
        return result.rows[0];
    }

    static async patchRendezVousDate(id, { date }) {
        const result = await pool.query(
            'UPDATE Rendez_vous SET date = $1 WHERE id_rendezvous = $2 RETURNING *',
            [date, id]
        );
        return result.rows[0];
    }

    static async deleteRendezVousAvenir(id) {
        await pool.query('DELETE FROM Rendez_vous WHERE id_rendezvous = $1 AND date >= current_date', [id]);
    }

    static async deleteRendezVousPasse(id) {
        await pool.query('DELETE FROM Rendez_vous WHERE id_rendezvous = $1 AND date < current_date', [id]);
    }
}

module.exports = RendezVous;
