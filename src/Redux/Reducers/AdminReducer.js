import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    adminSigninSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },

    adminLogout: (state) => {
      state.loading = null;
      state.error = null;
      state.currentAdmin = null;
    },
  },
});

export const {
    adminSigninSuccess,
    adminLogout,
} = userSlice.actions;
export default userSlice.reducer;
