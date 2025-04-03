const { Pool } = require("pg");
const bcrypt = require("bcrypt");

require("dotenv").config();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

class User {
  static async createUser({
    role,
    first_name,
    last_name,
    age,
    mail,
    phone,
    city,
    password,
  }) {
    const created_at = new Date();
    const updated_at = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (role, first_name, last_name, age, mail, phone, city, password, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        role,
        first_name,
        last_name,
        age,
        mail,
        phone,
        city,
        hashedPassword,
        created_at,
        updated_at,
      ]
    );
    return result.rows[0];
  }

  static async getAllUsers() {
    const result = await pool.query("SELECT * FROM Users");
    return result.rows;
  }

  // In models/user.js - keep your existing queries but ensure they return id_user
  static async getUserById(id_user) {
    try {
      const result = await pool.query(
        `SELECT id_user, first_name, last_name, age, mail, phone, city, role 
         FROM users WHERE id_user = $1`,
        [id_user]
      );
      return result.rows[0] || null;
    } catch (err) {
      console.error("Database query error:", err);
      throw err; // This will trigger the 500 error response
    }
  }

  static async getUserByMail(mail) {
    const result = await pool.query("SELECT * FROM Users WHERE mail = $1", [
      mail,
    ]);
    return result.rows[0];
  }

  static async getUserByName(last_name) {
    const result = await pool.query(
      "SELECT * FROM Users WHERE last_name = $1",
      [last_name]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM Users WHERE id_salon = $1", [id]);
    return result.rows[0] || null;
  }

  static async getUserByFirstName(first_name) {
    const result = await pool.query(
      "SELECT * FROM Users WHERE first_name = $1",
      [first_name]
    );
    return result.rows[0];
  }

  static async getUserByAge(age) {
    const result = await pool.query("SELECT * FROM Users WHERE age = $1", [
      age,
    ]);
    return result.rows[0];
  }

  static async getUserByPhone(phone) {
    const result = await pool.query("SELECT * FROM Users WHERE phone = $1", [
      phone,
    ]);
    return result.rows[0];
  }

  static async getCoiffeursBySalon(id_salon) {
    const result = await pool.query("SELECT * FROM Users WHERE id_salon = $1", [
      id_salon,
    ]);
    return result.rows;
  }

  static async createCoiffeurInSalon({
    role,
    first_name,
    last_name,
    age,
    mail,
    phone,
    city,
    password,
    created_at,
    updated_at,
    id_cookie,
    id_privacy,
    id_salon,
  }) {
    const result = await pool.query(
      "INSERT INTO Users (role, first_name, last_name, age, mail, phone, city, password, created_at, updated_at, id_cookie, id_privacy, id_salon) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [
        role,
        first_name,
        last_name,
        age,
        mail,
        phone,
        city,
        password,
        created_at,
        updated_at,
        id_cookie,
        id_privacy,
        id_salon,
      ]
    );
    return result.rows[0];
  }

  static async updateUser(
    id,
    {
      role,
      first_name,
      last_name,
      age,
      mail,
      phone,
      city,
      password,
      created_at,
      updated_at,
      id_cookie,
      id_privacy,
      id_salon,
    }
  ) {
    const result = await pool.query(
      "UPDATE Users SET role = $1, first_name = $2, last_name = $3, age = $4, mail = $5, phone = $6, city = $7, password = $8, created_at = $9, updated_at = $10, id_cookie = $11, id_privacy = $12, id_salon = $13 WHERE id_user = $14 RETURNING *",
      [
        role,
        first_name,
        last_name,
        age,
        mail,
        phone,
        city,
        password,
        created_at,
        updated_at,
        id_cookie,
        id_privacy,
        id_salon,
        id,
      ]
    );
    return result.rows[0];
  }

  static async patchUserRole(id, { role }) {
    const result = await pool.query(
      "UPDATE Users SET role = $1 WHERE id_user = $2 RETURNING *",
      [role, id]
    );
    return result.rows[0];
  }

  static async patchUserAge(id, { age }) {
    const result = await pool.query(
      "UPDATE Users SET age = $1 WHERE id_user = $2 RETURNING *",
      [age, id]
    );
    return result.rows[0];
  }

  static async patchUserLastName(id, { last_name }) {
    const result = await pool.query(
      "UPDATE Users SET last_name = $1 WHERE id_user = $2 RETURNING *",
      [last_name, id]
    );
    return result.rows[0];
  }

  static async patchUserFirstName(id, { first_name }) {
    const result = await pool.query(
      "UPDATE Users SET first_name = $1 WHERE id_user = $2 RETURNING *",
      [first_name, id]
    );
    return result.rows[0];
  }

  static async patchUserMail(id, { mail }) {
    const result = await pool.query(
      "UPDATE Users SET mail = $1 WHERE id_user = $2 RETURNING *",
      [mail, id]
    );
    return result.rows[0];
  }

  static async patchUserPassword(id, { password }) {
    const result = await pool.query(
      "UPDATE Users SET password = $1 WHERE id_user = $2 RETURNING *",
      [password, id]
    );
    return result.rows[0];
  }

  static async patchUserPhone(id, { phone }) {
    const result = await pool.query(
      "UPDATE Users SET phone = $1 WHERE id_user = $2 RETURNING *",
      [phone, id]
    );
    return result.rows[0];
  }

  static async patchUserLocation(id, { city }) {
    const result = await pool.query(
      "UPDATE Users SET city = $1 WHERE id_user = $2 RETURNING *",
      [city, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    await pool.query("DELETE FROM Users WHERE id_user = $1", [id]);
  }
}

module.exports = User;
