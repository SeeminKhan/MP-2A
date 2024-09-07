import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; // Adjust the import path as needed
import HomePage from './pages/Home'; // Adjust the import path as needed
import LoginPage from './pages/Login'; // Adjust the import path as needed
import RegisterPage from './pages/Register'; // Adjust the import path as needed

const App = () => {
  return (
    <Router>
      <Navbar />
      <HomePage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
