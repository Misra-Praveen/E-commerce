import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const DashBoard = lazy(() => import("./pages/DashBoard.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

const appRouter = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "",
      element: (
        <Suspense fallback="Loading...">
          <Home />
        </Suspense>
      ),
    },
    {
      path: "dashbord",
      element: (
        <Suspense fallback="Loading...">
          <DashBoard />
        </Suspense>
      ),
    },
    {
      path: "login",
      element: (
        <Suspense fallback="Loading...">
          <Login />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback="Loading...">
          <Register />
        </Suspense>
      ),
    },
  ],
}]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>
);
