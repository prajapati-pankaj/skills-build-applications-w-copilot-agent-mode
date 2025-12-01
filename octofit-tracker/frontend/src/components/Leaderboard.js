import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  // Get all unique keys for table headers
  const allKeys = Array.from(
    leaderboard.reduce((keys, item) => {
      Object.keys(item).forEach((k) => keys.add(k));
      return keys;
    }, new Set())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Leaderboard</h2>
        <button className="btn btn-primary">Refresh</button>
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
            {leaderboard.map((entry, idx) => (
              <tr key={entry.id || idx}>
                {allKeys.map((key) => (
                  <td key={key}>{entry[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {leaderboard.length === 0 && (
          <div className="alert alert-info text-center">No leaderboard data found.</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
