import React from "react";
import Gallery from "./components/Gallery/Gallery";
import NavBar from "./components/NavBar/NavBar";
import Cards from "./components/Cards/Cards";
import Footer from "./components/Footer/Footer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import "./App.css";
import Events from "./pages/Events";
import EventInfo from "./pages/EventInfo";

const App = () => {
  const Layout = () => {
    return (
      <div className="app">
        <NavBar />
        <div style={{minHeight: "90vh"}}>
        <Outlet />
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/home", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/team", element: <Team /> },
        { path: "/events", element: <Events /> },
        { path: "/events/:id", element: <EventInfo /> },
        { path: "*", element: <Home /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
};

export default App;
