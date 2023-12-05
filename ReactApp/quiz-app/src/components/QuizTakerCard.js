import React from 'react';
import {Link} from 'react-router-dom';   
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
const QuizTakerCard = () => (
  <div class="container center">
  <div class="card">
  <center>< RocketLaunchIcon style={{ fontSize: 48, color: '#007bff' }}/></center>
    <center><h1>Quiz Taker</h1></center>
    <hr/>
   <p>Embark on an exhilarating journey of knowledge exploration with our Quiz Taker experience. Engage with thought-provoking questions, dynamic visuals. Uncover a world where learning is an exciting pursuit, and every quiz is a captivating odyssey. Get ready to be enthralled, challenged, and enlightened—because your quest for knowledge begins here. Welcome to a quiz-taking experience like never before!</p>

    <Link to="/navbar">
   <center><button  style={{ whiteSpace: 'nowrap' }}>Take Quiz</button></center>
 </Link>
  </div>
</div>
  // <div className="card">
  //   <h1>Quiz Taker</h1>
  //   <hr/>
  //   <p>Embark on an exhilarating journey of knowledge exploration with our Quiz Taker experience. Engage with thought-provoking questions, dynamic visuals. Uncover a world where learning is an exciting pursuit, and every quiz is a captivating odyssey. Get ready to be enthralled, challenged, and enlightened—because your quest for knowledge begins here. Welcome to a quiz-taking experience like never before!</p>
  //   <Link to="/navbar">
  //     <center><button  style={{ whiteSpace: 'nowrap' }}>Take Quiz</button></center>
  //   </Link>
  //   {/* Add other content */}
  // </div>
);

export default QuizTakerCard;