import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';

function Quizs() {
  const [quizList, setQuizList] = useState([]);
  const [filteredQuizList, setFilteredQuizList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState([0, 60]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch quizzes
    fetch("http://localhost:5252/api/Quiz", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (data) => {
        const myData = await data.json();
        setQuizList(myData);
        setFilteredQuizList(myData);

        // Extract unique categories from quizzes
        const uniqueCategories = [...new Set(myData.map((quiz) => quiz.category))];
        setCategories(uniqueCategories);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const applyFilters = () => {
    let filteredQuizzes = quizList.filter((quiz) => {
      // Apply category filter
      if (categoryFilter !== "All" && quiz.category !== categoryFilter) {
        return false;
      }

      // Apply search filter
      if (
        searchTerm.trim() !== "" &&
        !quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Apply duration filter
      if (
        quiz.timelimit < durationFilter[0] ||
        quiz.timelimit > durationFilter[1]
      ) {
        return false;
      }

      return true;
    });

    setFilteredQuizList(filteredQuizzes);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDurationChange = (_, newValue) => {
    setDurationFilter(newValue);
  };

  const handleTakeQuiz = async (quizId,timelimit) => {
    // Pass the quizId as state to the QuestionsByQuizId component
    console.log("the time limit is",timelimit);
    navigate("/questionsByquiz", { state: { quizId,timelimit } });
  };
  
    // Navigate to the QuestionsByQuizId component
   

  const handleResetFilters = () => {
    setCategoryFilter("All");
    setSearchTerm("");
    setDurationFilter([0, 60]);
    setFilteredQuizList(quizList);
  };

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, searchTerm, durationFilter]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#4CAF50", textAlign: "center" }}>Quizs</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Category"
          select
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <MenuItem value="All">All</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Search by Title"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div style={{ minWidth: "200px" }}>
          <Typography id="duration-slider" gutterBottom>
            Duration (minutes)
          </Typography>
          <Slider
            value={durationFilter}
            onChange={handleDurationChange}
            valueLabelDisplay="auto"
            max={60}
            aria-labelledby="duration-slider"
          />
        </div>
        <Button
  variant="contained"
  onClick={handleResetFilters}
  style={{ width: '150px', height: '40px' }}
>
  Reset Filters
</Button>

      </div>
      <hr />
      {filteredQuizList.length > 0 ? (
        <Grid container spacing={2}>
          {filteredQuizList.map((quiz) => (
            <Grid key={quiz.quizId} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {quiz.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Category: {quiz.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description: {quiz.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Timelimit: {quiz.timelimit}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleTakeQuiz(quiz.quizId,quiz.timelimit)}
                    style={{ marginTop: "10px" }}
                  >
                    Take Quiz
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ textAlign: "center", color: "#555" }}>
          No quizzes available with the current filters
        </div>
      )}
    </div>
  );
}

export default Quizs;
