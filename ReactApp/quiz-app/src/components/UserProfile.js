import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText, Container, Avatar } from "@mui/material";
import { Person } from "@mui/icons-material";
import "./UserProfile.css"; // Add your custom styling here

function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data based on the logged-in username
    const username = localStorage.getItem("username");

    if (username) {
      fetch(`http://localhost:5252/api/User/Login${username}`)
        .then(async (response) => {
          const data = await response.json();
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <Container className="user-profile-container">
      {userData ? (
        <div>
          <Avatar className="user-avatar" alt={userData.username} />
          <Typography variant="h4" gutterBottom>
            {userData.username}'s Profile
          </Typography>

          <List>
            
            <ListItem>
              <ListItemText primary={`Role: ${userData.role}`} />
            </ListItem>
            {/* Add more profile information as needed */}
          </List>
        </div>
      ) : (
        <Typography variant="h5">Loading user profile...</Typography>
      )}
    </Container>
  );
}

export default UserProfile;
