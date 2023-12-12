// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';


// function Menu() {
//   const location = useLocation();
//   const backgroundImageStyle = {
//     backgroundImage: location.pathname === '/' ? `url(${process.env.SRC_URL}/quiz.jpg)` : 'none',
//   };
  

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light" style={backgroundImageStyle}>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav">
//           <li className="nav-item active">
//             <Link className="nav-link" to="/register">Register</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/navbar">Home</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/questions">Questions</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/creator">Creator</Link>
//           </li>
//           <li className="nav-item">
//             <Link className='nav-link' to="/logout">Logout</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Menu;
import React from 'react';
import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
import QuizTakerCard from './QuizTakerCard';
import QuizCreatorCard from './QuizCreatorCard';
import LoginUser from './LoginUser';
import RegisterUser from './RegisterUser';
import '../App.css';


function Menu() {
  return (
   
 
      <div className="App">
        {<nav className="navbar1">
      <div className="navbar-title">
         <h3>SS Quiz App</h3>
      </div>
      <div className="navbar-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>}
        

        {<div className="home">
     <div classname="left">
    <div className="background-image"></div>
    </div>

    
    <div className="cards">
      <QuizTakerCard />
      <QuizCreatorCard />
    </div>
  </div>}

        
          
      </div>
    
    
  );
}



export default Menu;