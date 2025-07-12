import React, { useState, useRef } from 'react';  
import { Link, NavLink } from 'react-router-dom';  
import './Header.css';  
  
function Header() {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isPlaying, setIsPlaying] = useState(false);  
  const audioRef = useRef(null);  
  
  const handleMusicToggle = () => {  
    if (audioRef.current) {  
      if (isPlaying) {  
        audioRef.current.pause();  
        setIsPlaying(false);  
      } else {  
        audioRef.current.play();  
        setIsPlaying(true);  
      }  
    }  
  };  
  
  const toggleMobileMenu = () => {  
    setIsMenuOpen(!isMenuOpen);  
  };  
  
  const closeMobileMenu = () => {  
    setIsMenuOpen(false);  
  };  
  
  return (  
    <header className="site-header">  
      <div className="container">  
        <Link to="/" className="logo">  
          Scaduwing Heroes  
        </Link>  
  
        {/* Music Player Icon */}  
        <button  
          className={`music-toggle ${isPlaying ? 'spinning' : ''}`}  
          onClick={handleMusicToggle}  
          aria-label="Toggle background music"  
        >  
          🎵  
        </button>  
  
        {/* Hidden Audio Element */}  
        <audio  
          ref={audioRef}  
          loop  
          onEnded={() => setIsPlaying(false)}  
        >  
          <source src="/music/theme-song.mp3" type="audio/mpeg" />  
          <source src="/music/theme-song.ogg" type="audio/ogg" />  
          Trình duyệt không hỗ trợ audio.  
        </audio>  
  
        {/* Hamburger Button - Hiển thị trên tất cả thiết bị */}  
        <button  
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}  
          onClick={toggleMobileMenu}  
          aria-label="Toggle menu"  
        >  
          <span></span>  
          <span></span>  
          <span></span>  
        </button>  
  
        {/* Mobile Navigation Menu */}  
        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>  
          <button className="mobile-nav-close" onClick={closeMobileMenu}>  
            ×  
          </button>  
          <div className="mobile-nav-header">  
            <h3>Scaduwing Heroes</h3>  
          </div>  
          <NavLink to="/" onClick={closeMobileMenu}>Trang Chủ</NavLink>  
          <NavLink to="/scan" onClick={closeMobileMenu}>📷 Quét Mã</NavLink>  
          <NavLink to="/library" onClick={closeMobileMenu}>📚 Thư Viện</NavLink>  
          <NavLink to="/guide" onClick={closeMobileMenu}>📖 Hướng dẫn cách chơi</NavLink>  
        </nav>  
  
        {/* Overlay */}  
        <div  
          className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}  
          onClick={closeMobileMenu}  
        ></div>  
      </div>  
    </header>  
  );  
}  
  
export default Header;