import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer-main">
      <p>&copy; {currentYear} Flashcard Pro. All rights reserved.</p>
    </footer>
  );
}

export default Footer;