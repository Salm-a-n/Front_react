import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRecipeModal() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [time, setTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("You must be logged in");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("time", time);
    formData.append("difficulty", difficulty);
    if (image) formData.append("image", image);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8000/api/add_recipe/",
        formData,
        {
          headers: {
           Authorization: `Token ${token}` ,
          "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Recipe added successfully!");

   
      setTitle("");
      setIngredients("");
      setSteps("");
      setTime("");
      setDifficulty("");
      setImage(null);
      window.$("#addRecipeModal").modal("hide");
      navigate("/my-recipes/");

    } catch (error) {
      console.error(error);
      setMessage("Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="addRecipeModal"
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
        <form
          className="modal-content border-0 rounded-4 shadow-lg"
          onSubmit={handleSubmit}
        >
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
            {message && (
              <div className="alert alert-info text-center">{message}</div>
            )}

            <div className="section-card mb-4">
              <h6 className="fw-bold mb-3 text-primary">
                Basic Information
              </h6>

              <input
                type="text"
                className="form-control form-control-lg input-box mb-3"
                placeholder="Recipe Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control input-box"
                    placeholder="⏱ Cooking Time (e.g. 45 mins)"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select input-box"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    required
                  >
                    <option value=""> Difficulty Level</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="section-card mb-4">
              <h6 className="fw-bold mb-3 text-success">
                 Recipe Details
              </h6>

              <div className="row g-3">
                <div className="col-md-6">
                  <textarea
                    className="form-control input-box"
                    style={{ height: "160px" }}
                    placeholder=" Ingredients (one per line)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <textarea
                    className="form-control input-box"
                    style={{ height: "160px" }}
                    placeholder=" Cooking Steps"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="section-card">
              <h6 className="fw-bold mb-3 text-warning">
                Recipe Image
              </h6>

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
                  onChange={(e) => setImage(e.target.files[0])}
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
              disabled={loading}
            >
              {loading ? "Publishing..." : " Recipe Published "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeModal;
