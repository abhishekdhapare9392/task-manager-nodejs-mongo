const Task = require("../models/Tasks")
const asyncWrapper = require("../middleware/async")

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({
    status: 200,
    count: tasks.length,
    tasks: tasks,
  })
})

const getTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id
  const task = await Task.find({ _id: taskId })
  if (task.length == 0) {
    return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }

  res.status(200).json({
    status: 200,
    task: task,
  })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({
    status: 201,
    message: "Task created successfully!",
    task: task,
  })
})

const updateTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })
  if (task.length == 0) {
    return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }
  res.status(201).json({
    status: 201,
    message: "Taks is updated successfully.",
    task: task,
  })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id
  const task = await Task.findOneAndDelete({ _id: taskId })

  if (task.length == 0) {
    return res.status(404).json({ msg: `No task with id : ${taskId}` })
  }
  res.status(200).json({
    status: 200,
    message: "Task is deleted successfully",
    task: task,
  })
})

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}
