import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBooking: null,
  error: null,
  loading: false,
};

const bookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    BookingSuccess: (state, action) => {
      state.currentBooking = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
    BookingSuccess,
} = bookingSlice.actions;
export default bookingSlice.reducer;
