import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const QuizCard = ({ quiz }) => {
  const { title, logo, description, category, time } = quiz;

  return (
    <Card>
      <CardMedia
        component="img"
        alt="Quiz Logo"
        height="140"
        image={logo}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Category: {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time: {time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuizCard;