// src/pages/Login.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", formData);
      switch (res.status) {
        case 200:
          toast.success(res.data.message);
          navigate("/dashboard");
          break;
      }
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.warning(error.response.data.message || "Login failed.");
          break;
        case 401:
          toast.error(error.response.data.message);
          break;
      }
      if (error.response) {
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "1rem" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Welcome Back</h2>
          <p className="text-muted">Log in to your account</p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary rounded-pill fw-semibold"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <a href="/signup" className="fw-semibold text-decoration-none">
              Sign up
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
