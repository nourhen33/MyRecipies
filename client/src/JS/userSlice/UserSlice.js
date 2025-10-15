import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

//  Register User
export const userRegister = createAsyncThunk("user/register", async (user, { rejectWithValue }) => {
    try {
        let response = await axios.post("http://localhost:4000/user/register", user);
        return response.data;
    } catch (error) {
        // Retournez le message d'erreur du serveur
        return rejectWithValue(error.response?.data?.msg || "Erreur d'inscription");
    }
});

//login 
export const userLogin = createAsyncThunk("user/login", async (user, { rejectWithValue }) => {
    try {
        let response = await axios.post("http://localhost:4000/user/login", user);
        return response.data;
    } catch (error) {
        // Retournez le message d'erreur du serveur
        return rejectWithValue(error.response?.data?.msg || "Erreur d'inscription");
    }
});
export const userCurrent = createAsyncThunk(
  "user/current",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/user/current", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
const initialState = {
  user:null,
  status:null,
  error:null
}
//  Redux Slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        clearError: (state) => {
            state.error = null;
            state.status = null;

        },
        logout:(state,action)=>{
            state.user=null;
            localStorage.removeItem("token");

        },
    },
 extraReducers: (builder) => {
    builder
      // User Registration
        .addCase(userRegister.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
        .addCase(userRegister.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user;
                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
                state.error = null;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.payload;
                state.user = null;
            })
    
        .addCase(userLogin.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
        .addCase(userLogin.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.user;
                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.payload;
                state.user = null;
            })
            .addCase(userCurrent.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
        .addCase(userCurrent.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload?.user;
            })
         .addCase(userCurrent.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.payload;
                state.user = null;
            });
}});
// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = userSlice .actions
export const { clearError, logout } = userSlice.actions;
export default userSlice .reducer;