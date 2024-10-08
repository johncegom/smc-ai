import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Services from "./routes/Services";
import Profile from "./routes/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import FromScratch from "./routes/FromScratch";
import GetInspired from "./routes/GetInspired";
import SocialMedia from "./routes/SocialMedia";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Base layout
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "services",
            element: <Services />,
          },
          { path: "/services/from-scratch", element: <FromScratch /> },
          {
            path: "/services/from-scratch/:socialMedia",
            element: <SocialMedia />,
          },
          { path: "/services/get-inspired", element: <GetInspired /> },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
