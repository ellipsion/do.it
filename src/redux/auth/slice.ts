import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/auth";
import { loginWithGoogleAsync } from "./thunk";
import { RootState } from "../store";


type AuthState = {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user
            if (action.payload.user) {
                state.isAuthenticated = true;
            }
        },
        setAuthLoading: (state, action) => {
            state.loading = action.payload.loading
        }
    },
    extraReducers(builder) {
        builder
        .addCase(loginWithGoogleAsync.pending, (state) => {
            state.loading = true
        })
        .addCase(loginWithGoogleAsync.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.isAuthenticated = true
            state.loading = false
        })
        .addCase(loginWithGoogleAsync.rejected, (state) => {
            state.user = null
            state.isAuthenticated = false
            state.loading = false
        })
    },
});

// selectors
export const  getAuth = (state: RootState) => state.auth

export const {setAuth, setAuthLoading} = authSlice.actions;

export default authSlice.reducer;