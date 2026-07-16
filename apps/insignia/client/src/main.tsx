import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Home, Sign, Login, Profile } from "./pages";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ProtectedLayout } from "./layouts";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const router = createBrowserRouter([
  {
    path: "/sign",
    element: <Sign />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <ApolloProvider client={client}>
        <Toaster />
        <RouterProvider router={router} />
      </ApolloProvider>
    </Theme>
  </React.StrictMode>
);
