import React, { useState } from 'react';
import { BrowserRouter , Route,Routes } from "react-router-dom";
import { Box, Grid } from '@mui/material';
import Navbar from './components/Navbar';
import QuestionsByQuiz from './components/QuestionsByQuiz';
import Quizs from './components/Quizs'

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsNavOpen(true);
  };

  const handleDrawerClose = () => {
    setIsNavOpen(false);
  };

  return (
    <BrowserRouter>
      <div>
    
      
      <Routes>
        <Route path="/" element={
        
        <div id="content">
              <Navbar />
              <Quizs />
            </div>
            
            }/>
      <Route path="/questionsByquiz" element={
        
        <div id="content">
         
             <QuestionsByQuiz/>
              
            </div>
            
            }/>
       
        {/* Other routes */}
        </Routes>
     
   
    </div>
    </BrowserRouter>
  );
};

export default App;