import axios from "axios";
import { useState } from "react";

function DeleteQuiz() {
  const [quizId, setQuizId] = useState("");

  const clickDelete = () => {
    if (!quizId) {
      alert('Quiz ID is required for deleting.');
      return;
    }

    console.log("quiz with QuizId "+quizId+" is deleted successfully");

        axios.delete(`http://localhost:5252/api/Quiz/${quizId}`)
        .then(() => {
            alert('Quiz Deleted');
        })
        .catch((e) => {
            console.log(e);
        });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">UpdateQuiz</h1>
      <label className="form-control" htmlFor="quizId">Quiz ID</label>
      <input id="quizId" type="text" className="form-control" value={quizId} onChange={(e) => setQuizId(e.target.value)} />
      <button onClick={clickDelete} className="btn btn-danger button">Delete Quiz</button>
    </div>
  );
}

export default DeleteQuiz;