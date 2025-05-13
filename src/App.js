import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StudentProjects from './pages/Students';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const AppContent = () => {
  const location = useLocation(); // Get current location

  return (
    <>
      {/* Conditionally render Navbar and Footer */}
      {location.pathname !== '/admin' && <Navbar />}
      
      <Routes>
        <Route path='/admin' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/students" element={<StudentProjects />} />
      </Routes>

      {location.pathname !== '/admin' && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
