import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "../features/form/loginFormSlice";
import registrationFormReducer from "../features/form/registrationFormSlice";
import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/blog/blogSlice";

export const store = configureStore({
    reducer: {
        loginForm: loginFormReducer,
        registrationForm: registrationFormReducer,
        auth: authReducer,
        blog: blogReducer,
    },
});
