//React necessities
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Custom Page
import Home from "./Pages/Home/Home";
import SearchResult from "./Pages/SearchResults/SearchResult";
import Wiki from "./Pages/Wiki/Wiki";
// Styles
import "./App.css";

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        <Route path="/:qid/:uid" element={<SearchResult />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
