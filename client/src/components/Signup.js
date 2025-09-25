// src/pages/Signup.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/signup", formData);
    if (res.status === 200) {
      toast.success(res.data.message);
      navigate("/dashboard");
    } else if (res.status === 201) {
      toast.warning(res.data.message);
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Create Account</h2>
          <p className="text-muted">Sign up with your details</p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="username"
              id="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-pill"
              name="email"
              id="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-pill"
              name="password"
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              required
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary rounded-pill fw-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <a href="/login" className="fw-semibold text-decoration-none">
              Log in
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
