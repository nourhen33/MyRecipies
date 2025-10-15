import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { addFavorite, removeFavorite } from "../JS/RecipeSlice"; 
import "./productcard.css";

function ProductCard({ recette, onView }) {
   const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.recipe);

  // Vérifie si la recette est déjà dans les favoris
  const isFavorite = favorites.some((fav) => fav._id === recette._id);

  // Gérer le clic sur le bouton 
  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(recette._id));
    } else {
      dispatch(addFavorite(recette));
    }
  };
  return (
    <div className="product-card">
      <div className="card-image">
        <img
          src={recette.imageUrl }
          alt={recette.titre}
        />
        <div className="time-badge">⏱ 15min</div>
         <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavorite}
        >
          {isFavorite ? "💖" : "🤍"}
        </button>
      </div>

      <div className="card-content">
        <h3 className="card-title">{recette.titre }</h3>
        <p className="card-description">
          {recette.steps }
        </p>

        <div className="card-info">
          <span> 👥 2 people</span>
          <span>•</span>
          <span>By {recette.chefId?.name || "Chef"}</span>
        </div>

        <button className="view-button" onClick={onView}>
           View
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
