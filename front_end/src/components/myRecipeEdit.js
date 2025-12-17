import React from "react";

function EditRecipeModal() {
  return (
    <div
      className="modal fade"
      id="editRecipeModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <style>
        {`
          .modal-header-premium {
            background: linear-gradient(135deg, #0d6efd, #20c997);
            color: #fff;
          }

          .section-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.05);
          }

          .input-box {
            border-radius: 14px;
            border: 1px solid #dee2e6;
            transition: all 0.2s ease;
          }

          .input-box:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.15rem rgba(13,110,253,.25);
          }

          .upload-zone {
            border: 2px dashed #adb5bd;
            border-radius: 16px;
            padding: 28px;
            text-align: center;
            background: #f8f9fa;
            transition: all 0.25s ease;
          }

          .upload-zone:hover {
            background: #eef7ff;
            border-color: #0d6efd;
          }

          .modal-footer-premium {
            background: #f8f9fa;
            border-top: none;
          }
        `}
      </style>

      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 rounded-4 shadow-lg">


          <div className="modal-header modal-header-premium rounded-top-4 d-flex justify-content-between align-items-center">
            <div>
              <h4 className="fw-bold mb-0">🍽 Create New Recipe</h4>
              <small className="opacity-75">
                Share your delicious creation with the community
              </small>
            </div>
            <button
              type="button"
              className="close text-white"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>

 
          <div className="modal-body bg-light p-4">

            <div className="section-card mb-4">
              <h6 className="fw-bold mb-3 text-primary">📌 Basic Information</h6>

              <input
                type="text"
                className="form-control form-control-lg input-box mb-3"
                placeholder="Recipe Name"
              />

              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control input-box"
                    placeholder="⏱ Cooking Time (e.g. 45 mins)"
                  />
                </div>
                <div className="col-md-6">
                  <select className="form-select input-box">
                    <option>🔥 Difficulty Level</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="section-card mb-4">
              <h6 className="fw-bold mb-3 text-success">📖 Recipe Details</h6>

              <div className="row g-3">
                <div className="col-md-6">
                  <textarea
                    className="form-control input-box"
                    style={{ height: "160px" }}
                    placeholder="🧂 Ingredients (one per line)"
                  />
                </div>

                <div className="col-md-6">
                  <textarea
                    className="form-control input-box"
                    style={{ height: "160px" }}
                    placeholder="📋 Cooking Steps"
                  />
                </div>
              </div>
            </div>


            <div className="section-card">
              <h6 className="fw-bold mb-3 text-warning">📸 Recipe Image</h6>

              <div className="upload-zone">
                <p className="fw-semibold mb-1">
                  Upload Image here 
                </p>
                <small className="text-muted d-block mb-3">
                  (JPG OR PNG) Only 
                </small>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                />
              </div>
            </div>

          </div>


          <div className="modal-footer modal-footer-premium px-4 py-3">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              data-dismiss="modal"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
            >
              🚀 Publish Recipe
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditRecipeModal;
