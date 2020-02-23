import React, { useState, useEffect } from "react";
import { getLocations, getTeams, applyFilters } from "./logic/filterLogic";

const Filter = ({ data, setFiltered }) => {
  const cities = getLocations(data);
  const teams = getTeams(data);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");

  const handleCityChange = e => {
    // const selected = e.target.value === "All" ? null : e.target.value;
    setSelectedCity(e.target.value);
  };

  const handleTeamChange = e => {
    setSelectedTeam(e.target.value);
  };

  useEffect(() => {
    if (data) {
      const filtered = applyFilters(data, selectedCity, selectedTeam);
      setFiltered(filtered);
    }
  }, [selectedCity, selectedTeam, data, setFiltered]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 d-flex align-items-center justify-content-center">
          <h5 className="m-0">Filters</h5>
        </div>
        <div className="col-4">
          <div className="form-group ">
            <label className="">By Location: </label>
            <select
              className="form-control"
              onChange={e => handleCityChange(e)}
              defaultValue="All"
            >
              <option>All</option>
              {cities.map((city, index) => {
                return <option key={index + 2489}>{city}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <label className="">By Team: </label>
            <select
              className="form-control"
              onChange={e => handleTeamChange(e)}
              defaultValue="All"
            >
              <option>All</option>
              {teams.map((team, index) => {
                return <option key={index + 8326}>{team}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
