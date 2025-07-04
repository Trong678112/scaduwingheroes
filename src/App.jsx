import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer
import HomePage from './pages/HomePage';
import CardPage from './pages/CardPage';
import ScanPage from './pages/ScanPage'; // <-- Thêm import
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} /> {/* <-- Thêm Route mới */}
        <Route path="/card/:cardId" element={<CardPage />} />
      </Routes>
    </div>
  );
}

export default App;