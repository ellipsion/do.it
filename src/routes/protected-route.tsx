import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAuth, setAuth } from "@/redux/auth/slice";
import { FC, useEffect } from "react";
import LandingPage from "./landing-page";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/auth.config";

interface ProtectedRouteProps {}

const ProtectedRoute: FC<ProtectedRouteProps> = ({}) => {
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector(getAuth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, emailVerified, photoURL } = user;
        dispatch(
          setAuth({
            user: { uid, displayName, email, emailVerified, photoURL },
          })
        );
      } else {
        dispatch(setAuth({ user: null }));
      }
    });
  }, []);

  if (!user && !isAuthenticated) {
    return <LandingPage />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
