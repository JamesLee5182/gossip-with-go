import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ForumIcon from '@mui/icons-material/Forum';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* The Logo / Home Link */}
        <ForumIcon sx={{ mr: 2 }} />
        <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
        >
          Gossip with Go
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}