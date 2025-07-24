import React, { useState, useRef } from 'react';  
import { Link, NavLink } from 'react-router-dom';  
import './Header.css';  
  
function Header() {  
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isPlaying, setIsPlaying] = useState(false);  
  const [currentSong, setCurrentSong] = useState(0);  
  const [showSongSelector, setShowSongSelector] = useState(false);  
  const audioRef = useRef(null);  
  
  const songs = [  
    { name: "Nhạc chủ đề trò chơi", src: "/music/theme-song.mp3", ogg: "/music/theme-song.ogg" },  
    { name: "Whispered Tales of the Glade", src: "/music/background-music.mp3", ogg: "/music/background-music.ogg" }  
  ];  
  
  const handleMusicToggle = () => {  
    if (isPlaying) {  
      audioRef.current.pause();  
      setIsPlaying(false);  
    } else {  
      setShowSongSelector(!showSongSelector);  
    }  
  };  
  
  const playSong = (songIndex) => {  
    setCurrentSong(songIndex);  
    const audioElement = audioRef.current;  
    audioElement.innerHTML = `  
      <source src="${songs[songIndex].src}" type="audio/mpeg" />  
      <source src="${songs[songIndex].ogg}" type="audio/ogg" />  
      Trình duyệt không hỗ trợ audio.  
    `;  
    audioElement.load();  
    audioElement.play();  
    setIsPlaying(true);  
    setShowSongSelector(false);  
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
        {/* Hamburger Button - Di chuyển lên đầu */}  
        <button  
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}  
          onClick={toggleMobileMenu}  
          aria-label="Toggle menu"  
        >  
          <span></span>  
          <span></span>  
          <span></span>  
        </button>  
  
        {/* Music Player Container - Ở giữa */}  
        <div className="music-player-container">  
          <button  
            className={`music-toggle ${isPlaying ? 'spinning' : ''}`}  
            onClick={handleMusicToggle}  
            aria-label="Toggle background music"  
          >  
            🎵  
          </button>  
  
          {/* Song Selector Popup */}  
          {showSongSelector && (  
            <div className="song-selector-popup">  
              <div className="song-selector-header">  
                <span>Chọn bài hát</span>  
              </div>  
              <div className="song-list">  
                {songs.map((song, index) => (  
                  <div  
                    key={index}  
                    className={`song-item ${currentSong === index ? 'active' : ''}`}  
                    onClick={() => playSong(index)}  
                  >  
                    <span className="song-name">{song.name}</span>  
                    {currentSong === index && isPlaying && <span className="playing-indicator">♪</span>}  
                  </div>  
                ))}  
              </div>  
            </div>  
          )}  
        </div>  
  
        {/* Logo - Di chuyển sang phải */}  
        <Link to="/" className="logo">  
          Scaduwing Heroes  
        </Link>  
  
        {/* Hidden Audio Element */}  
        <audio  
          ref={audioRef}  
          loop  
          onEnded={() => setIsPlaying(false)}  
        >  
          <source src={songs[currentSong].src} type="audio/mpeg" />  
          <source src={songs[currentSong].ogg} type="audio/ogg" />  
          Trình duyệt không hỗ trợ audio.  
        </audio>  
  
        {/* Mobile Navigation Menu - Slide từ trái */}  
        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>  
          <div className="mobile-nav-content">  
            <div className="mobile-nav-header">  
              <h3>Scaduwing Heroes</h3>  
            </div>  
            <div className="nav-links">  
              <NavLink to="/" onClick={closeMobileMenu}>Trang Chủ</NavLink>  
              <NavLink to="/scan" onClick={closeMobileMenu}>📷 Quét Mã</NavLink>  
              <NavLink to="/library" onClick={closeMobileMenu}>📚 Thư Viện</NavLink>  
              <NavLink to="/guide" onClick={closeMobileMenu}>📖 Hướng dẫn cách chơi</NavLink>  
              <NavLink to="/dictionary" onClick={closeMobileMenu}>📕 Tra Từ điển Anh-Việt</NavLink> 
              <NavLink to="/novel/novel1" onClick={closeMobileMenu}> ⚔️Đọc Light Novel</NavLink> 
            </div>  
          </div>  
  
          {/* Team Information Section */}  
          <div className="team-info-section">  
            <div className="team-header">  
              <h4>👥 Đội ngũ phát triển</h4>  
            </div>  
            <div className="team-members">  
              <div className="team-member">  
                <span className="member-name">Nguyễn Bảo Trọng</span>  
                <span className="member-role">Thiết kế, quản lí trang web</span>  
              </div>  
              <div className="team-member">  
                <span className="member-name">Phan Thảo Nguyên</span>  
                <span className="member-role">CEO, chủ nhiệm dự án</span>  
              </div>  
              <div className="team-member">  
                <span className="member-name">Phạm Hữu Nghĩa</span>  
                <span className="member-role">Kế toán</span>  
              </div>  
              <div className="team-member">  
                <span className="member-name">Lê Nguyễn Bình</span>  
                <span className="member-role">Truyền thông và marketing</span>  
              </div>  
            </div>  
            <div className="contact-info">  
              <div className="contact-item">  
                <span className="contact-icon">📧</span>  
                <span className="contact-text">scaduwingheroes@gmail.com</span>  
              </div>  
              <div className="contact-item">  
                <span className="contact-icon">📍</span>  
                <span className="contact-text">Đường Nguyễn Văn Cừ - Cần Thơ</span>  
              </div>  
            </div>  
          </div>  
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