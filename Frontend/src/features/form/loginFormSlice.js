import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
};

const loginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        updateEmail: (state, action) => { state.email = action.payload; },
        updatePassword: (state, action) => { state.password = action.payload; },
        resetLoginForm: (state) => initialState,
    },
});

export const { updateEmail, updatePassword, resetLoginForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;