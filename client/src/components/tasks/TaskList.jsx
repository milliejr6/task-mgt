import React from "react";

export default function TaskList({ tasks = [], onEdit, onDelete }) {
  // Ensure tasks is always an array
  if (!Array.isArray(tasks)) {
    return <p>No tasks available</p>;
  }

  return (
    <div className="grid gap-4">
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>

              {/* Status Badge */}
              <span
                className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status || "pending"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
