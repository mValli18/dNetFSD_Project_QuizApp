import { useState } from "react";

function AddQuiz(){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [timeLimit,setTimeLimit]=useState("20")//Timer value in seconds
    var quiz;
    var clickAdd = ()=>{
        alert('You clicked the button');
       quiz={
        "title":title,
        "description":description,
        "category":category,
        "timeLimit": timeLimit,
        }
        console.log(quiz);
        fetch('http://localhost:5252/api/Quiz',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(quiz)
        }).then(
            ()=>{
                alert("Quiz Added");
            }
        ).catch((e)=>{
            console.log(e)
        })
    }


    return(
        <div className="inputcontainer">
            <label className="form-control" htmlFor="qtitle">Quiz Title</label>
            <input id="qtitle" type="text" className="form-control" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <label className="form-control"  htmlFor="qdescr">Quiz Description</label>
            <input id="qdescr" type="text" className="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <label className="form-control"  htmlFor="qcate">Quiz Category</label>
            <input id="qcate" type="text" className="form-control" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            <label className="form-control" htmlFor="qtimer">Timer (minutes)</label>
      <input id="qtimer" type="number" className="form-control" value={timeLimit} onChange={(e) => {setTimeLimit(parseInt(e.target.value, 10)); }}/>
            <button onClick={clickAdd} className="btn btn-primary">Add Quiz</button>
        </div>
    );
}

export default AddQuiz;