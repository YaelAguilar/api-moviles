require('dotenv').config();
const mysql = require('mysql2/promise');

let pool;

(async () => {
  try {
    // Creamos el pool de conexiones
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    // Verificamos la conexión intentando obtener una conexión temporal
    const connection = await pool.getConnection();
    console.log('¡Conexión a la base de datos establecida con éxito!');
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    // Si no se puede conectar a la BD, salimos con código 1
    process.exit(1);
  }
})();

module.exports = {
  // Exportamos la instancia del pool
  getPool: () => pool,
};
