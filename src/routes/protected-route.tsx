import { useAppSelector } from "@/hooks/redux";
import { getAuth } from "@/redux/auth/slice";
import { FC } from "react";
import LandingPage from "./landing-page";
import { Outlet } from "react-router-dom";

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
