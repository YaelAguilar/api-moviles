const { getPool } = require('../../config/db');

class TaskModel {
  /**
   * Crea una nueva tarea
   * @param {string} userEmail - email del usuario
   * @param {string} title
   * @param {string} content
   * @returns {Object}
   */
  static async createTask(userEmail, title, content) {
    const query = 'INSERT INTO tasks (user_email, title, content) VALUES (?, ?, ?)';
    const pool = getPool();
    const [result] = await pool.query(query, [userEmail, title, content]);
    return { id: result.insertId, user_email: userEmail, title, content };
  }

  /**
   * Obtiene todas las tareas de un usuario
   * @param {string} userEmail
   * @returns {Array}
   */
  static async getTasksByUser(userEmail) {
    const query = 'SELECT * FROM tasks WHERE user_email = ? ORDER BY id DESC';
    const pool = getPool();
    const [rows] = await pool.query(query, [userEmail]);
    return rows;
  }

  static async getTaskById(userEmail, taskId) {
    const query = 'SELECT * FROM tasks WHERE id = ? AND user_email = ? LIMIT 1';
    const pool = getPool();
    const [rows] = await pool.query(query, [taskId, userEmail]);
    return rows.length ? rows[0] : null;
  }

  static async updateTask(userEmail, taskId, title, content) {
    const query = 'UPDATE tasks SET title = ?, content = ? WHERE id = ? AND user_email = ?';
    const pool = getPool();
    const [result] = await pool.query(query, [title, content, taskId, userEmail]);
    return result.affectedRows > 0;
  }

  static async deleteTask(userEmail, taskId) {
    const query = 'DELETE FROM tasks WHERE id = ? AND user_email = ?';
    const pool = getPool();
    const [result] = await pool.query(query, [taskId, userEmail]);
    return result.affectedRows > 0;
  }
}

module.exports = TaskModel;
