import axios from "axios";
import { useState } from "react";

function UpdateQuestion() {
  const [questionId, setQuestionId] = useState("");
  const [questionTxt, setQuestionTxt] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [quizId, setQuizId] = useState("");

  const clickUpdate = () => {
    if (!quizId || !questionId) {
      alert('Quiz ID and Question ID are required for updating.');
      return;
    }
  
    const updatedQuestion = {
      questionId,
      questionTxt,
      option1,
      option2,
      option3,
      option4,
      answer,
      quizId,
    };
  
    axios.put(`http://localhost:5252/api/Questions/update`, updatedQuestion)
      .then(() => {
        alert('Question Updated');
      })
      .catch((e) => {
        console.log(e);
      });
  };  

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">UpdateQuestion</h1>
      <label className="form-control" htmlFor="questionId">Question ID</label>
      <input id="questionId" type="number" className="form-control" value={questionId} onChange={(e) => setQuestionId(e.target.value)} />

      <label className="form-control" htmlFor="qutxt">Question</label>
      <input id="qutxt" type="text" className="form-control" value={questionTxt} onChange={(e) => setQuestionTxt(e.target.value)} />

      <label className="form-control" htmlFor="quopt1">Option A</label>
      <input id="quopt1" type="text" className="form-control" value={option1} onChange={(e) => setOption1(e.target.value)} />

      <label className="form-control" htmlFor="quopt2">Option B</label>
      <input id="quopt2" type="text" className="form-control" value={option2} onChange={(e) => setOption2(e.target.value)} />

      <label className="form-control" htmlFor="quopt3">Option C</label>
      <input id="quopt3" type="text" className="form-control" value={option3} onChange={(e) => setOption3(e.target.value)} />

      <label className="form-control" htmlFor="quopt4">Option D</label>
      <input id="quopt4" type="text" className="form-control" value={option4} onChange={(e) => setOption4(e.target.value)} />

      <label className="form-control" htmlFor="quans">Answer</label>
      <input id="quans" type="text" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)} />

      <label className="form-control" htmlFor="qId">Quiz Id</label>
      <input id="qId" type="number" className="form-control" value={quizId} onChange={(e) => setQuizId(e.target.value)} />

      <button onClick={clickUpdate} className="btn btn-primary">Update Question</button>
    </div>
  );
}

export default UpdateQuestion;