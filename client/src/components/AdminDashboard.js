import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, deleteRecipe, approveRecipe } from "../JS/RecipeSlice";
import "./AdminDashboard.css";

const AdminDashboard = ({ setPing }) => {
  const dispatch = useDispatch();
  const { recipes, status } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

 const handleApprove = async (id) => {
    await dispatch(approveRecipe(id));
    setPing((prev) => !prev); 
  };

   const handleDelete = async (id) => {
    await dispatch(deleteRecipe(id));
    setPing((prev) => !prev); 
  };

  if (status === "loading") return <p>Chargement...</p>;

  return (
    <div className="admin-dashboard">
      <h2>Gestion des Recettes</h2>
      {recipes.map((r) => (
        <div key={r._id} className="recipe-card">
          <h3>{r.titre}</h3>
          <p>{r.description}</p>
          <p>Status: {r.isApproved ? " Approuvée" : "⏳ En attente"}</p>

          {!r.isApproved && (
            <button onClick={() => handleApprove(r._id)}>Approuver</button>
          )}
          <button onClick={() => handleDelete(r._id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
