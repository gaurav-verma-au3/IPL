import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Nav.css";
import Search from "./Search";
import SearchResults from "./SearchResults";
const Nav = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [visibility, setVisibility] = useState(true);

  return (
    <>
      <div id="nav" className="container-fluid">
        <div className="row w-100">
          <div className="col-md-6 col-sm-12 d-flex  align-items-center my-3">
            <ul className="nav-list">
              <li className="nav-list-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-list-item">
                <Link to="/teams">Teams</Link>
              </li>
              <li className="nav-list-item">
                <Link to="/players">Players</Link>
              </li>
              <li className="nav-list-item">
                <Link to="/stats">Stats</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-sm-12 my-3">
            <ul className="nav-list">
              <li className="nav-list-item">
                <Search
                  setVisibility={setVisibility}
                  setSearchResults={setSearchResults}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {visibility && searchResults ? (
        <SearchResults results={searchResults} setVisibility={setVisibility} />
      ) : null}
    </>
  );
};

export default Nav;
