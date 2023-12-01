import { useState } from "react";

function QuestionsByQuizId() {
  const [questionList, setQuestionList] = useState([]);
  const [quizIdInput, setQuizIdInput] = useState(""); // State to store the input value

  const getQuestionsByQuizId = () => {
    // Use the categoryInput in the fetch URL
    fetch(`http://localhost:5252/api/Questions/byquiz/${quizIdInput}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
        setQuestionList(myData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleQuizIdChange = (e) => {
    // Update the categoryInput state when the input changes
    setQuizIdInput(e.target.value);
  };

  var checkQuestions = questionList.length>0?true:false;

  return (
    <div>
      <h1 className="alert alert-success">QuestionsByQuizId</h1>
      {/* Input field for the category */}
      <input
        type="number"
        placeholder="Enter quizId"
        value={quizIdInput}
        onChange={handleQuizIdChange}
      />
      <br/>
      <button className="btn btn-success" onClick={getQuestionsByQuizId}>
        Get Questions By QuizId
      </button>
      <hr />
      {checkQuestions?
            <div>
                {questionList.map((question)=>
                <div key={question.questionId} className="alert alert-primary">
                    Question:{question.questionTxt}
                    <br/>
                    Option A:{question.option1}
                    <br/>
                    Option B:{question.option2}
                    <br/>
                    Option C:{question.option3}
                    <br/>
                    Option D:{question.option4}
                </div>)}
            </div>
            :
            <div>No questions available yet</div>
            }
        </div>
    )
}

export default QuestionsByQuizId;