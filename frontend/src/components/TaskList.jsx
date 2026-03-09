import { useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, filter, editing, setEditing, onSave, onToggle, onDelete, onStartEdit, onCancelEdit }) {
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    if (visibleTasks.length === 0) setIndex(0);
    else setIndex((i) => Math.min(i, visibleTasks.length - 1));
  }, [visibleTasks.length]);

  useEffect(() => {
    if (!autoPlay || visibleTasks.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % visibleTasks.length);
    }, 2500);

    return () => clearInterval(id);
  }, [visibleTasks.length, autoPlay]);

  if (visibleTasks.length === 0) {
    return <ul className="task-list" />;
  }

  function pauseThenResume() {
    setAutoPlay(false);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setAutoPlay(true), 5000);
  }

  function goPrev() {
    pauseThenResume();
    setIndex((prev) => (prev - 1 + visibleTasks.length) % visibleTasks.length);
  }

  function goNext() {
    pauseThenResume();
    setIndex((prev) => (prev + 1) % visibleTasks.length);
  }

  return (
    <div className="carousel">
      <div className="carousel-window">
        <ul
          className="task-list carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {visibleTasks.map((task) => (
            <li key={task.id} className="carousel-item">
              <TaskItem
                task={task}
                editing={editing}
                setEditing={setEditing}
                onSave={onSave}
                onToggle={onToggle}
                onDelete={onDelete}
                onStartEdit={onStartEdit}
                onCancelEdit={onCancelEdit}
              />
            </li>
          ))}
        </ul>
      </div>

      {visibleTasks.length > 1 && (
        <div className="carousel-controls">
          <button type="button" onClick={goPrev}>‹</button>
          <button type="button" onClick={goNext}>›</button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
