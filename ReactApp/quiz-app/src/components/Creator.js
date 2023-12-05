import { useNavigate } from "react-router-dom";
import './Creator.css'
function Creator(){
    const navigate=useNavigate();
    const handleQuestions=()=>{
        navigate("/questions");
    }
    const handleQuizs=()=>{
        navigate("/quizList");
    }
    return(
        <div className="input-container-controller">
            <button className="btn btn-question" onClick={handleQuestions}>Manage Questions</button>
            <button className="btn btn-quiz" onClick={handleQuizs}>Manage Quizs</button>
        </div>
    );
}
export default Creator;