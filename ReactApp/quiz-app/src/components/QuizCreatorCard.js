import {Link} from 'react-router-dom';                                                                                                                                                                   import React from 'react';

import EditNoteIcon from '@mui/icons-material/EditNote';
const QuizCreatorCard = () => (
  <div className="card">
    <center>< EditNoteIcon style={{ fontSize: 48, color: '#007bff' }}/></center>
    <center><h1 > Quiz Creator</h1></center>

    <hr/>
    <p>A visionary tool designed to transform the ordinary into the extraordinary. Unleash your imagination as you navigate through an intuitive interface, making every quiz an immersive experience. Get ready to redefine engagement, captivate your audience, and embark on a journey where curiosity meets knowledge in the most captivating way imaginable. Welcome to a new era of interactive discovery!</p>
    <Link to="/navcreator">
      <center><button>Create</button></center>
    </Link>
  </div>
);

export default QuizCreatorCard;
