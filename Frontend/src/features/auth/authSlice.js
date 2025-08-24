import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to set the user state after a successful login
        loginUser: (state, action) => {
            state.user = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        // Action to clear the user state on logout
        logoutUser: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
        // Action to set the status to loading
        setAuthLoading: (state) => {
            state.status = 'loading';
        },
        // Action to handle and set an error message
        setAuthError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { loginUser, logoutUser, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;