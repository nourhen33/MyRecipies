import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userCurrent } from "../JS/userSlice/UserSlice";
import { getAllRecipes, deleteRecipe } from "../JS/RecipeSlice";
import "./Profils.css";

const Profils = ({ ping, setPing }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { recipes } = useSelector((state) => state.recipe);

   
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  // Charger infos utilisateur + recettes
  useEffect(() => {
    dispatch(userCurrent());
    dispatch(getAllRecipes());
  }, [dispatch, ping]);

  useEffect(() => {
    if (user)
      setForm({
        name: user.name || "",
        lastname: user.lastname || "",
        email: user.email || "",
        password: "",
      });
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Profil sauvegardé:", form);
    setShowModal(false);
  };

  // Filtrer les recettes de l'utilisateur
 const myRecipes = recipes?.filter((r) => String(r.chefId) === String(user?._id)); 
 
  // Supprimer recette
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette recette ?")) {
      dispatch(deleteRecipe(id)).then(() => {
        if (setPing) setPing((prev) => !prev);
      });
    }
  };

  return (
    <div className="profile-container">
      {/* HEADER */}
      <div className="profile-header">
        <img src="/images/avater.png" alt="Avater" className="avatar" />
        <div className="user-info">
          <h2>{user?.name}</h2>
          <h2>{user?.lastname}</h2>
          <p>{user?.email}</p>
        </div>
        <button className="edit-btn" onClick={() => setShowModal(true)}>
          Edit Profil
        </button>
      </div>

      {/* MES RECETTES */}
      <section>
        <h3>🍽️ My Recipes</h3>
        {myRecipes.length > 0 ? (
          <ul className="recipe-list">
            {myRecipes.map((r) => (
              <li key={r._id} className="recipe-item">
                <div className="recipe-info">
                  <h4>{r.titre}</h4>
                  <p>{r.description?.slice(0, 70)}...</p>
                  <span
                    className={`status ${
                      r.isApproved ? "approved" : "pending"
                    }`}
                  >
                    {r.isApproved ? " Approved" : "⏳ Pending"}
                  </span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(r._id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes yet.</p>
        )}
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Personal Info</h3>
            <form onSubmit={handleSave}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Lastname:
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                New Password:
                <input
                  type="text"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                />
              </label>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profils;
