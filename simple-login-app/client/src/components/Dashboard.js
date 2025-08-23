import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [opinion, setOpinion] = useState('');
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/opinion', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOpinions(res.data);
      } catch (err) {
        console.error('Failed to fetch opinions');
      }
    };
    fetchOpinions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/opinion',
        { text: opinion },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setOpinion('');
      const res = await axios.get('http://localhost:5000/api/opinion', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOpinions(res.data);
    } catch (err) {
      alert('Failed to submit opinion');
    }
  };

  return (
    <div>
      <h2>Welcome! Submit your opinion:</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your opinion"
          value={opinion}
          onChange={(e) => setOpinion(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h3>All Responses:</h3>
      <ul>
        {opinions.map((op, idx) => (
          <li key={idx}>
            <strong>{op.username}:</strong> {op.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
