import React, { useState, useEffect } from "react";
import GridWrapper from "./GridWrapper";
import { API_ORIGIN } from "../config";

const Teams = () => {
  const [teams, setTeams] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_ORIGIN}/teams`)
      .then(response => response.json())
      .then(data => {
        setTeams(data);
      })
      .catch(error => setError("Failed to fetch data"));
  }, []);

  return <GridWrapper arr={teams} purpose="team" error={error} />;
};

export default Teams;
