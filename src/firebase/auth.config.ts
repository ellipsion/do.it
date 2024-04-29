import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {app} from "./app.config";

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInwithGoogle = async () => {
    const response = await signInWithPopup(auth, googleProvider)
    return response;
}
const logOut = async () => {
    await signOut(auth);
}

export {signInwithGoogle, logOut};