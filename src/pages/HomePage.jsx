// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="hero-section">
            <img class = "logo-h" src="../public/logo.jpg"></img>
            <h3 className="hero-title">Scaduwing Heroes Học Ngoại Ngữ Theo Cách Mới</h3>
            <p className="hero-subtitle">
                Kết hợp thẻ bài vật lý và công nghệ tương tác để ghi nhớ từ vựng hiệu quả và thú vị hơn bao giờ hết.
            </p>
            <Link to="/scan" className="hero-cta-button">
                Bắt đầu quét thẻ
            </Link>
        </div>
    );
}

export default HomePage;