import React, { useState, useEffect } from "react";
import { API_ORIGIN } from "../config";
import GridWrapper from "./GridWrapper";
const HomePage = () => {
  const [seasons, setSeasons] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${API_ORIGIN}/seasons`)
      .then(response => response.json())
      .then(data => {
        setSeasons(data);
      })
      .catch(error => setError("Failed to fetch data"));
  }, []);
  return <GridWrapper arr={seasons} purpose="season" error={error} />;
};

export default HomePage;
