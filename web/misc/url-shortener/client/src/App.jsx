import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Redirect from "./Components/Redirect/Redirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:id" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
