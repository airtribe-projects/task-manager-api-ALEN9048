const express = require('express');
const app = express();
const port = 3000;
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// ─── In-memory task store loaded from task.json ───────────────────────────────
const taskData = require('./task.json');
let tasks = taskData.tasks;
 
// ─── Validation helper ────────────────────────────────────────────────────────
function isValidTask(body) {
  return (
    body.title !== undefined &&
    body.description !== undefined &&
    body.completed !== undefined &&
    typeof body.title === 'string' &&
    typeof body.description === 'string' &&
    typeof body.completed === 'boolean'
  );
}
 
// ─── Routes ───────────────────────────────────────────────────────────────────
 
// GET /tasks - return all tasks as an array
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});
 
// GET /tasks/:id - return a single task
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.status(200).json(task);
});
 
// POST /tasks - create a new task
app.post('/tasks', (req, res) => {
  if (!isValidTask(req.body)) {
    return res.status(400).json({ error: 'Invalid task data. title, description, and completed (boolean) are required.' });
  }
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
 
// PUT /tasks/:id - fully update a task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
 
  if (!isValidTask(req.body)) {
    return res.status(400).json({ error: 'Invalid task data. title, description, and completed (boolean) are required.' });
  }
 
  tasks[index] = {
    id,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  res.status(200).json(tasks[index]);
});
 
// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
 
  const deleted = tasks.splice(index, 1)[0];
  res.status(200).json({ message: 'Task deleted successfully', task: deleted });
});
 
// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});
 
module.exports = app;