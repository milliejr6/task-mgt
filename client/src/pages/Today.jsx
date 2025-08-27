// src/pages/TodayPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export default function Today() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const todayTasks = res.data.filter(
          (task) => task.dueDate && task.dueDate.split("T")[0] === today
        );

        setTasks(todayTasks);
      } catch (err) {
        console.error("Error fetching today tasks:", err);
      }
    };

    fetchTodayTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        Today’s Tasks
      </h1>

      {tasks.length === 0 ? (
        <p className="text-gray-300 text-center text-lg">
          No tasks for today 🎉
        </p>
      ) : (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-gray-800 p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
            >
              <div className="flex-1 w-full">
                <h2 className="text-lg font-semibold text-white">
                  {task.title}
                </h2>
                <p className="text-gray-300">{task.description}</p>
              </div>
              <span className="mt-2 md:mt-0 text-sm text-gray-400">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
