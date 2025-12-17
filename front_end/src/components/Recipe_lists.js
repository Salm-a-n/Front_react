import Navbar from "./Navbar";
import Footer from "./footer";
import SearchBox from "./Searchbox";
import Pagination from "./Pagination";
import AddRecipeModal from "./Add-recipe";
import ViewRecipeModal from "./viewRecipeModal";
import { useNavigate } from "react-router-dom";

function RecipeList() {
  const navigate = useNavigate();

  const myRecipes = [
    {
      name: "Creamy Pasta",
      date: "2025-12-01",
      views: 245,
      image:
        "https://media.istockphoto.com/id/1225004589/photo/pasta-with-cream-sauce.jpg",
    },
    {
      name: "Chicken Biryani",
      date: "2025-12-05",
      views: 520,
      image:
        "https://i.pinimg.com/474x/81/6d/4e/816d4e036f2ffcf1ea334577f4a29659.jpg",
    },
    {
      name: "Chocolate Cake",
      date: "2025-12-10",
      views: 390,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    },
    {
      name: "Avocado Toast",
      date: "2025-12-12",
      views: 180,
      image:
        "https://images.squarespace-cdn.com/content/v1/5e8e046b33bab14de3b30150/1588040769856-GG1JZH7OWWN33X6K0K20/IMG_6029.jpg",
    },
    {
      name: "Grilled Salmon",
      date: "2025-12-14",
      views: 275,
      image:
        "https://images.unsplash.com/photo-1604908177522-432c5f3a6f6a",
    },
    {
      name: "Veggie Pizza",
      date: "2025-12-15",
      views: 610,
      image:
        "https://images.unsplash.com/photo-1601924582971-6f3c6e2a2a7f",
    },
  ];

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
        `}
      </style>

      <Navbar />

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


        <SearchBox placeholder="🔍 Search recipes..." />
        <h5 className="fw-bold text-secondary mb-4">🍽 Explore Recipes</h5>

    
        <div className="row g-4">
          {myRecipes.map((recipe, index) => (
            <div className="col-md-4" key={index}>
              <div className="card recipe-card h-100 border-0 rounded-4 overflow-hidden position-relative">
                <span className="views-badge">👁 {recipe.views}</span>

                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-img w-100"
                />

                <div className="card-body text-center">
                  <h5 className="fw-bold mb-2">{recipe.name}</h5>
                  <p className="text-muted small mb-3">
                    📅 {recipe.date}
                  </p>

                  <button
                    className="btn btn-outline-success w-100 rounded-pill fw-semibold"
                    data-toggle="modal"
                    data-target="#viewRecipeModal"
                    >
                    👀 View Recipe
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

 
        <div className="mt-5 d-flex justify-content-center">
          <Pagination currentPage={1} />
        </div>
      </div>

      <Footer />
      <AddRecipeModal />
      <ViewRecipeModal />
    </div>
  );
}

export default RecipeList;
