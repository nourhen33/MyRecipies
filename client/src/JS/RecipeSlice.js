import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Récupérer toutes les recettes
export const getAllRecipes = createAsyncThunk("recipe/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:4000/recette", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return response.data.recette;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Erreur lors du chargement des recettes");
  }
});

//  Ajouter une recette
export const addRecipe = createAsyncThunk("recipe/add", async (recipe, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:4000/recette/add", recipe, {
      headers: { Authorization: token },
    });
    return response.data.recette;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Erreur lors de l'ajout de la recette");
  }
});

//  Supprimer une recette
export const deleteRecipe = createAsyncThunk("recipe/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:4000/recette/${id}`,{headers: { Authorization: localStorage.getItem("token") },});
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Erreur lors de la suppression");
  }
});

// Mettre à jour une recette
export const updateRecipe = createAsyncThunk("recipe/update", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:4000/recette/${id}`, updatedData);
    return response.data.recette;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Erreur lors de la mise à jour");
  }
});

// Ajouter un commentaire
export const addComment = createAsyncThunk("recipe/comment", async ({ id, text }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:4000/recette/${id}/comment`,
      { text },
      { headers: { Authorization: token } }
    );
    return response.data.recipe; // recette mise à jour
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || "Erreur lors de l'ajout du commentaire");
  }
});

// Approuver une recette (Admin uniquement)
export const approveRecipe = createAsyncThunk(
  "recipe/approve",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:4000/recette/approve/${id}`,
        {},
        { headers: { Authorization: token } }
      );
      return response.data.recette;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Erreur lors de l’approbation"
      );
    }
  }
);
// State initial
const initialState = {
  recipes: [],
   favorites: [],
  status: null,
  error: null,
};

//  Slice
const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: { addFavorite: (state, action) => {
      const recipe = action.payload;
      if (!state.favorites.some((fav) => fav._id === recipe._id)) {
        state.favorites.push(recipe);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      //  Get All 
      .addCase(getAllRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.status = "success";
        state.recipes = action.payload;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //  Add Recipe 
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })

      // Delete Recipe 
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r._id !== action.payload);
      })

      //  Update Recipe 
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })

      // Add Comment 
      .addCase(addComment.fulfilled, (state, action) => {
        state.recipes = state.recipes.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })
      //  Approve Recipe
        .addCase(approveRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.map((r) =>
         r._id === action.payload._id ? action.payload : r
    );
  })

  },
});
export const { addFavorite, removeFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
