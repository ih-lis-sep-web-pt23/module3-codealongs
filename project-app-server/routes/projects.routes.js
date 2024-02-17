const router = require('express').Router();
const Project = require('../models/Project.model');
const Task = require('../models/Task.model');
const mongoose = require('mongoose');

// Create a new project
router.post('/projects', async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const newProject = await Project.create({
      title,
      description,
      tasks: []
    });

    console.log('New project', newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.log('An error occurred creating the project', error);
    next(error);
  }
});

// Gets all projects
router.get('/projects', async (req, res, next) => {
  console.log(req.headers);
  try {
    const allProjects = await Project.find().populate('tasks');

    res.json(allProjects);
  } catch (error) {
    console.log('An error occurred getting all projects', error);
    next(error);
  }
});

// Gets project by id
router.get('/projects/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    // check if id is a valid value in our DB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    const project = await Project.findById(id).populate('tasks');

    if (!project) {
      return res.status(404).json({ message: 'No project found' });
    }

    res.json(project);
  } catch (error) {
    console.log('An error occurred getting the project', error);
    next(error);
  }
});

// Update project by id
router.put('/projects/:id', async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description
      },
      {
        new: true
      }
    ).populate('tasks');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.log('An error occurred updating the project', error);
    next(error);
  }
});

router.delete('/projects/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Id is not valid' });
    }

    await Task.deleteMany({ project: id });

    await Project.findByIdAndDelete(id);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.log('An error occurred deleting the project', error);
    next(error);
  }
});

module.exports = router;
