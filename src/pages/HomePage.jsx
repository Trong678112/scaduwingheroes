// src/pages/HomePage.jsx  
import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';  
import './HomePage.css';  
  
function HomePage() {  
    const [showFbChat, setShowFbChat] = useState(false);  
    const [showTikTokChat, setShowTikTokChat] = useState(false);  
    const [fbTypedText, setFbTypedText] = useState('');  
    const [tikTokTypedText, setTikTokTypedText] = useState('');  
    const [isFbTyping, setIsFbTyping] = useState(false);  
    const [isTikTokTyping, setIsTikTokTyping] = useState(false);  
    const [isVisible, setIsVisible] = useState(false);  
        
    const fbMessage = "Chào bạn, nếu cần giúp đở thì liên hệ với chúng tôi.";  
    const tikTokMessage = "Theo dõi chúng tôi trên TikTok để xem nội dung thú vị!";  
  
    useEffect(() => {  
        setIsVisible(true);  
    }, []);  
        
    // Facebook typing effect  
    useEffect(() => {  
        if (showFbChat && !isFbTyping) {  
            setIsFbTyping(true);  
            setFbTypedText('');  
            let currentIndex = 0;  
            const typingInterval = setInterval(() => {  
                if (currentIndex < fbMessage.length) {  
                    setFbTypedText(fbMessage.substring(0, currentIndex + 1));  
                    currentIndex++;  
                } else {  
                    clearInterval(typingInterval);  
                    setIsFbTyping(false);  
                }  
            }, 50);  
            return () => clearInterval(typingInterval);  
        }  
    }, [showFbChat]);  
  
    // TikTok typing effect  
    useEffect(() => {  
        if (showTikTokChat && !isTikTokTyping) {  
            setIsTikTokTyping(true);  
            setTikTokTypedText('');  
            let currentIndex = 0;  
            const typingInterval = setInterval(() => {  
                if (currentIndex < tikTokMessage.length) {  
                    setTikTokTypedText(tikTokMessage.substring(0, currentIndex + 1));  
                    currentIndex++;  
                } else {  
                    clearInterval(typingInterval);  
                    setIsTikTokTyping(false);  
                }  
            }, 50);  
            return () => clearInterval(typingInterval);  
        }  
    }, [showTikTokChat]);  
        
    const handleFbChatToggle = () => {  
        if (showFbChat) {  
            setShowFbChat(false);  
            setFbTypedText('');  
            setIsFbTyping(false);  
        } else {  
            if (showTikTokChat) {  
                setShowTikTokChat(false);  
                setTikTokTypedText('');  
                setIsTikTokTyping(false);  
            }  
            setShowFbChat(true);  
        }  
    };  
  
    const handleTikTokChatToggle = () => {  
        if (showTikTokChat) {  
            setShowTikTokChat(false);  
            setTikTokTypedText('');  
            setIsTikTokTyping(false);  
        } else {  
            if (showFbChat) {  
                setShowFbChat(false);  
                setFbTypedText('');  
                setIsFbTyping(false);  
            }  
            setShowTikTokChat(true);  
        }  
    };  
        
    return (  
        <div className="hero-section">  
            {/* Floating decorative elements */}  
            <div className="floating-ornaments">  
                <div className="ornament ornament-1">⚔️</div>  
                <div className="ornament ornament-2">🛡️</div>  
                <div className="ornament ornament-3">👑</div>  
                <div className="ornament ornament-4">🏰</div>  
            </div>  
  
            <div className={`hero-content ${isVisible ? 'animate-in' : ''}`}>  
                <div className="hero-brand">  
                    <div className="logo-container">  
                        <img className="logo-h" src="/logo.jpg" alt="Scaduwing Heroes Logo" />  
                        <div className="logo-frame"></div>  
                    </div>  
                    <h1 className="hero-title">  
                        <span className="title-main">Scaduwing Heroes</span>  
                        <span className="title-sub">Học Ngoại Ngữ Theo Cách Mới</span>  
                    </h1>  
                </div>  
                  
                <p className="hero-subtitle">  
                    Kết hợp thẻ bài vật lý và công nghệ tương tác để ghi nhớ từ vựng   
                    <span className="highlight">hiệu quả</span> và   
                    <span className="highlight">thú vị</span> hơn bao giờ hết.  
                </p>  
  
                <div className="hero-buttons">  
                    <Link to="/library" className="hero-cta-button primary">  
                        <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">  
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>  
                        </svg>  
                        <span className="button-text">Thư viện thẻ bài</span>  
                        <span className="button-arrow">⟶</span>  
                    </Link>  
                      
                    <Link to="/scan" className="hero-cta-button secondary">  
                        <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">  
                            <path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6.5 9.5v3h-3v-3h3M13 13h6v6h-6v-6zm-2 0h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z"/>  
                        </svg>  
                        <span className="button-text">Bắt đầu quét thẻ</span>  
                        <span className="button-arrow">⟶</span>  
                    </Link>  
                      
                    <Link to="/dictionary" className="hero-cta-button tertiary">  
                        <svg className="button-icon" viewBox="0 0 24 24" fill="currentColor">  
                            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>  
                        </svg>  
                        <span className="button-text">Tra từ điển Anh-Việt</span>  
                        <span className="button-arrow">⟶</span>  
                    </Link>  
                </div>  
            </div>  
                
            {/* TikTok Chat Widget */}  
            <div className="tiktok-chat-widget">  
                <div className="tiktok-chat-button" onClick={handleTikTokChatToggle}>  
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'/%3E%3C/svg%3E" alt="TikTok" />  
                </div>  
                {showTikTokChat && (  
                    <div className="tiktok-chat-popup">  
                        <div className="tiktok-chat-header">  
                            <span>Theo dõi TikTok</span>  
                            <button onClick={handleTikTokChatToggle}>×</button>  
                        </div>  
                        <div className="chat-content">  
                            <div className="chat-message">  
                                <div className="typing-text">  
                                    {tikTokTypedText}  
                                    {isTikTokTyping && <span className="cursor">|</span>}  
                                </div>  
                            </div>  
                            <div className="chat-input-area">  
                                <input type="text" placeholder="Nhập tin nhắn..." className="chat-input" disabled />  
                                <a href="https://www.tiktok.com/@scaduwingheroes?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="tiktok-link">  
                                    Xem TikTok  
                                </a>  
                            </div>  
                        </div>  
                    </div>  
                )}  
            </div>  
  
            {/* Facebook Chat Widget */}  
            <div className="facebook-chat-widget">  
                <div className="fb-chat-button" onClick={handleFbChatToggle}>  
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E" alt="Facebook" />  
                </div>  
                {showFbChat && (  
                    <div className="fb-chat-popup">  
                        <div className="chat-header">  
                            <span>Chat với chúng tôi</span>  
                            <button onClick={handleFbChatToggle}>×</button>  
                        </div>  
                        <div className="chat-content">  
                            <div className="chat-message">  
                                <div className="typing-text">  
                                    {fbTypedText}  
                                    {isFbTyping && <span className="cursor">|</span>}  
                                </div>  
                            </div>  
                            <div className="chat-input-area">  
                                <input type="text" placeholder="Nhập tin nhắn..." className="chat-input" disabled />  
                                <a href="https://www.facebook.com/profile.php?id=61563197739302" target="_blank" rel="noopener noreferrer" className="fb-link">  
                                    Truy cập Facebook  
                                </a>  
                            </div>  
                        </div>  
                    </div>  
                )}  
            </div>  
        </div>  
    );  
}  
  
export default HomePage;