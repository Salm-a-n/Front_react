
import React, { useEffect, useState } from "react";
import axios from "axios";

function EditRecipeModal({ recipeId, onClose, onUpdate }) {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    steps: "",
    time: "",
    difficulty: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");


  useEffect(() => {
    if (!recipeId) return;

    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/user_recipes/${recipeId}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setRecipeData({
          title: res.data.title || "",
          ingredients: res.data.ingredients || "",
          steps: res.data.steps || "",
          time: res.data.time || "",
          difficulty: res.data.difficulty || "",
          image: null,
        });
        setPreviewImage(res.data.image || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [recipeId, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setRecipeData({ ...recipeData, [name]: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setRecipeData({ ...recipeData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(recipeData).forEach((key) => {
      if (recipeData[key] !== null) formData.append(key, recipeData[key]);
    });

    axios
      .put(
        `http://127.0.0.1:8000/api/user_recipes/${recipeId}/edit/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        alert("Recipe updated successfully!");
        if (onUpdate) onUpdate();
        if (onClose) onClose();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update recipe.");
      });
  };

  if (!recipeId) return null;

  return (
    <div
      className="modal fade"
      id="editRecipeModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 rounded-4 shadow-lg">

          {/* Modal Header */}
          <div className="modal-header modal-header-premium rounded-top-4 d-flex justify-content-between align-items-center">
            <div>
              <h4 className="fw-bold mb-0">🍽 Edit Recipe</h4>
              <small className="opacity-75">
                Update your delicious creation
              </small>
            </div>
            <button
              type="button"
              className="close text-dark"
              data-dismiss="modal"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body bg-light p-4">
            {loading ? (
              <div className="text-center py-5">Loading...</div>
            ) : (
              <>
                {/* Basic Info */}
                <div className="section-card mb-4">
                  <h6 className="fw-bold mb-3 text-primary">📌 Basic Information</h6>

                  <label className="form-label fw-semibold">Recipe Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg input-box mb-3"
                    placeholder="Recipe Name"
                    name="title"
                    value={recipeData.title}
                    onChange={handleChange}
                  />

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Cooking Time</label>
                      <input
                        type="text"
                        className="form-control input-box"
                        placeholder="⏱ Cooking Time (e.g. 45 mins)"
                        name="time"
                        value={recipeData.time}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Difficulty Level</label>
                      <select
                        className="form-select input-box"
                        name="difficulty"
                        value={recipeData.difficulty}
                        onChange={handleChange}
                      >
                        <option>🔥 Difficulty Level</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Recipe Details */}
                <div className="section-card mb-4">
                  <h6 className="fw-bold mb-3 text-success">📖 Recipe Details</h6>

                  <label className="form-label fw-semibold">Ingredients</label>
                  <textarea
                    className="form-control input-box mb-3"
                    style={{ height: "160px" }}
                    placeholder="🧂 Ingredients (one per line)"
                    name="ingredients"
                    value={recipeData.ingredients}
                    onChange={handleChange}
                  />

                  <label className="form-label fw-semibold">Cooking Steps</label>
                  <textarea
                    className="form-control input-box"
                    style={{ height: "160px" }}
                    placeholder="📋 Cooking Steps"
                    name="steps"
                    value={recipeData.steps}
                    onChange={handleChange}
                  />
                </div>
                <div className="section-card">
                  <h6 className="fw-bold mb-3 text-warning">📸 Recipe Image</h6>
                  <label className="form-label fw-semibold">Upload Image</label>
                  <div className="upload-zone">
                    <p className="fw-semibold mb-1">Upload Image here</p>
                    <small className="text-muted d-block mb-3">(JPG or PNG only)</small>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      name="image"
                      onChange={handleChange}
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-3 rounded-3"
                        style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer modal-footer-premium px-4 py-3">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4"
              data-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
              onClick={handleSubmit}
            >
              Update 
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditRecipeModal;
