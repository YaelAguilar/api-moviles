const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'El campo "name" es requerido.' });
      }
      if (!email) {
        return res.status(400).json({ error: 'El campo "email" es requerido.' });
      }
      if (!password) {
        return res.status(400).json({ error: 'El campo "password" es requerido.' });
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El email no tiene un formato válido.' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
      }

      const userExists = await UserModel.checkEmailExists(email);
      if (userExists) {
        return res.status(400).json({ error: 'El usuario ya está registrado con este email.' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await UserModel.createUser(name, email, hashedPassword);

      return res.json({
        success: true,
        message: 'Usuario registrado con éxito.'
      });
    } catch (error) {
      console.error('Error en register:', error);
      return res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y password son requeridos.' });
      }

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Email o contraseña inválidos.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Email o contraseña inválidos.' });
      }

      const token = jwt.sign(
        { userId: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        success: true,
        message: 'Autenticación exitosa',
        token
      });
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
  }

  static about(req, res) {
    return res.json({
      success: true,
      message: `¡Hola, ${req.user.name}! Esta es una ruta protegida.`,
      userData: req.user,
    });
  }
}

module.exports = AuthController;
