//React necessities
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Switch>
        <Route path="/:qid/:uid">
          <SearchResult />
          <div className="dede">dezfer</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
