
/*import './App.css';
import Quizs from './components/Quizs';
import Navbar from './components/Navbar';
import QuestionsByQuiz from './components/QuestionsByQuiz';
import QuizsByCategory from './components/QuizsByCategory';
import RegisterUser from './components/RegisterUser';
import Menu from './components/Menu';
import LoginUser from './components/LoginUser';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';
import UpdateQuestion from './components/UpdateQuestion';
import DeleteQuestion from './components/DeleteQuestion';
import Protected from './Protected';
import QuizResult from './components/QuizResults';
import Leaderboard from './components/Leaderboard';


function App() {
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
        
          <Route path="/addQuestions" element={<AddQuestion/>}/>
          <Route path="/updateQuestions" element={<UpdateQuestion/>}/>
          <Route path="/deleteQuestions" element={<DeleteQuestion/>}/>
          <Route path="/login" element={<LoginUser/>}/>
          <Route path='/' element={<RegisterUser />} />
          <Route path="/navbar" element={<Navbar/>}/>
          
          
          <Route path="/questions" element={<Questions/>} />
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/questionsByquiz" element={
            <QuestionsByQuiz/>
          } />
          <Route path="/quizResult" element={<QuizResult/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;*/
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import QuestionsByQuiz from './components/QuestionsByQuiz';
import Navbar from './components/Navbar';
import RegisterUser from './components/RegisterUser';
import Home from './components/Menu';
import LoginUser from './components/LoginUser';
import AddQuestion from './components/AddQuestion';
import Questions from './components/Questions';
import AddQuiz from './components/AddQuiz';
import Protected from './Protected';
import QuizResult from './components/QuizResults';
import UpdateQuestion from './components/UpdateQuestion';
import DeleteQuestion from './components/DeleteQuestion';
import UpdateQuiz from './components/UpdateQuiz';
import DeleteQuiz from './components/DeleteQuiz';
import Creator from './components/Creator';
import QuizList from './QuizList';
import Leaderboard from './components/Leaderboard';
import NavCreator from './components/NavCreator';
import UserProfile from './components/UserProfile';
import QuizReports from './components/QuizReport'
import QuizIdReport from './components/QuizIdReport';


function App() {
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
          <Route path="/addQuestions" element={<Protected><AddQuestion/></Protected>}/>
          <Route path="/addQuiz" element={<Protected><AddQuiz/></Protected>}/>
          <Route path="/login" element={<LoginUser/>}/>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<RegisterUser  />} />
          <Route path="/navbar" element={<Protected><Navbar/></Protected>}/>
          <Route path="/navcreator" element={<Protected><NavCreator/></Protected>}/>
       
          
          <Route path="/questions" element={<Protected>
            <Questions/>
          </Protected>} />
          
          <Route path="/questionsByquiz" element={
            <Protected><QuestionsByQuiz/></Protected>}/>
          <Route path="/creator" element={<Protected><Creator/></Protected>}/>
          <Route path="/quizResult" element={<Protected><QuizResult/></Protected>}/>
          <Route path="/userprofile" element={<Protected><UserProfile/></Protected>}/>
          
          <Route path="/updateQuestions" element={<Protected>
            <UpdateQuestion/>
          </Protected>}/>
          <Route path="/deleteQuestions" element={<Protected><DeleteQuestion/></Protected>}/>
          <Route path="/updateQuiz" element={<Protected><UpdateQuiz/></Protected>}/>
          <Route path="/deleteQuiz" element={<Protected><DeleteQuiz/></Protected>}/>
          <Route path="/quizList" element={<Protected><QuizList/></Protected>}/>
          <Route path="/quizreport" element={<Protected><QuizReports/></Protected>}/>
          <Route path="/quizidreport" element={<Protected><QuizIdReport/></Protected>}/>
          <Route path="/leaderboard" element={<Protected><Leaderboard/></Protected>}/>
          <Route path="/logout" element={<LoginUser />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
// import QuizTakerCard from './components/QuizTakerCard';
// import QuizCreatorCard from './components/QuizCreatorCard';
// import LoginUser from './components/LoginUser';
// import RegisterUser from './components/RegisterUser';
// import './App.css';
// import LoginUser from './components/LoginUser';

// function App() {
//   return (
//     <Router>
//       <div className="app">
//         {/* Navbar */}
//         <nav className="navbar">
//           <Link to="/">Home</Link>
//           <Link to="/login">LoginUser</Link>
//           <Link to="/register">RegisterUser</Link>
//         </nav>

//         {/* Content */}
//         <Switch>
//           <Route path="/login" component={LoginUser} />
//           <Route path="/register" component={RegisterUser} />
//           <Route path="/" component={HomePage} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// const HomePage = () => (
//   <div className="home">
//     {/* Background Image */}
//     <div className="background-image"></div>

//     {/* Cards */}
//     <div className="cards">
//       <QuizTakerCard />
//       <QuizCreatorCard />
//     </div>
//   </div>
// );

// export default App;