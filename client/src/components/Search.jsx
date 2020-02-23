import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { FaSpinner } from "react-icons/fa";
import { API_ORIGIN } from "../config";
const Search = ({ setSearchResults, setVisibility }) => {
  const [searchTarget, setSearchTarget] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [seasons, setSeasons] = useState(null);
  const handleChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = () => {
    setStatus("searching");
    setVisibility(true);
    setSearchResults(null);
    let url = `${API_ORIGIN}/search/${searchTarget}/${searchQuery}`;

    fetch(url)
      .then(result => result.json())
      .then(data => {
        setSearchResults(data);
        setStatus("");
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch(`${API_ORIGIN}/seasons`)
      .then(response => response.json())
      .then(data => {
        setSeasons(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div class="input-group bg-secondary rounded-0">
        <div class="input-group-prepend">
          <div class="form-group rounded-0 m-0">
            <select
              class="form-control bg-dark text-light rounded-0 border-0"
              onChange={e => {
                setSearchTarget(e.target.value);
              }}
            >
              <option selected>All</option>
              {seasons
                ? seasons.map((season, index) => {
                    return <option key={index + 576}>{season}</option>;
                  })
                : null}
            </select>
          </div>
        </div>
        <div class="input-group-prepend">
          <input
            type="text"
            class="form-control bg-secondary border-0  rounded-0 text-light"
            onChange={e => {
              handleChange(e);
            }}
          />
        </div>

        <span
          class="input-group-text bg-secondary text-light border-0"
          id="basic-addon1"
        >
          {status === "searching" ? (
            <FaSpinner />
          ) : (
            <GoSearch onClick={e => handleSearch(e)} />
          )}
        </span>
      </div>
    </>
  );
};

export default Search;
