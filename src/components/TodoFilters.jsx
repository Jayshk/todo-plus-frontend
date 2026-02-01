export default function TodoFilters({ filter, setFilter }) {
  return (
    <div className="flex gap-2">
      {["all", "todo", "done"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded border ${
            filter === f ? "bg-blue-500 text-white" : ""
          }`}
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
