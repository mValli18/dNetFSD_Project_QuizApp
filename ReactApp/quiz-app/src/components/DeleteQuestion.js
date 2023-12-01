import axios from "axios";
import { useState } from "react";

function DeleteQuestion() {
  const[questionId,setQuestionId]=useState(0)

  const clickDelete = () => {
    if (!questionId) {
      alert('QuestionId is required for deleting.');
      return;
    }

    console.log("quiz with QuestionId "+questionId+" is deleted successfully");

        axios.delete(`http://localhost:5252/api/Questions/Remove?questionid=${questionId}`)
        .then(() => {
            alert('Question Deleted');
        })
        .catch((e) => {
            console.log(e);
        });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">DeleteQuestion</h1>
      <label className="form-control" htmlFor="questionId">Question ID</label>
      <input id="questionId" type="text" className="form-control" value={questionId} onChange={(e) => setQuestionId(e.target.value)} />
      <button onClick={clickDelete} className="btn btn-danger button">Delete Question</button>

    </div>
  );
}

export default DeleteQuestion;