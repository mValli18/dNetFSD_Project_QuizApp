import logo from './logo.svg';
import './App.css';
import Quizs from './components/Quizs';
import AddQuiz from './components/AddQuiz';

function App() {
  return (
    <div className="App">
      <div className="App">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <AddQuiz/>
            </div>
            <div className="col">
              <Quizs/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;