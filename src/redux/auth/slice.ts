import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/auth";
import { loginWithGoogleAsync } from "./thunk";


type AuthState = {
    user: User | null,
    loading: boolean
};

const initialState: AuthState = {
    user: null,
    loading: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload.user
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
            state.loading = false
        })
        .addCase(loginWithGoogleAsync.rejected, (state) => {
            state.user = null
            state.loading = false
        })
    },
});

export const {setAuth, setAuthLoading} = authSlice.actions;

export default authSlice.reducer;