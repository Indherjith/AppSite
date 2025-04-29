import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import './NavbarStyles.css';
import logo from '../assets/LOGO.png';

function CustomNavbar() {
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false); // Collapse after clicking a link
  };

  return (
    <Navbar expand="lg" sticky="top" className="custom-navbar shadow-lg" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick} className="d-flex align-items-center gap-3">
          <Image src={logo} alt="AppForge Logo" height="50" className="logo-zoom" />
          <span className="appforge-title px-3 py-2 rounded">
            <strong className="text-white">And</strong>
            <strong className="text-danger">Site</strong>{' '}
            <span className="text-warning" style={{ fontWeight: 'normal' }}>Solutions</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-item-custom" onClick={handleNavClick}>Home</Nav.Link>
            <Nav.Link as={Link} to="/services" className="nav-item-custom" onClick={handleNavClick}>Services</Nav.Link>
            <Nav.Link as={Link} to="/students" className="nav-item-custom" onClick={handleNavClick}>Students</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item-custom" onClick={handleNavClick}>About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-item-custom" onClick={handleNavClick}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
