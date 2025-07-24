import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer-main">
      <p>From T2N Team.</p>
    </footer>
  );
}

export default Footer;