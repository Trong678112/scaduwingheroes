import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">
          Scaduwing Heroes
        </Link>
        <nav className="main-nav">  
  <NavLink to="/">Trang Chủ</NavLink>  
  <NavLink to="/scan">📷 Quét Mã</NavLink>  
  <NavLink to="/library">📚 Thư Viện</NavLink>  
</nav>
      </div>
    </header>
  );
}

export default Header;