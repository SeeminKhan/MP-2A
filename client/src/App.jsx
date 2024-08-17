import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the import path as needed
import HomePage from './pages/Home'; // Adjust the import path as needed
import LoginPage from './pages/Login'; // Adjust the import path as needed
import RegisterPage from './pages/Register'; // Adjust the import path as needed
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
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
