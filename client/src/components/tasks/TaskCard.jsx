import React from "react";

export default function TaskCard({ task, onDelete, onUpdate }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow mb-3 flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-400">
          Status: {task.completed ? "✅ Completed" : "⏳ Pending"}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onUpdate(task._id, { completed: !task.completed })}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
