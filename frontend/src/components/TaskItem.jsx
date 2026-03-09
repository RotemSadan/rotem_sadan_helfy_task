function TaskItem({ task, editing, setEditing, onSave, onToggle, onDelete, onStartEdit, onCancelEdit }) {
  const isEditing = editing && editing.id === task.id;

  function formatDate(str) {
    if (!str) return "";
    return new Date(str).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
  }

  if (isEditing) {
    return (
      <div className="task-item task-item--edit">
        <input
          value={editing.title}
          onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          placeholder="Title"
        />
        <input
          value={editing.description}
          onChange={(e) => setEditing({ ...editing, description: e.target.value })}
          placeholder="Description"
        />
        <select value={editing.priority} onChange={(e) => setEditing({ ...editing, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="task-actions">
          <button onClick={onSave}>Save</button>
          <button type="button" onClick={onCancelEdit}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? "task-item--done" : ""} priority-${task.priority || "medium"}`}>
      <label className="task-item-content">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <div>
          <span className="task-item-title">{task.title}</span>
          {task.description && <p className="task-item-desc">{task.description}</p>}
          <span className="task-item-meta">
            {task.priority} · {formatDate(task.createdAt)}
          </span>
        </div>
      </label>
      <div className="task-actions">
        <button onClick={() => onStartEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
