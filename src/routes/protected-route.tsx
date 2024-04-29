import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAuth, setAuth } from "@/redux/auth/slice";
import { FC, useEffect } from "react";
import LandingPage from "./landing-page";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/auth.config";
import Spinner from "@/components/loaders/spinner";

interface ProtectedRouteProps {}

const ProtectedRoute: FC<ProtectedRouteProps> = ({}) => {
  const { user, isAuthenticated, loading } = useAppSelector(getAuth);

  if (loading) {
    return <Spinner />;
  }

  if (!user && !isAuthenticated && !loading) {
    return <LandingPage />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
