import { useState, useEffect } from "react";
import axios from "axios";

function EditPasswordModal() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleUpdate = async () => {
    setMessage("");
    setError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (oldPassword === newPassword) {
      setError("Old password and new password cannot be the same");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You are not logged in");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/change_pass/",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="editPasswordModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: "15px" }}>

          <div className="modal-header">
            <h5 className="modal-title">Update Password</h5>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div className="modal-body p-4">
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>

          {(error || message) && (
            <div className="px-4 pb-3">
              {error && (
                <div className="alert alert-danger text-center mb-0">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success text-center mb-0">
                  {message}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default EditPasswordModal;
