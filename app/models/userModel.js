const { getPool } = require('../config/db');

class UserModel {
  static async createUser(name, email, password) {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const pool = getPool(); // Obtenemos el pool
    const [result] = await pool.query(query, [name, email, password]);
    return { id: result.insertId, name, email, password };
  }

  static async checkEmailExists(email) {
    const query = 'SELECT 1 FROM users WHERE email = ? LIMIT 1';
    const pool = getPool();
    const [rows] = await pool.query(query, [email]);
    return rows.length > 0;
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    const pool = getPool();
    const [rows] = await pool.query(query, [email]);
    return rows.length ? rows[0] : null;
  }
}

module.exports = UserModel;
