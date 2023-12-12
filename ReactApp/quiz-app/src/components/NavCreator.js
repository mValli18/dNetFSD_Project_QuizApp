import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logo from '../quiz.jpg';
import Quizs from './Quizs';
import Leaderboard from './Leaderboard';
import Profile from './UserProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import ManageQuestions from './Questions';
import ManageQuizs from './ManageQuizs';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Navigation() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: `#383838` }}>
        <Toolbar  >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
         QUIZ APP
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
      
        <List >
        <ListItem disablePadding >
               <img src={logo} alt="logo" width="200px" height="200px" />
        </ListItem>
        <Link to="/userprofile" >
        <ListItem Padding >
        <ListItemButton>
               <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                <ListItemText primary="Profile" />
        </ListItemButton>
        </ListItem>
        </Link>
        <Link to="/quizreport">
        <ListItem Padding >
        <ListItemButton>
               <ListItemIcon><HistoryIcon/></ListItemIcon>
                <ListItemText primary="QuizReports" />
                </ListItemButton>
        </ListItem>
        </Link>

        <Link to="/leaderboard" >
        <ListItem Padding >
        <ListItemButton>
               <ListItemIcon>< LeaderboardIcon/></ListItemIcon>
                <ListItemText primary="Leaderboard" />
                </ListItemButton>
        </ListItem>
        </Link>
        
        <Link to="/creator" >
        <ListItem Padding >
        <ListItemButton>
               <ListItemIcon><EditNoteIcon  /></ListItemIcon>
                <ListItemText primary="Create" />
                </ListItemButton>
        </ListItem>
        </Link>
        
        <Link to="/logout" >
        <ListItem Padding >
        <ListItemButton>
               <ListItemIcon>< LogoutIcon/></ListItemIcon>
                <ListItemText primary="Logout" />
                </ListItemButton>
        </ListItem>
        </Link>
        
        </List>
    
        
       
      </Drawer>
      <Main open={open}>
       
     <Quizs/>
      </Main>
     
    </Box>
  );
}
