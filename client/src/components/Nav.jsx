import React, { useState, useRef } from "react";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./css/Nav.css";
import Search from "./Search";
import SearchResults from "./SearchResults";
import { animationHide, animationShow } from "./logic/dropdownLogic";

const Nav = props => {
  const [searchResults, setSearchResults] = useState(null);
  const [visibility, setVisibility] = useState(true);

  const ref = useRef("aboutDropdown");
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
              <li className="nav-item dropdown nav-list-item">                <h6
                  class="dropdown-toggle m-0 text-secondary"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseOver={e => animationShow(ref.current)}
                  onMouseLeave={e => animationHide(ref.current)}
                >
                  About
                </h6>
                <div
                  class="dropdown-menu p-3"
                  ref={ref}
                  onMouseOver={e => animationShow(ref.current)}
                  onMouseLeave={e => animationHide(ref.current)}
                >
                  <p class="font-weight-bold dropdown-item text-center">
                    Designer & Developer
                    <a
                      target="blank"
                      class="dropdown-item text-primary"
                      href="https://gaurav-verma-au3.github.io/"
                    >
                      <FaLink className="mr-1" /> Gaurav Verma
                    </a>
                  </p>
                </div>
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
