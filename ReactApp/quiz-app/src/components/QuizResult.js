// QuizResults.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function QuizResults() {
  const location = useLocation();
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    // Use the username and quizId from the location state
    const { username, quizId } = location.state;

    // Fetch quiz results based on username and quizId
    fetch(`http://localhost:5057/api/QuizResult/results-with-total-score/${username}/${quizId}`)
      .then(async (response) => {
        const data = await response.json();
        setQuizResults(data);
      })
      .catch((error) => console.error("Error fetching quiz results:", error));
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div className="inputcontainer">
      {quizResults && (
        <div>
          <h2>Quiz Results</h2>
          <p>Total Score: {quizResults.totalScore}</p>
          <ul>
            {quizResults.quizResults.map((result, index) => (
              <li key={index}>
                <p>
                  Question ID: {result.questionId}, User Answer: {result.userAnswer},{" "}
                  {result.isCorrect ? "Correct" : "Incorrect"}, Score: {result.score}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuizResults;