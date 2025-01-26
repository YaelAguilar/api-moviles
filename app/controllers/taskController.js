const TaskModel = require('../models/taskModel');

class TaskController {

  static async createTask(req, res) {
    try {
      const userEmail = req.user.userId;
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'title y content son requeridos.' });
      }

      const newTask = await TaskModel.createTask(userEmail, title, content);
      return res.json({ success: true, task: newTask });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la tarea.' });
    }
  }

  static async getAllTasks(req, res) {
    try {
      const userEmail = req.user.userId;
      const tasks = await TaskModel.getTasksByUser(userEmail);
      return res.json({ success: true, tasks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener tareas.' });
    }
  }

  static async getTask(req, res) {
    try {
      const userEmail = req.user.userId;
      const { id } = req.params;
      const task = await TaskModel.getTaskById(userEmail, id);
      if (!task) {
        return res.status(404).json({ error: 'No se encontró la tarea.' });
      }
      return res.json({ success: true, task });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener la tarea.' });
    }
  }

  static async updateTask(req, res) {
    try {
      const userEmail = req.user.userId;
      const { id } = req.params;
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'title y content son requeridos.' });
      }

      const updated = await TaskModel.updateTask(userEmail, id, title, content);
      if (!updated) {
        return res.status(404).json({ error: 'No se encontró la tarea o no se pudo actualizar.' });
      }
      return res.json({ success: true, message: 'Tarea actualizada.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al actualizar la tarea.' });
    }
  }

  static async deleteTask(req, res) {
    try {
      const userEmail = req.user.userId;
      const { id } = req.params;

      const deleted = await TaskModel.deleteTask(userEmail, id);
      if (!deleted) {
        return res.status(404).json({ error: 'No se encontró la tarea o no se pudo eliminar.' });
      }
      return res.json({ success: true, message: 'Tarea eliminada.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al eliminar la tarea.' });
    }
  }
}

module.exports = TaskController;
