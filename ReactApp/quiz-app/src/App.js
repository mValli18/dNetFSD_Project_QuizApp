import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Quizs from './components/Quizs';
import QuizsByCategory from './components/QuizsByCategory';
import QuestionsByQuizId from './components/QuestionsByQuizId';
import RegisterUser from './components/RegisterUser';
import Menu from './components/Menu';
import LoginUser from './components/LoginUser';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';
import UpdateQuestion from './components/UpdateQuestion';
import DeleteQuestion from './components/DeleteQuestion';
import Protected from './Protected';
import QuizResult from './components/QuizResult';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Routes>
          <Route path="/addQuestions" element={<AddQuestion/>}/>
          <Route path="/updateQuestions" element={<UpdateQuestion/>}/>
          <Route path="/deleteQuestions" element={<DeleteQuestion/>}/>
          <Route path="/login" element={<LoginUser/>}/>
          <Route path='/' element={<RegisterUser />} />
          <Route path="/quizs" element={<Quizs />} />
          <Route path="search" element={<QuizsByCategory />} />
          <Route path="/questions" element={<Protected>
            <Questions/>
          </Protected>} />
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/questionsbyid" element={<Protected>
            <QuestionsByQuizId/>
          </Protected>} />
          <Route path="/quizResult" element={<QuizResult/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;