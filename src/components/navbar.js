import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          YALLA-FOOT
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/matches" className="nav-link">
              Matches
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/equipes" className="nav-link">
              Équipes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/classement" className="nav-link">
              Classement
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 