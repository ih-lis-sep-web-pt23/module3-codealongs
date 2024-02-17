const router = require('express').Router();
const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

router.post('/tasks', async (req, res, next) => {
  const { title, description, projectId } = req.body;

  try {
    const newTask = await Task.create({
      title,
      description,
      project: projectId
    });

    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: newTask._id }
    });

    res.json(newTask);
  } catch (error) {
    console.log('An error occurred creating a new task', error);
    next(error);
  }
});

module.exports = router;
