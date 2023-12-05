import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

function QuizResults() {
  const location = useLocation();
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    // Use the username and quizId from the location state
    const { username, quizId } = location.state;

    // Fetch quiz results based on username and quizId
    fetch(`http://localhost:5252/api/QuizResult/results-with-total-score/${username}/${quizId}`)
      .then(async (response) => {
        const data = await response.json();
        setQuizResults(data);
      })
      .catch((error) => console.error("Error fetching quiz results:", error));
  }, [location.state]);

  return (
    <div className="inputcontainer">
      {quizResults && (
        <div>
          <h2>Quiz Results</h2>
          <p>Total Score: {quizResults.totalScore}</p>

          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Answer</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizResults.quizResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.userAnswer}</TableCell>
                    <TableCell>{result.isCorrect ? "Correct" : "Incorrect"}</TableCell>
                    <TableCell>{result.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default QuizResults;
