function TaskFilter({ filter, setFilter }) {
  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];
  return (
    <div className="task-filter">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={filter === o.value ? "task-filter-btn active" : "task-filter-btn"}
          onClick={() => setFilter(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;

