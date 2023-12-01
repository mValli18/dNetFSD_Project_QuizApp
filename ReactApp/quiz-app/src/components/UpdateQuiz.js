import axios from "axios";
import { useState } from "react";

function UpdateQuiz() {
  const [quizId, setQuizId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState("60"); // Timer value in seconds

  const clickUpdate = () => {
    if (!quizId) {
      alert('Quiz ID is required for updating.');
      return;
    }

    const updatedQuiz = {
      quizId,
      title,
      description,
      category,
      timeLimit,
    };
    console.log(updatedQuiz);

            axios.put("http://localhost:5252/api/Quiz/update", updatedQuiz)
        .then(() => {
            alert('Quiz Updated');
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
      <label className="form-control" htmlFor="qtitle">Quiz Title</label>
      <input id="qtitle" type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label className="form-control" htmlFor="qdescr">Quiz Description</label>
      <input id="qdescr" type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label className="form-control" htmlFor="qcate">Quiz Category</label>
      <input id="qcate" type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />

      <label className="form-control" htmlFor="qtime">Quiz TimeLimit</label>
      <input id="qtime" type="number" className="form-control" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />

      <button onClick={clickUpdate} className="btn btn-primary">Update Quiz</button>
    </div>
  );
}

export default UpdateQuiz;