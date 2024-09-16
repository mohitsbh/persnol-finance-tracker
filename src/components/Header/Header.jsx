import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import defaultImg from '../../assets/user.svg';

const Header = ({ toggleTheme, mode }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const logoutf = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out successfully');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: "18px" } }}>
          Personal Finance Tracker
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img 
              src={user.photoURL ? user.photoURL : defaultImg} 
              alt="User" 
              style={{ borderRadius: "50%", height: "2rem", width: "2rem" }} 
            />
            <Button color="inherit" onClick={logoutf}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;