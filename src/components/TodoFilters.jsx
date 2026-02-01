export default function TodoFilters({ filter, setFilter }) {
  return (
    <div className="flex gap-2">
      {["all", "todo", "done"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={filter === f ? "font-bold" : ""}
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
