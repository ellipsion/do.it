import { logOut, signInwithGoogle } from "@/firebase/auth.config";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const loginWithGoogleAsync = createAsyncThunk("auth/loginAsync",async (_) => {
    const response = await signInwithGoogle()
    const {uid, displayName, email, emailVerified, photoURL} = response.user
    return {user: {uid, displayName, email, emailVerified, photoURL}}
});

export const logoutAsync = createAsyncThunk("auth/logoutAsync", async () => {
    await logOut();
});