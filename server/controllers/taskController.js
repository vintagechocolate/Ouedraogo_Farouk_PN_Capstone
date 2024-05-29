const Task = require('../models/Task');

//Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Create a new task
exports.createTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    user: req.user._id,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Update a task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
