import React, { useState } from "react";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://task-mgt-ns9c.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong, try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-900">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-gray-800 shadow-lg rounded-lg w-96 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600 placeholder-gray-300 text-white"
          required
        />
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
          className="w-full bg-green-600 py-3 rounded hover:bg-green-700 transition-colors font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
