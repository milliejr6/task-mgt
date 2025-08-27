import React, { useState } from "react";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://task-mgt-ns9c.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (res.ok) {
        onTaskAdded(data); // update parent state
        setTitle("");
        setDescription("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded-lg mb-4"
    >
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Add Task
      </button>
    </form>
  );
}
