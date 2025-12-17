import React from "react";

function ViewRecipeModal() {
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

          <div className="recipe-hero">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Recipe"
            />
            <div className="recipe-overlay">
              <h3 className="fw-bold mb-1">Vegitable Pasta</h3>
              <p className="mb-0 opacity-75">👨‍🍳 Chef Salman</p>
            </div>
          </div>

          <div className="modal-body bg-light p-4">


            <div className="d-flex flex-wrap gap-3 mb-4">
              <div className="info-chip">⏱ 45 mins</div>
              <div className="info-chip">🔥 Medium</div>
              <div className="info-chip">📅 01 Dec 2025</div>
            </div>


            <div className="mb-4">
              <h6 className="detail-title text-success">🧂 Ingredients</h6>
              <p className="text-muted mb-0">
                Pasta, Cream, Garlic, Butter, Cheese, Herbs
              </p>
            </div>

            <div>
              <h6 className="detail-title text-primary">📋 Cooking Steps</h6>
              <p className="text-muted mb-0">
                Boil pasta → Prepare creamy sauce → Mix together →
                Garnish → Serve hot
              </p>
            </div>

          </div>


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
