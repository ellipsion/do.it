import { FC, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Home from "./routes/home";
import ProtectedRoute from "./routes/protected-route";
import ListPage from "./routes/list-route";
import LandingPage from "./routes/landing-page";
import ErrorPage from "./components/custom/error/error-page";
import useCheckConnection from "./hooks/useCheckConnection";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/auth.config";
import { setAuth } from "./redux/auth/slice";
import { useAppDispatch } from "./hooks/redux";

// error message: There was an unknown error while processing the request.

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <Home />,
              },
              {
                path: "lists/:slug",
                element: <ListPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LandingPage />,
  },
]);

const App: FC = () => {
  const dispatch = useAppDispatch();
  useCheckConnection();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, emailVerified, photoURL } = user;
        dispatch(
          setAuth({
            user: { uid, displayName, email, emailVerified, photoURL },
            loading: false,
          })
        );
      } else {
        dispatch(setAuth({ user: null, loading: false }));
      }
    });
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
