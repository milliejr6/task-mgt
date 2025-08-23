import { useState } from "react";

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);

    const token = localStorage.getItem("token"); // JWT from login

    try {
      const res = await fetch("http://localhost:5000/api/premium/upgrade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send JWT
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert("🎉 You are now Premium!");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading ? "Upgrading..." : "Upgrade to Premium"}
    </button>
  );
}
