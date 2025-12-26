import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'
import TopicPage from './pages/TopicPage'
import PostPage from './pages/PostPage'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/topic/:id" element={<TopicPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
