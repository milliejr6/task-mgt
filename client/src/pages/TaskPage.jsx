import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const tasksWithEdit = res.data.map((task) => ({
        ...task,
        isEditing: false,
        editTitle: task.title,
        editDescription: task.description,
        editDueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        editPriority: task.priority || "medium",
      }));
      setTasks(tasksWithEdit);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        API_URL,
        { title, description, dueDate, status: "pending", priority },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks([
        ...tasks,
        {
          ...res.data,
          isEditing: false,
          editTitle: res.data.title,
          editDescription: res.data.description,
          editDueDate: res.data.dueDate ? res.data.dueDate.split("T")[0] : "",
          editPriority: res.data.priority || "medium",
        },
      ]);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdate = async (id, updatedTask) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(
        tasks.map((task) =>
          task._id === id
            ? {
                ...res.data,
                isEditing: false,
                editTitle: res.data.title,
                editDescription: res.data.description,
                editDueDate: res.data.dueDate
                  ? res.data.dueDate.split("T")[0]
                  : "",
                editPriority: res.data.priority || "medium",
              }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { status: "completed" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...res.data, isEditing: false } : task
        )
      );
    } catch (error) {
      console.error("Error marking task complete:", error);
    }
  };

  const handleMarkIncomplete = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { status: "pending" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...res.data, isEditing: false } : task
        )
      );
    } catch (error) {
      console.error("Error marking task incomplete:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Calculate progress
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalCount = tasks.length;
  const progress = totalCount ? (completedCount / totalCount) * 100 : 0;

  // Priority color mapping
  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        My Tasks
      </h1>
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="bg-gray-700 rounded-full h-4 w-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="bg-indigo-600 h-4 transition-all duration-300"
          ></div>
        </div>
        <p className="text-white text-sm mt-1 text-center">
          {completedCount} of {totalCount} tasks completed
        </p>
      </div>
      {/* MESSAGE AFTER ALL COMPLETED TASK */}
      <div className="max-w-3xl mx-auto mb-6 text-center">
        {completedCount === totalCount && totalCount > 0 && (
          <p className="text-indigo-400 font-semibold text-lg animate-pulse">
            🎉 You’ve completed all tasks today! Take a break!
          </p>
        )}
      </div>
      {/* Add Task Form */}
      <form
        onSubmit={handleAdd}
        className="mb-6 space-y-3 max-w-xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          required
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition">
          Add Task
        </button>
      </form>
      {/* Active Tasks */}
      <h2 className="text-xl font-semibold mb-3 text-center text-white">
        Active Tasks
      </h2>
      <ul className="space-y-3 max-w-3xl mx-auto">
        {tasks
          .filter((task) => task.status !== "completed")
          .map((task) => (
            <li
              key={task._id}
              className={`p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 ${
                priorityColors[task.priority || "medium"]
              }`}
            >
              <div className="flex-1 w-full">
                {task.isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={task.editTitle}
                      onChange={(e) =>
                        setTasks(
                          tasks.map((t) =>
                            t._id === task._id
                              ? { ...t, editTitle: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    />
                    <textarea
                      value={task.editDescription}
                      onChange={(e) =>
                        setTasks(
                          tasks.map((t) =>
                            t._id === task._id
                              ? { ...t, editDescription: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    />
                    <input
                      type="date"
                      value={task.editDueDate}
                      onChange={(e) =>
                        setTasks(
                          tasks.map((t) =>
                            t._id === task._id
                              ? { ...t, editDueDate: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    />
                    <select
                      value={task.editPriority}
                      onChange={(e) =>
                        setTasks(
                          tasks.map((t) =>
                            t._id === task._id
                              ? { ...t, editPriority: e.target.value }
                              : t
                          )
                        )
                      }
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-white">
                      {task.title}
                    </h3>
                    <p className="text-gray-300">{task.description}</p>
                    {task.dueDate && (
                      <p className="text-sm text-gray-400">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                {task.isEditing ? (
                  <>
                    <button
                      onClick={() =>
                        handleUpdate(task._id, {
                          title: task.editTitle,
                          description: task.editDescription,
                          dueDate: task.editDueDate,
                          priority: task.editPriority,
                          status: task.status,
                        })
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() =>
                        setTasks(
                          tasks.map((t) =>
                            t._id === task._id ? { ...t, isEditing: false } : t
                          )
                        )
                      }
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setTasks(
                          tasks.map((t) =>
                            t._id === task._id
                              ? {
                                  ...t,
                                  isEditing: true,
                                  editTitle: t.title,
                                  editDescription: t.description,
                                  editDueDate: t.dueDate
                                    ? t.dueDate.split("T")[0]
                                    : "",
                                  editPriority: t.priority || "medium",
                                }
                              : t
                          )
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleMarkComplete(task._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
      </ul>
      {/* Completed Tasks */}
      <div className="mt-6 max-w-3xl mx-auto">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition mb-3"
        >
          {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
        </button>
        {showCompleted && (
          <ul className="space-y-3">
            {tasks
              .filter((task) => task.status === "completed")
              .map((task) => (
                <li
                  key={task._id}
                  className={`p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 ${
                    priorityColors[task.priority || "medium"]
                  }`}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-400 line-through">
                      {task.title}
                    </h3>
                    <p className="text-gray-500 line-through">
                      {task.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                    <button
                      onClick={() => handleMarkIncomplete(task._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                    >
                      Undo
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
