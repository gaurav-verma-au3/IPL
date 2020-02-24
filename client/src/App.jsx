import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Teams from "./components/Teams";
import TeamDetail from "./components/TeamDetail";
import SeasonDetail from "./components/SeasonDetail";
import MatchDetails from "./components/MatchDetails";
import Stats from "./components/Stats";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="container-fluid mt-5">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/teams" component={Teams} />
          <Route path="/team/:team" component={TeamDetail} />
          <Route path="/season/:season" component={SeasonDetail} />
          <Route path="/match/:matchId" component={MatchDetails} />
          <Route path="/stats" component={Stats} />
        </div>
      </div>
    </Router>
  );
}

export default App;
