import React from 'react';  
import { Routes, Route, useLocation } from 'react-router-dom';  
import Header from './components/Header';  
import Footer from './components/Footer';  
import HomePage from './pages/HomePage';  
import CardPage from './pages/CardPage';  
import ScanPage from './pages/ScanPage';  
import './App.css';  
  
function App() {  
  const location = useLocation();  
  const showHeader = !location.pathname.startsWith('/card/');  
  
  return (  
    <div className="App">  
      {showHeader && <Header />}  
      <Routes>  
        <Route path="/" element={<HomePage />} />  
        <Route path="/scan" element={<ScanPage />} />  
        <Route path="/card/:cardId" element={<CardPage />} />  
      </Routes>  
      <Footer />  
    </div>  
  );  
}  
  
export default App;