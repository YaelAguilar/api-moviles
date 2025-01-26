const express = require('express');
const TaskController = require('../controllers/taskController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticateToken);

// Crear una nueva tarea
router.post('/', TaskController.createTask);

// Obtener todas las tareas
router.get('/', TaskController.getAllTasks);

// Obtener una sola tarea
router.get('/:id', TaskController.getTask);

// Actualizar tarea
router.patch('/:id', TaskController.updateTask);

// Eliminar tarea
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
