import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddQuestion.css";
function AddQuestion(){
    const [questionTxt,setQuestionTxt] = useState("");
    const [option1,setOption1] = useState("");
    const [option2,setOption2] = useState("");
    const [option3,setOption3]=useState("");
    const [option4,setOption4]= useState("");
    const [answer,setAnswer] = useState("");
    const[quizId,setQuizId]= useState(0);
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    var question;
    var clickAdd = ()=>{
       question={
        "questionTxt":questionTxt,
        "option1":option1,
        "option2":option2,
        "option3":option3,
        "option4":option4,
        "answer":answer,
        "quizId":quizId
        }
        console.log(question);
        fetch('http://localhost:5252/api/Questions/add',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(question)
        }).then(
            ()=>{
                alert("Question Added Successfully");
            }
        ).catch((e)=>{
            console.log(e)
        })
    }


    return(
        <div className="inputcontainer">
            <h2 className="alert alert-quiz">Add Questions</h2>
            <label className="form-control" htmlFor="qutxt">Question</label>
            <input id="qutxt" type="text" className="form-control" value={questionTxt} onChange={(e)=>{setQuestionTxt(e.target.value)}}/>
            <label className="form-control"  htmlFor="quopt1">Option A</label>
            <input id="quopt1" type="text" className="form-control" value={option1} onChange={(e)=>{setOption1(e.target.value)}}/>
            <label className="form-control"  htmlFor="quopt2">Option B</label>
            <input id="quopt2" type="text" className="form-control" value={option2} onChange={(e)=>{setOption2(e.target.value)}}/>
            <label className="form-control"  htmlFor="quopt3">Option C</label>
            <input id="quopt3" type="text" className="form-control" value={option3} onChange={(e)=>{setOption3(e.target.value)}}/>
            <label className="form-control"  htmlFor="quopt3">Option D</label>
            <input id="quopt4" type="text" className="form-control" value={option4} onChange={(e)=>{setOption4(e.target.value)}}/>
            <label className="form-control"  htmlFor="quans">Answer</label>
            <input id="quans" type="text" className="form-control" value={answer} onChange={(e)=>{setAnswer(e.target.value)}}/>
            <label className="form-control"  htmlFor="qId">Quiz Id</label>
            <input id="qId" type="number" className="form-control" value={quizId} onChange={(e)=>{setQuizId(e.target.value)}}/>
            <button onClick={clickAdd} className="btn btn-primary">Add Question</button>
        </div>
    );
}

export default AddQuestion;