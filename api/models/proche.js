const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

class Proche {
    static async getAllProche() {
        const result = await pool.query('SELECT * FROM Proche');
        return result.rows;
    }

    static async createProche({ nom, prenom, age, mail, tel, id_user }) {
        const result = await pool.query(
            'INSERT INTO Proche (nom, prenom, age, mail, tel, id_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nom, prenom, age, mail, tel, id_user]
        );
        return result.rows[0];
    }

    static async updateProche(id, { nom, prenom, age, mail, tel, id_user }) {
        const result = await pool.query(
            'UPDATE Proche SET nom = $1, prenom = $2, age = $3, mail = $4, tel = $5, id_user = $6 WHERE id_proche = $7 RETURNING *',
            [nom, prenom, age, mail, tel, id_user, id]
        );
        return result.rows[0];
    }

    static async patchProcheNom(id, { nom }) {
        const result = await pool.query(
            'UPDATE Proche SET nom = $1 WHERE id_proche = $2 RETURNING *',
            [nom, id]
        );
        return result.rows[0];
    }

    static async patchProchePrenom(id, { prenom }) {
        const result = await pool.query(
            'UPDATE Proche SET prenom = $1 WHERE id_proche = $2 RETURNING *',
            [prenom, id]
        );
        return result.rows[0];
    }

    static async patchProcheAge(id, { age }) {
        const result = await pool.query(
            'UPDATE Proche SET age = $1 WHERE id_proche = $2 RETURNING *',
            [age, id]
        );
        return result.rows[0];
    }

    static async patchProcheMail(id, { mail }) {
        const result = await pool.query(
            'UPDATE Proche SET mail = $1 WHERE id_proche = $2 RETURNING *',
            [mail, id]
        );
        return result.rows[0];
    }

    static async patchProcheTel(id, { tel }) {
        const result = await pool.query(
            'UPDATE Proche SET tel = $1 WHERE id_proche = $2 RETURNING *',
            [tel, id]
        );
        return result.rows[0];
    }

    static async deleteProche(id) {
        await pool.query('DELETE FROM Proche WHERE id_proche = $1', [id]);
    }
}

module.exports = Proche;
