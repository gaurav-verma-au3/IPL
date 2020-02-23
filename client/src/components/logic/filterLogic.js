export const getLocations = arr => {
  if (arr) {
    let cities = arr.map(val => {
      return val.city;
    });
    cities = [...new Set(cities)];
    return cities;
  }
  return [];
};

export const getTeams = arr => {
  if (arr) {
    let teams = arr.map(match => {
      return match.team1 && match.team2;
    });
    teams = [...new Set(teams)];
    return teams;
  }
  return [];
};

export const applyFilters = (arr, city, team) => {
  let filtered = [];
  let len = arr.length;
  let cityFiltered = [],
    teamFiltered = [];

  if (city) {
    for (let i = 0; i < len; i++)
      if (arr[i].city === city) cityFiltered.push(arr[i]);
  } else if (team) {
    for (let i = 0; i < len; i++)
      if (arr[i].team1 === team || arr[i].team2 === team)
        teamFiltered.push(arr[i]);
  }

  let all = cityFiltered.concat(teamFiltered);
  if (city && team) {
    let allLen = all.length;
    for (let i = 0; i < allLen; i++) {
      if (
        all[i].city === city &&
        (all[i].team1 === team || all[i].team2 === team)
      )
        filtered.push(all[i]);
    }
  }
  return filtered.length > 0
    ? filtered
    : cityFiltered.length > 0
    ? cityFiltered
    : teamFiltered.length > 0
    ? teamFiltered
    : arr;
};
