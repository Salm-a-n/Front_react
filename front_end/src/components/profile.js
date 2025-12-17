import { Link } from "react-router-dom";
import EditPasswordModal from "./edit_password";

function Profile() {
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
      >
        <div
          className="card shadow-sm border-0"
          style={{ width: "400px", borderRadius: "15px" }}
        >
          <div
            className="text-center p-4"
            style={{ borderBottom: "1px solid #dee2e6" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginBottom: "10px",
              }}
            />
            <h4 className="mb-1">Salman</h4>
            <small className="text-muted">Recipe Creator</small>
          </div>


          <div className="p-4">

            <div className="mb-3">
              <label className="form-label">Username</label>
              <div
                className="border rounded p-2"
                style={{ backgroundColor: "#fff" }}
              >
                Salman
              </div>
            </div>


            <div className="mb-3">
              <label className="form-label">Email</label>
              <div
                className="border rounded p-2"
                style={{ backgroundColor: "#fff" }}
              >
                salman@example.com
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="d-flex justify-content-between align-items-center border rounded p-2 bg-white">
                <span>********</span>
                <button
                  className="btn btn-sm btn-primary"
                  data-toggle="modal"
                  data-target="#editPasswordModal"
                >
                  Update
                </button>
              </div>
            </div>

            <div className="d-grid">
              <Link to="/recipes" className="btn btn-secondary">
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
