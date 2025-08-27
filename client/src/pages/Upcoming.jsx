import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://task-mgt-ns9c.onrender.com/api/tasks";

export default function UpcomingPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const today = new Date();
        const upcoming = res.data.filter(
          (task) => task.dueDate && new Date(task.dueDate) > today
        );

        setTasks(upcoming);
      } catch (error) {
        console.error("Error fetching upcoming tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        Upcoming Tasks
      </h1>

      {tasks.length === 0 ? (
        <p className="text-gray-300 text-center text-lg">
          No upcoming tasks 🎉
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
