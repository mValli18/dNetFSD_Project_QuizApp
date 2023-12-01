import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuestionsByQuiz() {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.quizId) {
      //checkQuizCompletion(location.state.quizId);
      getQuestionsByQuizId(location.state.quizId);
    }
  }, [location.state]);

 /* const checkQuizCompletion = (quizId) => {
    const username = localStorage.getItem("username");

    fetch(`http://localhost:5252/api/QuizResult/results-with-total-score/${username}/${quizId}`)
      .then(async (response) => {
        const data = await response.json();

        if (data.quizResults.length > 0) {
          alert("You have already completed this quiz. Multiple attempts are not allowed.");
          navigate("/quizs");
        } else {
          getQuestionsByQuizId(quizId);
        }
      })
      .catch((error) => console.error("Error checking quiz completion:", error));
  };*/

  const getQuestionsByQuizId = (quizId) => {
    if (quizCompleted) {
      alert("You have already completed this quiz. Multiple attempts are not allowed.");
      navigate('/');
    } else {
      fetch(`http://localhost:5252/api/Questions/byquiz/${quizId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(async (data) => {
          var myData = await data.json();
          setQuestionList(myData);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (questionList.length > 0 && currentQuestionIndex + 1 < questionList.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  /*const handleEvaluate = () => {
    if (location.state.quizId && localStorage.getItem("username") && questionList.length > 0) {
      const optionIndex = ['A', 'B', 'C', 'D'].indexOf(selectedOption);
      const userAnswerValue = questionList[currentQuestionIndex][`option${optionIndex + 1}`];

      const evaluationData = {
        quizId: parseInt(location.state.quizId),
        username: localStorage.getItem("username"),
        questionId: questionList[currentQuestionIndex].questionId,
        userAnswer: userAnswerValue,
      };

      fetch(`http://localhost:5252/api/Quiz/evaluate/${location.state.quizId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluationData),
      })
        .then(async (response) => {
          const data = await response.json();
          if (currentQuestionIndex + 1 < questionList.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
          } else {
            navigate("/quizresult", {
              state: {
                username: localStorage.getItem("username"),
                quizId: location.state.quizId,
              },
            });
          }
        })
        .catch((error) => console.error('Error evaluating quiz:', error));
    } else {
      alert('Please provide all required fields.');
    }
  };*/

  return (
    <div className="inputcontainer">
      <h1 className="alert alert-success">QuestionsByQuiz</h1>
      {questionList.length > 0 && currentQuestionIndex < questionList.length ? (
        <div>
          <div className="alert alert-success">
            Q. {questionList[currentQuestionIndex].questionTxt}
          </div>
          <form>
            {['A', 'B', 'C', 'D'].map((option, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={`option${index}`}
                  name="options"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  className="form-check-input"
                />
                <label htmlFor={`option${index}`} className="form-check-label">
                  {option}: {questionList[currentQuestionIndex][`option${index + 1}`]}
                </label>
              </div>
            ))}
          </form>
          <button className="btn btn-primary" >
            Next
          </button>
        </div>
      ) : (
        <div>
          {questionList.length === 0 ? (
            <p>No questions available for this quiz.</p>
          ) : (
            <p>No more questions available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionsByQuiz;