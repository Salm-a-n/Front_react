import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditPasswordModal from "./edit_password";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("Please login to view your profile.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8000/api/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Session expired. Please login again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="fw-bold fs-4">Loading Profile…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5">
        {error}
      </div>
    );
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        }}
      >
        <div
          className="card border-0 shadow-lg"
          style={{
            width: "430px",
            borderRadius: "22px",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <div
            className="text-center p-4"
            style={{
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              color: "#fff",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="avatar"
              style={{
                width: "95px",
                height: "95px",
                borderRadius: "50%",
                border: "4px solid rgba(255,255,255,0.8)",
                marginBottom: "10px",
              }}
            />
            <h4 className="mb-0">{profile.name}</h4>
            <small style={{ opacity: 0.85 }}>Recipe Creator</small>
          </div>

          {/* Body */}
          <div className="p-4 bg-white">
            {/* Username */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-muted">
                Username
              </label>
              <div
                className="p-3 rounded"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                {profile.name}
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-muted">
                Email Address
              </label>
              <div
                className="p-3 rounded"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                {profile.email}
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-muted">
                Password
              </label>
              <div
                className="d-flex justify-content-between align-items-center p-3 rounded"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                }}
              >
                <span>••••••••</span>
                <button
                  className="btn btn-sm btn-outline-primary"
                  data-toggle="modal"
                  data-target="#editPasswordModal"
                >
                  Change
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="d-grid gap-2">
              <Link to="/recipes" className="btn btn-dark fw-semibold">
                ← Back to Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <EditPasswordModal />
    </>
  );
}

export default Profile;
