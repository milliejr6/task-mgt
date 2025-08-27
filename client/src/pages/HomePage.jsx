// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const pages = [
    { name: "Tasks", path: "/tasks" },
    { name: "Today", path: "/today" },
    { name: "Upcoming", path: "/upcoming" },
  ];

  return (
    <div className="min-h-screen pt-35 bg-gray-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        Welcome User!
      </h1>

      <div className="grid pt-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {pages.map((page) => (
          <Link
            key={page.path}
            to={page.path}
            className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:bg-gray-700 transition transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-white text-center">
              {page.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
