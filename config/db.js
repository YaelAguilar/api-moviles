require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

(async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    const connection = await pool.getConnection();
    console.log('¡Conexión a la base de datos establecida con éxito!');
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    process.exit(1);
  }
})();

module.exports = {
  getPool: () => pool,
};
