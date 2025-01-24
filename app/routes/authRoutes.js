const express = require('express');
const AuthController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/about', authenticateToken, AuthController.about);

module.exports = router;
