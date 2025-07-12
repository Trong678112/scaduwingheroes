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
          
        {/* Hamburger Button */}  
        <button   
          className="mobile-menu-toggle"  
          onClick={() => setIsMenuOpen(!isMenuOpen)}  
          aria-label="Toggle menu"  
        >  
          <span></span>  
          <span></span>  
          <span></span>  
        </button>  
  
        {/* Navigation Menu */}  
        <nav className={`main-nav mobile-nav ${isMenuOpen ? 'open' : ''}`}>    
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Trang Chủ</NavLink>    
          <NavLink to="/scan" onClick={() => setIsMenuOpen(false)}>📷 Quét Mã</NavLink>    
          <NavLink to="/library" onClick={() => setIsMenuOpen(false)}>📚 Thư Viện</NavLink>    
        </nav>  
      </div>  
    </header>  
  );  
}  
  
export default Header;