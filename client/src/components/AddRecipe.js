import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../JS/RecipeSlice';
import './AddRecipe.css';

const AddRecipe = ({ setPing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.recipe);

  const [recipe, setRecipe] = useState({
    titre: '',
    description: '',
    imageUrl: '',
    ingredients: [''],
    steps: [''],
  });

  const handleChange = (e) => setRecipe({ ...recipe, [e.target.name]: e.target.value });

  const handleIngredientChange = (i, value) => {
    const ingredients = [...recipe.ingredients];
    ingredients[i] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  const removeIngredient = (i) =>
    setRecipe({ ...recipe, ingredients: recipe.ingredients.filter((_, index) => index !== i) });

  const handleStepChange = (i, value) => {
    const steps = [...recipe.steps];
    steps[i] = value;
    setRecipe({ ...recipe, steps });
  };

  const addStep = () => setRecipe({ ...recipe, steps: [...recipe.steps, ''] });
  const removeStep = (i) =>
    setRecipe({ ...recipe, steps: recipe.steps.filter((_, index) => index !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipe.titre || !recipe.description) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const result = await dispatch(addRecipe(recipe));

    if (addRecipe.fulfilled.match(result)) {
      alert('Recette ajoutée avec succès ');
      setPing((prev) => !prev);
      navigate('/home');
    } else {
      alert('Erreur lors de la création de la recette.');
    }
  };

  return (
    <div className="add-recipe-container">
      <h1 className="add-recipe-title">Ajouter une recette</h1>

      <form onSubmit={handleSubmit} className="add-recipe-form">
        <label>Title *</label>
        <input type="text" name="titre" value={recipe.titre} onChange={handleChange} required />

        <label>Description *</label>
        <textarea
          name="description"
          value={recipe.description}
          onChange={handleChange}
          rows="3"
          required
        />

        <label>Image (URL)</label>
        <input
          type="text"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          placeholder="https://exemple.com/monimage.jpg"
        />

        <div className="section">
          <h3>Ingrédients *</h3>
          {recipe.ingredients.map((ing, i) => (
            <div key={i} className="row">
              <input
                type="text"
                value={ing}
                onChange={(e) => handleIngredientChange(i, e.target.value)}
                placeholder={`Ingrédient ${i + 1}`}
              />
              {i > 0 && (
                <button type="button" className="delete-btn" onClick={() => removeIngredient(i)}>
                  ✖
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addIngredient}>
            + Add an ingredient
          </button>
        </div>

        <div className="section">
          <h3>Steps *</h3>
          {recipe.steps.map((step, i) => (
            <div key={i} className="row">
              <textarea
                value={step}
                onChange={(e) => handleStepChange(i, e.target.value)}
                placeholder={`Étape ${i + 1}`}
                rows="2"
              />
              {i > 0 && (
                <button type="button" className="delete-btn" onClick={() => removeStep(i)}>
                  ✖
                </button>
              )}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addStep}>
             Add a step
          </button>
        </div>

        <div className="buttons">
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {status === 'loading' ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>

        {error && <p className="error-text"> {error}</p>}
      </form>
    </div>
  );
};

export default AddRecipe;
