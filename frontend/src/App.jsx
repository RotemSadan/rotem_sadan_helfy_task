import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from "./services/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("all");

  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPriority, setFormPriority] = useState("medium");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!formTitle.trim()) {
      setError("Please enter a title");
      return;
    }
    setError("");
    try {
      const task = await createTask({ title: formTitle.trim(), description: formDesc.trim(), priority: formPriority });
      setTasks((prev) => [...prev, task]);
      setFormTitle("");
      setFormDesc("");
      setFormPriority("medium");
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(task) {
    setEditing({ id: task.id, title: task.title, description: task.description || "", priority: task.priority || "medium" });
    setError("");
  }

  function cancelEdit() {
    setEditing(null);
  }

  async function handleSave() {
    if (!editing || !editing.title.trim()) {
      setError("Please enter a title");
      return;
    }
    setError("");
    try {
      const updated = await updateTask(editing.id, { title: editing.title.trim(), description: editing.description.trim(), priority: editing.priority });
      setTasks((prev) => prev.map((t) => (t.id === editing.id ? updated : t)));
      setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(id) {
    setError("");
    try {
      const updated = await toggleTask(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editing?.id === id) setEditing(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app-container">
      <h1>Tasks App</h1>

      <TaskForm
        title={formTitle}
        setTitle={setFormTitle}
        description={formDesc}
        setDescription={setFormDesc}
        priority={formPriority}
        setPriority={setFormPriority}
        onSubmit={handleAdd}
      />

      <TaskFilter filter={filter} setFilter={setFilter} />

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && tasks.length === 0 && <p>No tasks yet.</p>}

      <TaskList
        tasks={tasks}
        filter={filter}
        editing={editing}
        setEditing={setEditing}
        onSave={handleSave}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onStartEdit={startEdit}
        onCancelEdit={cancelEdit}
      />
    </div>
  );
}

export default App;
