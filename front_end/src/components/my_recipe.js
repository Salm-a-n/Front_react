import Navbar from "./Navbar";
import Footer from "./footer";
import SearchBox from "./Searchbox";
import Pagination from "./Pagination";
import MyRecipeView from "./myRecipeView";
import EditRecipeModal from "./myRecipeEdit";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function MyRecipes() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user_recipes/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
        setAllRecipes(res.data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load recipes");
        setLoading(false);
      });
  }, [token]);

  const handleSearch = (query) => {
    setCurrentPage(1);

    if (!query.trim()) {
      setRecipes(allRecipes);
      setError("");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/search_user_recipes/", {
        params: { title: query },
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setRecipes([]);
        setError("No recipes found");
      });
  };
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDelete = async (recipeId, recipeName) => {
    const confirmDelete = window.confirm(
      `⚠️ Are you sure you want to delete "${recipeName}"?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/delete_user_recipe/${recipeId}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      // alert(`"${recipeName}" deleted successfully!`);
      setRecipes((prev) => prev.filter((r) => r.id !== recipeId));
      setAllRecipes((prev) => prev.filter((r) => r.id !== recipeId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete recipe");
    }
  };
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <style>
        {`
          .recipe-card {
            transition: all 0.25s ease-in-out;
          }
          .recipe-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.12);
          }
          .recipe-img {
            height: 220px;
            object-fit: cover;
          }
          .views-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(0,0,0,0.75);
            color: #fff;
            padding: 6px 12px;
            font-size: 0.8rem;
            border-radius: 20px;
            font-weight: 600;
          }
          .action-btn {
            width: 30%;
          }
        `}
      </style>

      <Navbar />

      <div className="container-fluid flex-grow-1 py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-secondary rounded-pill px-3"
              onClick={() => navigate("/recipes")}
            >
              ⬅ Back
            </button>

            <h2 className="fw-bold mb-0">
              📂 <span className="text-success">My Recipes</span>
            </h2>
          </div>
        </div>

        <SearchBox
          placeholder="🔍 Search my recipes..."
          onSearch={handleSearch}
        />

        <h5 className="fw-bold text-secondary mb-4">
          🍳 Recipes You Created
        </h5>

        {loading && (
          <div className="text-center py-5 fw-semibold">
            Loading recipes...
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        <div className="row g-4">
          {currentRecipes.map((recipe) => (
            <div className="col-md-4" key={recipe.id}>
              <div className="card recipe-card h-100 border-0 rounded-4 overflow-hidden position-relative">
                <span className="views-badge">👁 {recipe.views}</span>

                <img
                  src={recipe.image ? recipe.image : "/no-image.png"}
                  alt={recipe.title}
                  className="recipe-img w-100"
                />

                <div className="card-body text-center">
                  <h5 className="fw-bold mb-2">{recipe.title}</h5>
                  <p className="text-muted small mb-3">
                    ⏱ {recipe.time} mins
                  </p>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-success rounded-pill action-btn fw-semibold"
                      data-toggle="modal"
                      data-target="#MyRecipeView"
                      onClick={() => setSelectedRecipeId(recipe.id)}
                    >
                       View Recipe
                    </button>

                    <button
                      className="btn btn-outline-success rounded-pill action-btn fw-semibold"
                      data-toggle="modal"
                      data-target="#editRecipeModal"
                      onClick={() => setSelectedRecipeId(recipe.id)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-outline-danger rounded-pill action-btn fw-semibold"
                      onClick={() =>
                        handleDelete(recipe.id, recipe.title)
                      }
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <Footer />
      <MyRecipeView recipeId={selectedRecipeId} />
      <EditRecipeModal recipeId={selectedRecipeId} />
    </div>
  );
}

export default MyRecipes;

