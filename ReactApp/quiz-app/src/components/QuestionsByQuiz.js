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

function QuestionsByQuiz() {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.quizId) {
      checkQuizCompletion(location.state.quizId);
      getQuestionsByQuizId(location.state.quizId);
    }
  }, [location.state]);

  const checkQuizCompletion = (quizId) => {
    const username = localStorage.getItem('username');

    fetch(`http://localhost:5252/api/QuizResult/results-with-total-score/${username}/${quizId}`)
      .then(async (response) => {
        const data = await response.json();

        if (data.quizResults.length > 0) {
          alert('You have already completed this quiz. Multiple attempts are not allowed.');
          navigate('/navbar');
        } else {
          getQuestionsByQuizId(quizId);
        }
      })
      .catch((error) => console.error('Error checking quiz completion:', error));
  };

  const getQuestionsByQuizId = (quizId) => {
    if (quizCompleted) {
      alert('You have already completed this quiz. Multiple attempts are not allowed.');
      navigate('/navbar');
    } else {
      fetch(`http://localhost:5252/api/Questions/byquiz/${quizId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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

  const handleEvaluate = () => {
    if (location.state.quizId && localStorage.getItem('username') && questionList.length > 0) {
      const optionIndex = ['A', 'B', 'C', 'D'].indexOf(selectedOption);
      const userAnswerValue = questionList[currentQuestionIndex][`option${optionIndex + 1}`];

      const evaluationData = {
        quizId: parseInt(location.state.quizId),
        username: localStorage.getItem('username'),
        questionId: questionList[currentQuestionIndex].questionId,
        userAnswer: userAnswerValue,
      };

      fetch(`http://localhost:5252/api/Quiz/evaluate/${location.state.quizId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
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
            navigate('/quizresult', {
              state: {
                username: localStorage.getItem('username'),
                quizId: location.state.quizId,
              },
            });
          }
        })
        .catch((error) => console.error('Error evaluating quiz:', error));
    } else {
      alert('Please provide all required fields.');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentQuestionIndex(newValue);
    setSelectedOption(null);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f5f5f5' }}>
        <Typography variant="h4" component="div" color="success">
          Quiz Questions
        </Typography>
        <Tabs
          value={currentQuestionIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          sx={{ marginBottom: 2 }}
        >
          {questionList.map((_, index) => (
            <Tab key={index} label={index + 1} />
          ))}
        </Tabs>
        {questionList.length > 0 && currentQuestionIndex < questionList.length ? (
          <div>
            <Paper elevation={1} sx={{padding: 4, marginTop: 2, background: 'white', width:'600px',height:'350px'}}>
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
           
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="secondary" onClick={handlePrevious}>
                Previous
              </Button>
              <Button variant="contained" color="primary" onClick={handleEvaluate}>
                Next
              </Button>
            </div>
           
          </div>
        ) : (
          <div>
            {questionList.length === 0 ? (
              <Typography variant="body1">No questions available for this quiz.</Typography>
            ) : (
              <Typography variant="body1">No more questions available.</Typography>
            )}
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default QuestionsByQuiz;
