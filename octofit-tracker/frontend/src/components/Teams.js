import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  // Get all unique keys for table headers
  const allKeys = Array.from(
    teams.reduce((keys, item) => {
      Object.keys(item).forEach((k) => keys.add(k));
      return keys;
    }, new Set())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Teams</h2>
        <button className="btn btn-success">Create Team</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              {allKeys.map((key) => (
                <th key={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                {allKeys.map((key) => (
                  <td key={key}>{team[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {teams.length === 0 && (
          <div className="alert alert-info text-center">No teams found.</div>
        )}
      </div>
    </div>
  );
};

export default Teams;
