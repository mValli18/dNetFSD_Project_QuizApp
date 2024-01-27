import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, List, ListItem, ListItemText, Container, Paper, Grid } from "@mui/material";
import { GetApp } from "@mui/icons-material";
import "./Leaderboard.css";

function Leaderboard() {
  const [quizId, setQuizId] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);
  const [titleList, setTitleList] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const token = localStorage.getItem("token");

  const fetchLeaderboard = (quizId) => {
    // Make sure quizId is provided
    if (quizId) {
      // Get the token from local storage

      // Fetch leaderboard based on quizId with the authorization header
      fetch(`http://localhost:5252/api/Quiz/leaderboard/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (response) => {
          if (response.status === 404) {
            // Handle 404 separately
            setLeaderboard(null); // Clear previous records
            alert(`No leaderboard records available for ${quizId}`);
          } else {
            const data = await response.json();
            setLeaderboard(data);
          }
        })
        .catch((error) => console.error("Error fetching leaderboard:", error));
    } else {
      alert("Please provide a quizId");
    }
  };

  useEffect(() => {
    // Fetch the list of categories when the component mounts
    fetch("http://localhost:5252/api/Quiz/titles", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (data) => {
        const titles = await data.json();
        setTitleList(titles);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleTitleChange = (e) => {
    // Update the categoryInput state when the dropdown selection changes
    setTitleInput(e.target.value);
  };

  const searchResult = async () => {
    try {
      // Fetch the quizId based on the selected title
      const response = await fetch(`http://localhost:5252/api/Quiz/quizId?title=${titleInput}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response);

      if (response.ok) {
        const selectedQuizId = await response.text();

        // Log the selectedQuizId
        console.log("Selected QuizId:", selectedQuizId);

        // Log a message before calling fetchLeaderboard
        console.log("Fetching leaderboard...");

        // Ensure that the selectedQuizId is an integer
        const parsedQuizId = parseInt(selectedQuizId, 10);

        if (!isNaN(parsedQuizId)) {
          // Pass the parsedQuizId to fetchLeaderboard
          fetchLeaderboard(parsedQuizId);
        } else {
          console.log("Invalid quizId format");
          alert("Invalid quizId format");
        }
      } else {
        console.log("Failed to fetch quizId for the selected title");
        alert("Failed to fetch quizId for the selected title");
      }
    } catch (error) {
      console.error("Error fetching quizId:", error);
    }
  };

  const highlightStyle = (position) => {
    switch (position) {
      case 1:
        return { backgroundColor: "#ffd700", fontWeight: "bold" }; // Gold for the first place
      case 2:
        return { backgroundColor: "#c0c0c0", fontWeight: "bold" }; // Silver for the second place
      case 3:
        return { backgroundColor: "#cd7f32", fontWeight: "bold" }; // Bronze for the third place
      default:
        return {};
    }
  };

  return (
    <div className="inputcontainer">
     
      <h2 className="alert alert-quiz">Leaderboard</h2>
      <div className="d-flex align-items-center flex">
        <select
          className="form-select"
          value={titleInput}
          onChange={handleTitleChange}
        >
          <option value="">Select a title</option>
          {titleList.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
        <button
          className="btn btn-success"
          style={{ maxWidth: "45%", marginBottom: "15px" }}
          onClick={searchResult}
        >
          Search
        </button>
      </div>

      <hr />

      {leaderboard !== null && (
        <div>
          {leaderboard.length > 0 ? (
            <div>
              <Grid container spacing={2}>
                {leaderboard.slice(0, 3).map((entry, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={3}
                      style={{
                        ...highlightStyle(index + 1),
                        padding: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Fixed width for username */}
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="h6" color="primary">
                          {entry.username}
                        </Typography>
                      </div>
                      {/* Fixed width for score */}
                      <div style={{ flex: 1, minWidth: 80 }}>
                        <Typography variant="body1">
                          Score: {entry.score}
                        </Typography>
                      </div>
                      <div style={{ flex: 1, minWidth: 80 }}>
                        <Typography variant="body1">
                          Rank: {index + 1}
                        </Typography>
                      </div>
                    </Paper>
                  </Grid>
                ))}

                {leaderboard.slice(3).map((entry, index) => (
                  <Grid item xs={12} key={index + 3}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <Typography variant="h6" color="primary">
                          {entry.username}
                        </Typography>
                      </div>
                      <div style={{ flex: 1, minWidth: 80 }}>
                        <Typography variant="body1">
                          Score: {entry.score}
                        </Typography>
                      </div>
                      <div style={{ flex: 1, minWidth: 80 }}>
                        <Typography variant="body1">
                          Rank: {index + 4}
                        </Typography>
                      </div>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <p>No leaderboard records for this quiz.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Leaderboard;