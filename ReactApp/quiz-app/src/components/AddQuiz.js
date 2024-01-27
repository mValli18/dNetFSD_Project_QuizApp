import { useState } from "react";

function AddQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState("60"); // Timer value in seconds
  const token=localStorage.getItem("token");
  const clickAdd = () => {
    // Check if required fields are provided
    if (!title || !description || !category) {
      alert("Title, Description, and Category are required fields.");
      return;
    }

    const quiz = {
      title: title,
      description: description,
      category: category,
      timeLimit: timeLimit || null, // Set to null if timeLimit is empty
    };

    console.log(quiz);

    fetch("http://localhost:5057/api/Quiz", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quiz),
    })
      .then(() => {
        alert("Quiz Added");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-quiz">Quiz Details</h1>
      <label className="form-control" htmlFor="qtitle">
        Quiz Title
      </label>
      <input
        id="qtitle"
        type="text"
        className="form-control"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label className="form-control" htmlFor="qdescr">
        Quiz Description
      </label>
      <input
        id="qdescr"
        type="text"
        className="form-control"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label className="form-control" htmlFor="qcate">
        Quiz Category
      </label>
      <input
        id="qcate"
        type="text"
        className="form-control"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <label className="form-control" htmlFor="qtime">
        Quiz TimeLimit
      </label>
      <input
        id="qtime"
        type="number"
        className="form-control"
        value={timeLimit}
        placeholder="Please provide integer value in minutes."
        onChange={(e) => {
          setTimeLimit(e.target.value);
        }}
      />
      <button onClick={clickAdd} className="btn btn-primary">
        Add Quiz
      </button>
    </div>
  );
}

export default AddQuiz;