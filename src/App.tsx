import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Home from "./routes/home";
import ProtectedRoute from "./routes/protected-route";
import ListPage from "./routes/list-route";
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
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
