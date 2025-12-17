import React from "react";

function RecipeTable({ recipes }) {
  return (
    <div>
      <h4 className="fw-bold mb-3">My Recipes</h4>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Recipe Name</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe, index) => (
            <tr key={index}>
              <td>{recipe.name}</td>
              <td>{recipe.date}</td>
              <td>
                <button className="btn btn-primary btn-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecipeTable;