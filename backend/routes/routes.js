const express = require("express");
const router = express.Router();

let tasks = [
  { id: 1, title: "Learn React basics", description: "Get familiar with components and hooks", completed: false, createdAt: new Date().toISOString(), priority: "high" },
  { id: 2, title: "Build Express server", description: "API and routes", completed: false, createdAt: new Date().toISOString(), priority: "medium" },
  { id: 3, title: "Write API docs", description: "Document endpoints in README", completed: false, createdAt: new Date().toISOString(), priority: "low" },
  { id: 4, title: "Add input validation", description: "Basic checks on request body", completed: false, createdAt: new Date().toISOString(), priority: "medium" },
  { id: 5, title: "Refactor TaskItem", description: "Clean up JSX and props", completed: false, createdAt: new Date().toISOString(), priority: "low" },
  { id: 6, title: "Improve carousel UI", description: "Tweak spacing and hover effects", completed: false, createdAt: new Date().toISOString(), priority: "medium" },
  { id: 7, title: "Handle API errors", description: "Show friendly error messages", completed: false, createdAt: new Date().toISOString(), priority: "high" },
  { id: 8, title: "Mobile layout pass", description: "Check layout on small screens", completed: false, createdAt: new Date().toISOString(), priority: "medium" },
  { id: 9, title: "Add more seed tasks", description: "Stress‑test the carousel", completed: false, createdAt: new Date().toISOString(), priority: "low" },
  { id: 10, title: "Review code style", description: "Look for unused imports and files", completed: false, createdAt: new Date().toISOString(), priority: "low" },
  { id: 11, title: "Test toggle endpoint", description: "Make sure PATCH /toggle works", completed: false, createdAt: new Date().toISOString(), priority: "medium" },
  { id: 12, title: "Try different priorities", description: "Check colors for low/medium/high", completed: false, createdAt: new Date().toISOString(), priority: "high" },
];

function validPriority(p) {
  return ["low", "medium", "high"].includes(p) ? p : "medium";
}

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const { title, description = "", priority } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const task = {
    id,
    title: title.trim(),
    description: String(description).trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    priority: validPriority(priority),
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, priority } = req.body;
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  if (!title || !title.trim()) return res.status(400).json({ error: "Title is required" });
  task.title = title.trim();
  task.description = String(description ?? task.description).trim();
  task.priority = validPriority(priority);
  res.json(task);
});

router.patch("/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.completed = !task.completed;
  res.json(task);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;
