// src/features/registrationFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state of the registration form
const initialState = {
  username: "",
  email: "",
  password: "",
};

// Create slice
const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    resetRegistrationForm: () => initialState,
  },
});

// Export actions
export const {
  updateUsername,
  updateEmail,
  updatePassword,
  resetRegistrationForm,
} = registrationFormSlice.actions;

// Export reducer
export default registrationFormSlice.reducer;
