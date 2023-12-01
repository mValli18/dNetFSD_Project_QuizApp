import { useState } from "react";
function Questions(){
    const[questionList,setQuestionList]=useState([])
    var getQuestions=()=>{
        fetch('http://localhost:5252/api/Questions/getAll',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then(
            async(data)=>{
                var myData = await data.json();
                await console.log(myData);
                await setQuestionList(myData);
            }
        ).catch((e)=>{
            console.log(e)
        })
    }
    var checkQuestions = questionList.length>0?true:false;
    return(
        <div>
            <h1 className="alert alert-success">Questions</h1>
            <button className="btn btn-success" onClick={getQuestions}>Get All Questions</button>
            <hr/>
            {checkQuestions?
            <div>
                {questionList.map((question)=>
                <div key={question.questionId} className="alert alert-primary">
                    QuestionId:{question.questionId}
                    <br/>
                    Question:{question.questionTxt}
                    <br/>
                    Option A:{question.option1}
                    <br/>
                    Option B:{question.option2}
                    <br/>
                    Option C:{question.option3}
                    <br/>
                    Option D:{question.option4}
                    <br/>
                    QuizId:{question.quizId}
                </div>)}
            </div>
            :
            <div>No questions available yet</div>
            }
        </div>
    )
}
export default Questions;