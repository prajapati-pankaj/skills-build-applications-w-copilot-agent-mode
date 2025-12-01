import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  // Get all unique keys for table headers
  const allKeys = Array.from(
    users.reduce((keys, item) => {
      Object.keys(item).forEach((k) => keys.add(k));
      return keys;
    }, new Set())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Users</h2>
        <button className="btn btn-primary">Add User</button>
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
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                {allKeys.map((key) => (
                  <td key={key}>{user[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="alert alert-info text-center">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default Users;
