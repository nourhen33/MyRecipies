import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { getAllRecipes } from "../JS/RecipeSlice";
import "./productcard.css";

function Home() {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipe);
  const { ping } = useSelector((state) => state.app || state.recipe);

  const [category, setCategory] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState(null); 

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch, ping]);

 // Filtrer les recettes approuvées seulement
  const approvedRecipes = recipes?.filter((r) => r.isApproved);

  //  Appliquer ensuite le filtre de catégorie
  const filteredRecipes =
    category === "all"
      ? approvedRecipes
      : approvedRecipes.filter((r) => r.category === category);

  return (
    <div className="home">
      {!selectedRecipe ? (
        <>
          {/*  RECIPES LIST  */}
          <div className="recipes text-center my-8">
            <h1 className="text-3xl font-bold text-green-700">
              Discover delicious recipes
            </h1>
            <p className="text-gray-600 mt-2">
              Share your culinary creations and explore recipes from our community
            </p>

            {/* CATEGORY FILTERS  */}
            <div className="icons-recipes flex justify-center gap-8 mt-8">
              <button
                onClick={() => setCategory("all")}
                className={`flex flex-col items-center ${
                  category === "all" ? "text-green-700 font-bold" : ""
                }`}
              >
                <img
                  src="images/incon.jpg"
                  alt="all"
                  className="w-16 h-16 rounded-full border border-gray-300 hover:scale-105 transition-transform"
                />
                <p>All</p>
              </button>
              <button
                onClick={() => setCategory("sweet")}
                className={`flex flex-col items-center ${
                  category === "sweet" ? "text-green-700 font-bold" : ""
                }`}
              >
                <img
                  src="images/icon1.jpg"
                  alt="sweet"
                  className="w-16 h-16 rounded-full border border-gray-300 hover:scale-105 transition-transform"
                />
                <p>Sweet</p>
              </button>
              <button
                onClick={() => setCategory("savory")}
                className={`flex flex-col items-center ${
                  category === "savory" ? "text-green-700 font-bold" : ""
                }`}
              >
                <img
                  src="images/iconother.png"
                  alt="savory"
                  className="w-16 h-16 rounded-full border border-gray-300 hover:scale-105 transition-transform"
                />
                <p>Savory</p>
              </button>
              <button
                onClick={() => setCategory("other")}
                className={`flex flex-col items-center ${
                  category === "other" ? "text-green-700 font-bold" : ""
                }`}
              >
                <img
                  src="images/iconsavory.png"
                  alt="other"
                  className="w-16 h-16 rounded-full border border-gray-300 hover:scale-105 transition-transform"
                />
                <p>Other</p>
              </button>
            </div>

            {/* PRODUCT LIST  */}
            <div className="productlist grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 my-10">
              {filteredRecipes && filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <ProductCard
                    key={recipe._id}
                    recette={recipe}
                    onView={() => setSelectedRecipe(recipe)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No recipes found in this category 
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/*  RECIPE DETAILS  */}
          <div className="recipe-details-container">
            <div className="details-header">
              <button
                className="back-button"
                onClick={() => setSelectedRecipe(null)}
              >
                ← Back
              </button>
            </div>

            <div className="main-card">
              <div className="recipe-image">
                <img
                  src={selectedRecipe.imageUrl || "https://via.placeholder.com/400"}
                  alt={selectedRecipe.titre}
                />
              </div>

              <div className="recipe-summary">
                <h1>{selectedRecipe.titre}</h1>
                <p className="description">{selectedRecipe.description}</p>
                <p className="chef-info">
                  👨‍🍳 By {selectedRecipe.chefId?.name || "Chef"}
                </p>

                <div className="time-info-group">
                  <div className="time-box">
                    <span className="icon">⏱</span>
                    <p className="value">15min</p>
                    <p className="label">Preparation</p>
                  </div>
                  <div className="time-box">
                    <span className="icon">🔥</span>
                    <p className="value">0min</p>
                    <p className="label">Cooking</p>
                  </div>
                  <div className="time-box">
                    <span className="icon">👥</span>
                    <p className="value">2</p>
                    <p className="label">Servings</p>
                  </div>
                </div>

                <div className="total-time">Total time: 15 minutes</div>
              </div>
            </div>

            {/* INGREDIENTS, STEPS, MATERIALS  */}
            <div className="recipe-content-sections">
              <div className="ingredients-section">
                <h2>Ingredients</h2>
                <ul>
                  {selectedRecipe.ingredients?.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div className="steps-section">
                <h2>Steps</h2>
                <ol>
                  {selectedRecipe.steps?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="steps-section">
                <h2>Materials</h2>
                <ul>
                  {selectedRecipe.materiels?.map((mat, i) => (
                    <li key={i}>{mat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
