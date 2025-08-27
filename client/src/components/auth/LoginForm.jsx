import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong, try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-900">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-800 shadow-lg rounded-lg w-96 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600 placeholder-gray-300 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600 placeholder-gray-300 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 py-3 rounded hover:bg-indigo-700 transition-colors font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
