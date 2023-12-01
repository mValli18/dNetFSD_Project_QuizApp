import { useNavigate } from "react-router-dom";
import { useState } from "react";
function QuizsByCategory() {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizList, setQuizList] = useState([]);
  const [categoryInput, setCategoryInput] = useState(""); // State to store the input value
  const navigate = useNavigate();
  const getQuizs = () => {
    // Use the categoryInput in the fetch URL
    fetch(`http://localhost:5252/api/Quiz/category/${categoryInput}`, {
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
  };

  const handleCategoryChange = (e) => {
    // Update the categoryInput state when the input changes
    setCategoryInput(e.target.value);
  };
  const handleTakeQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    navigate("/questions"); // Navigate to QuestionsByQuizId component
  };

  const checkQuizs = quizList.length > 0 ? true : false;

  return (
    <div>
      <h1 className="alert alert-success">QuizsByCategory</h1>
      {/* Input field for the category */}
      <input
        type="text"
        placeholder="Enter category"
        value={categoryInput}
        onChange={handleCategoryChange}
      />
      <button className="btn btn-success" onClick={getQuizs}>
        Get Quizs by Category
      </button>
      <hr />
      {checkQuizs ? (
        <div>
          {quizList.map((quiz) => (
            <div key={quiz.quizId} className="alert alert-primary">
              Quiz Id:{quiz.quizId}
              <br/>
              Quiz Title: {quiz.title}
              <br />
              Quiz Description: {quiz.description}
              <br />
              Quiz Category: {quiz.category}
              <br />
              Quiz TimeLimit: {quiz.timeLimit}
              <br/>                   
                    <button
                        className="btn btn-primary"
                        onClick={() => handleTakeQuiz(quiz.quizId)}> 
                        Take Quiz
                    </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No quizs available for the provided category</div>
      )}
    </div>
  );
}

export default QuizsByCategory;