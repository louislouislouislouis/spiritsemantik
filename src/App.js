//React necessities
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Custom Page
import Home from "./Pages/Home/Home";
import SearchResult from "./Pages/SearchResults/SearchResult";

// Styles
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search/:qid" element={<SearchResult />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
