import { createBrowserRouter } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import App from "./App";
import RecipeList from "./components/Recipe_lists";
import Pagination  from "./components/Pagination";
import SearchBox from "./components/Searchbox";
import AddRecipeModal from "./components/Add-recipe";
import MyRecipes from "./components/my_recipe";
import ViewRecipeModal from "./components/viewRecipeModal";
import MyRecipeView from "./components/myRecipeView";
import EditRecipeModal from "./components/myRecipeEdit";
import EditPasswordModal from "./components/edit_password";
import Profile from "./components/profile";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'register/', element: <Register/> },
    { path: 'login/', element:<Login/> },
    { path: 'recipes/', element:<RecipeList/>},
    { path: 'pagination/', element:<Pagination/>},
    { path: 'search/',element:<SearchBox/>},
    { path: 'add-recipe/', element:<AddRecipeModal/>},
    { path: 'my-recipes/', element:<MyRecipes/>},
    { path: 'view-recipe/', element:<ViewRecipeModal/>},
    { path: 'my-recipe-view/', element:<MyRecipeView/>},
    { path: 'edit-recipe/', element:<EditRecipeModal/>},
    { path: 'edit-password/', element:<EditPasswordModal/>},
    { path: 'profile/', element:<Profile/>},
]);
export default router;