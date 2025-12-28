import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewRecipeModal({ recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) return;

    setLoading(true);
    setRecipe(null);

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/full_recipes/${recipeId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Recipe fetch error:", err.response?.data || err.message);
        setLoading(false);
      });
  }, [recipeId]);

  return (
    <div
      className="modal fade"
      id="viewRecipeModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <style>
        {`
          .recipe-hero {
            position: relative;
            height: 280px;
            overflow: hidden;
          }

          .recipe-hero img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .recipe-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.75),
              rgba(0,0,0,0.2)
            );
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
          }

          .info-chip {
            background: #ffffff;
            padding: 10px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          }

          .detail-title {
            font-weight: 700;
            margin-bottom: 6px;
          }
        `}
      </style>

      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 rounded-4 overflow-hidden">

          {loading && (
            <div className="text-center p-5 fw-semibold">
              Loading recipe...
            </div>
          )}

          {recipe && (
            <>
              <div className="recipe-hero">
                <img
                    src={
                      recipe.image
                        ? recipe.image.startsWith("http")
                          ? recipe.image
                          : `http://127.0.0.1:8000${recipe.image}`
                        : "/no-image.png"
                    }
                    alt={recipe.title}
                 />
                <div className="recipe-overlay">
                  <h3 className="fw-bold mb-1">{recipe.title}</h3>
                  <p className="mb-0 opacity-75">
                    👨‍🍳 Chef {recipe.shef}
                  </p>
                </div>
              </div>

              <div className="modal-body bg-light p-4">
                <div className="d-flex flex-wrap gap-3 mb-4">
                  <div className="info-chip">⏱ {recipe.time} mins</div>
                  <div className="info-chip">🔥 {recipe.difficulty}</div>
                  <div className="info-chip">
                    📅 {new Date(recipe.created_at).toDateString()}
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="detail-title text-success">
                    🧂 Ingredients
                  </h6>
                  <p className="text-muted mb-0">
                    {recipe.ingredients}
                  </p>
                </div>

                <div>
                  <h6 className="detail-title text-primary">
                    📋 Cooking Steps
                  </h6>
                  <p className="text-muted mb-0">
                    {recipe.steps}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="modal-footer bg-white border-0">
            <button
              className="btn btn-outline-secondary rounded-pill px-4"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewRecipeModal;
