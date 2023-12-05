/*import React, { useState } from "react";

function Leaderboard() {
  const [quizId, setQuizId] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);

  const fetchLeaderboard = () => {
    // Make sure quizId is provided
    if (quizId) {
      // Fetch leaderboard based on quizId
      fetch(`http://localhost:5252/api/Quiz/leaderboard/${quizId}`)
        .then(async (response) => {
          const data = await response.json();
          setLeaderboard(data);
        })
        .catch((error) => console.error("Error fetching leaderboard:", error));
    } else {
      alert("Please provide a quizId");
    }
  };

  return (
    <div className="inputcontainer">
      <label className="form-control" htmlFor="quizId">
        Quiz ID
      </label>
      <input
        id="quizId"
        type="text"
        className="form-control"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
      />

      <button onClick={fetchLeaderboard} className="btn btn-primary">
        Get Leaderboard
      </button>

      {leaderboard && (
        <div>
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={index}>
                <p>
                  Username: {entry.username}, Score: {entry.score}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;*/
import React, { useState } from "react";
import { Button, TextField, Typography, List, ListItem, ListItemText, Container } from "@mui/material";
import { GetApp } from "@mui/icons-material";
import "./Leaderboard.css";

function Leaderboard() {
  const [quizId, setQuizId] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);

  const fetchLeaderboard = () => {
    // Make sure quizId is provided
    if (quizId) {
      // Fetch leaderboard based on quizId
      fetch(`http://localhost:5252/api/Quiz/leaderboard/${quizId}`)
        .then(async (response) => {
          const data = await response.json();
          setLeaderboard(data);
        })
        .catch((error) => console.error("Error fetching leaderboard:", error));
    } else {
      alert("Please provide a quizId");
    }
  };

  return (
    <Container className="leaderboard-container">
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>

      <TextField
        label="Quiz ID"
        variant="outlined"
        fullWidth
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<GetApp />}
        onClick={fetchLeaderboard}
        style={{ marginBottom: 16 }}
      >
        Get Leaderboard
      </Button>

      {leaderboard && (
        <div className="leaderboard-results">
          <Typography variant="h5" style={{ marginBottom: 16 }}>
            Results
          </Typography>

          <List>
            {leaderboard.map((entry, index) => (
              <ListItem key={index} className="leaderboard-item">
                <ListItemText primary={entry.username} secondary={`Score: ${entry.score}`} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
}

export default Leaderboard;

