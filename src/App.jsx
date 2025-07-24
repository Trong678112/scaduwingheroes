// src/App.jsx      
import React from 'react';      
import { Routes, Route } from 'react-router-dom';      
import Header from './components/Header';      
import Footer from './components/Footer';      
import HomePage from './pages/HomePage';      
import CardPage from './pages/CardPage';      
import ScanPage from './pages/ScanPage';      
import LibraryPage from './pages/LibraryPage';      
import GuidePage from './pages/GuidePage';    
import DictionaryPage from './pages/DictionaryPage';  
import NovelPage from './pages/NovelPage'; // Thêm import này  
import './App.css';      
      
function App() {      
    return (      
        <div className="App">      
            <Header />      
            <main className="main-content">      
                <Routes>      
                    <Route path="/" element={<HomePage />} />      
                    <Route path="/scan" element={<ScanPage />} />      
                    <Route path="/card/:cardId" element={<CardPage />} />      
                    <Route path="/library" element={<LibraryPage />} />      
                    <Route path="/guide" element={<GuidePage />} />    
                    <Route path="/dictionary" element={<DictionaryPage />} />  
                    <Route path="/novel/:novelId" element={<NovelPage />} /> {/* Route mới */}  
                </Routes>      
            </main>      
            <Footer />      
        </div>      
    );      
}      
      
export default App;