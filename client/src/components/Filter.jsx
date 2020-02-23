import React, { useState, useEffect } from "react";
import { getLocations, getTeams, applyFilters } from "./logic/filterLogic";

const Filter = props => {
  const { data } = props;
  const cities = getLocations(data);
  const teams = getTeams(data);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleCityChange = e => {
    const selected = e.target.value === "All" ? null : e.target.value;
    setSelectedCity(selected);
  };

  const handleTeamChange = e => {
    setSelectedTeam(e.target.value);
  };

  useEffect(() => {
    if (selectedCity || selectedTeam) {
      const filtered = applyFilters(data, selectedCity, selectedTeam);
      props.setFiltered(filtered);
    }
  }, [selectedCity, selectedTeam]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 d-flex align-items-center justify-content-center">
          <h5 className="m-0">Filters</h5>
        </div>
        <div className="col-4">
          <div class="form-group ">
            <label className="">By Location: </label>
            <select class="form-control" onChange={e => handleCityChange(e)}>
              <option selected>All</option>
              {cities.map((city, index) => {
                return <option key={index + 2489}>{city}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div class="form-group">
            <label className="">By Team: </label>
            <select class="form-control" onChange={e => handleTeamChange(e)}>
              <option value={null} selected>
                All
              </option>
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
