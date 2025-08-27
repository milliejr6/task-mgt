// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TaskPage from "./pages/TaskPage";
import UpcomingPage from "./pages/Upcoming";
import TodayPage from "./pages/Today";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/upcoming"
          element={
            <PrivateRoute>
              <UpcomingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/today"
          element={
            <PrivateRoute>
              <TodayPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
