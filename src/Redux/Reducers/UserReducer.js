import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = null;
      state.error = null;
      state.currentUser = null;
    },
    editAvatar: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        image: action.payload,
      };
    },
    updateUser:(state,action)=>{
        state.currentUser={
            ...state.currentUser,
            name:action.payload.name,
            email:action.payload.email,
            mobilenumber:action.payload.mobilenumber
        }
    }
  },
});

export const { signInStart, signinSuccess, signInFailure, logout, editAvatar,updateUser } =
  userSlice.actions;
export default userSlice.reducer;
