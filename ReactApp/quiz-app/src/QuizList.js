import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./components/Quiz.css";
function QuizList() {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizs();
  }, []); 

  const getQuizs = () => {
    fetch('http://localhost:5252/api/Quiz', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        setQuizList(myData);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const handleDeleteQuiz = async (quizId) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm(
      `Do you really want to delete the quiz with ID ${quizId}?`
    );

    // If user confirms, proceed with deletion
    if (userConfirmed) {
      // Navigate to the DeleteQuiz component with quizId in the state
      navigate("/deleteQuiz", { state: { quizId } });
    }
  };

  const handleUpdateQuiz = (quiz) => {
    navigate("/updateQuiz", { state: quiz });
  };
  const handleAddQuiz=()=>
  {
    navigate("/addQuiz");
  }
  return (
    <div className="quiz">
      <h1 className="alert alert-success">Quizs</h1>
        <button 
            className="btn btn-primary"
            onClick={()=>handleAddQuiz()}>
            AddQuiz
        </button>
      <hr />
      {quizList.length > 0 ? (
        <div>
          {quizList.map((quiz) => (
            <div key={quiz.quizId} className="alert alert-success">
              Quiz Id: {quiz.quizId}
              <br />
              Quiz Title: {quiz.title}
              <br />
              Quiz Description: {quiz.description}
              <br />
              Quiz Category: {quiz.category}
              <br />
              Quiz TimeLimit: {quiz.timeLimit}
              <br />
              <button
                className="btn btn-delete"
                onClick={() => handleDeleteQuiz(quiz.quizId)}
              >
                Delete
              </button>
              <button 
                className="btn btn-update"
                onClick={()=>handleUpdateQuiz(quiz)}
                >
                    Update
                </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No quizzes available yet</div>
      )}
    </div>
  );
}
export default QuizList;