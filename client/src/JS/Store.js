
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice/UserSlice'  
import recipeReducer from "./RecipeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, 
    recipe: recipeReducer, 
  },
})