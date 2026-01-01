import Navbar from "./Navbar";
import Footer from "./footer";
import SearchBox from "./Searchbox";
import Pagination from "./Pagination";
import AddRecipeModal from "./Add-recipe";
import ViewRecipeModal from "./viewRecipeModal";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeList() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const [showToast, setShowToast] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;

  useEffect(() => {
    if (successMessage) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 2000);
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/full_recipes/")
      .then((response) => {
        setRecipes(response.data.recipes);
        setAllRecipes(response.data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load recipes");
        setLoading(false);
      });
  }, []);


  const handleSearch = (query) => {
    setCurrentPage(1); 

    if (!query.trim()) {
      setRecipes(allRecipes);
      return;
    }

    setSearching(true);

    axios
      .get("http://127.0.0.1:8000/api/search_recipes_public/", {
        params: { title: query },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
        setSearching(false);
      })
      .catch((err) => {
        console.error(err);
        setRecipes([]);
        setSearching(false);
      });
  };


  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          .login-toast {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            min-width: 320px;
            padding: 14px 22px;
            background: linear-gradient(135deg, #28a745, #218838);
            color: #fff;
            font-weight: 600;
            border-radius: 12px;
            box-shadow: 0 12px 30px rgba(0,0,0,0.2);
            animation: slideFade 0.4s ease;
          }
          @keyframes slideFade {
            from {
              opacity: 0;
              transform: translate(-50%, -15px);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          }
        `}
      </style>

      <Navbar />

      {showToast && <div className="login-toast">✅ Login successfully</div>}

      <div className="container-fluid flex-grow-1 py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold mb-0">
            📖 <span className="text-success">Recipes</span>
          </h2>

          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-primary btn-lg rounded-pill px-4 fw-semibold"
              onClick={() => navigate("/my-recipes")}
            >
              📂 My Recipes
            </button>

            <button
              className="btn btn-success btn-lg rounded-pill px-4 fw-semibold"
              data-toggle="modal"
              data-target="#addRecipeModal"
            >
              ➕ Add Recipe
            </button>
          </div>
        </div>

        <SearchBox placeholder="🔍 Search recipes..." onSearch={handleSearch} />

        <h5 className="fw-bold text-secondary mb-4">🍽 Explore Recipes</h5>

        {loading && (
          <div className="text-center py-5 fw-semibold">Loading recipes...</div>
        )}
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
        {searching && (
          <div className="text-center py-3 text-muted">Searching recipes...</div>
        )}
        {!loading && !searching && recipes.length === 0 && (
          <div className="text-center py-5 fw-semibold text-muted">
            😕 No recipes found
          </div>
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
                  <h5 className="fw-bold mb-1">{recipe.title}</h5>
                  <p className="text-muted small mb-1">👨‍🍳 {recipe.shef}</p>
                  <p className="text-muted small mb-3">⏱ {recipe.time} mins</p>

                  <button
                    className="btn btn-outline-success w-100 rounded-pill fw-semibold"
                    data-toggle="modal"
                    data-target="#viewRecipeModal"
                    onClick={() => setSelectedRecipeId(recipe.id)}
                  >
                    👀 View Recipe
                  </button>
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
      <AddRecipeModal />
      <ViewRecipeModal recipeId={selectedRecipeId} />
    </div>
  );
}

export default RecipeList;
