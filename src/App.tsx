import { FC } from "react";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

// error message: There was an unknown error while processing the request.

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        {" "}
        <h1>Home</h1>
        <Link to={"/test"}>test</Link>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: <h3>Outlet test</h3>,
      },
      {
        path: "test",
        element: (
          <>
            <Link to={"/"}>home</Link> <h3>Link test</h3>
          </>
        ),
      },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
