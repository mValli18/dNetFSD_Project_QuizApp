// GoToQuizsButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const GoToQuizsButton = () => {
  return (
    <Link to="/navbar" style={{ textDecoration: 'none', marginRight: '16px' }}>
      <Button variant="contained" color="primary">
        Go to Quizs
      </Button>
    </Link>
  );
};

export default GoToQuizsButton;
