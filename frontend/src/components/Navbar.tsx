import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ForumIcon from '@mui/icons-material/Forum';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <ForumIcon sx={{ mr: 2 }} />

        <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
        >
          Gossip with Go
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}

      </Toolbar>
    </AppBar>
  );
}