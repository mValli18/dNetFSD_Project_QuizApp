import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Radio,
  FormControlLabel,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
} from '@mui/material';
import "./RegisterUser.css";


function QuestionsByQuiz() {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [timelimit, setTimelimit] = useState(0);
  const token = localStorage.getItem("token");
  const [decrementInterval, setDecrementInterval] = useState(null);
  const totalQuestions = questionList.length;

  useEffect(() => {
    if (location.state && location.state.quizId) {
      checkQuizCompletion(location.state.quizId);
      getQuestionsByQuizId(location.state.quizId);
      if (location.state.timelimit > 0) {
        setTimelimit(location.state.timelimit);
        setTimeRemaining(location.state.timelimit * 60);
        setDecrementInterval(setInterval(handleTimerTick, 1000));
      }
    }
  }, [location.state]);

  useEffect(() => {
    return () => {
      clearInterval(decrementInterval); // Cleanup the timer on component unmount
    };
  }, [decrementInterval]);

  const handleTimerTick = () => {
    setTimeRemaining((prevTime) => {
      if (prevTime > 0) {
        return prevTime - 1;
      } else {
        clearInterval(decrementInterval);
        handleQuizCompletion();
        return 0;
      }
    });
  };

  const checkQuizCompletion = (quizId) => {
    const username = localStorage.getItem("username");

    fetch(`http://localhost:5252/api/QuizResult/results-with-total-score/${username}/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (data.quizResults.length > 0) {
          alert("You have already completed this quiz. Multiple attempts are not allowed.");
          navigate("/quizresult", {
            state: {
              username: localStorage.getItem("username"),
              quizId: location.state.quizId,
            },
          })
        } else {
          getQuestionsByQuizId(quizId);
        }
      })
      .catch((error) => console.error("Error checking quiz completion:", error));
  };

  const getQuestionsByQuizId = (quizId) => {
    fetch(`http://localhost:5252/api/Questions/byquiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => {
        var myData = await data.json();
        if (myData.length > 0) {
          console.log(myData);
          console.log("The total number of questions present in this quiz are", myData.length);
          setQuestionList(myData);
          if (myData.length > 0 && myData[0].timelimit) {
            setTimeRemaining(myData[0].timelimit * 60); // Update time remaining when time limit changes
          }
        }
        else {
          alert('No questions available in this quiz yet!')
          setTimeout(() => {
            navigate("/navbar");
          }, 0);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleEvaluate = () => {
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
          Authorization: `Bearer ${token}`,
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
            handleQuizCompletion();
          }
        })
        .catch((error) => console.error('Error evaluating quiz:', error));
    } else {
      alert('Please provide all required fields.');
    }
  };

  const handleQuizCompletion = () => {
    navigate("/quizresult", {
      state: {
        username: localStorage.getItem("username"),
        quizId: location.state.quizId,
      },
    });
  };

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      
      {timeRemaining > 0 && (
        <div className="alert alert-info">
          Time Remaining: {Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:{(timeRemaining % 60).toString().padStart(2, '0')}
        </div>
      )}
      {(timelimit === 0 || timelimit === null) && <div className="alert alert-info">No time limit for this quiz.</div>}
      {questionList.length > 0 ? (
        <div>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f5f5f5' }}>
            <Typography variant="h4" component="div" color="success">
              Quiz Questions
            </Typography>
            <Tabs
              value={currentQuestionIndex}
          
              indicatorColor="primary"
              textColor="primary"
              centered
              sx={{ marginBottom: 2 }}
            >
              {questionList.map((_, index) => (
                <Tab key={index} label={index + 1} />
              ))}
            </Tabs>
            {currentQuestionIndex < questionList.length && (
              <div>
                <Paper elevation={1} sx={{ padding: 2, marginTop: 1, background: 'white' }}>
                  <Typography variant="h6" color="info" gutterBottom>
                    Question: {questionList[currentQuestionIndex].questionTxt}
                  </Typography>
                  <form>
                    {['A', 'B', 'C', 'D'].map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Radio
                            id={`option${index}`}
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleOptionChange(option)}
                          />
                        }
                        label={`${option}: ${questionList[currentQuestionIndex][`option${index + 1}`]}`}
                        sx={{ display: 'block', marginBottom: 1 }}
                      />
                    ))}
                  </form>
                </Paper>
                <ButtonGroup sx={{ marginTop: 3 }}>
                  <Button
                variant="contained"
                color="primary"
                onClick={handleEvaluate}
                sx={{ fontSize: '1rem', width: '150px' }} // Adjust the width as needed
              >
                {currentQuestionIndex + 1 === totalQuestions ? 'Submit' : 'Next'}
              </Button>


                </ButtonGroup>
              </div>
            )}
          </Paper>
        </div>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </Container>
  );
}

export default QuestionsByQuiz;
