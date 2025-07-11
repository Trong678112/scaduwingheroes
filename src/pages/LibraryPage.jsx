import React, { useState, useEffect } from 'react';  
import './LibraryPage.css';  
  
function LibraryPage() {  
    const [libraryCards, setLibraryCards] = useState([]);  
    const [loading, setLoading] = useState(true);  
  
    useEffect(() => {  
        fetch('/library-cards.json')  
            .then(res => res.json())  
            .then(data => {  
                setLibraryCards(data.libraryCards);  
                setLoading(false);  
            })  
            .catch(error => {  
                console.error('Error loading library cards:', error);  
                setLoading(false);  
            });  
    }, []);  
  
    if (loading) return <div>Đang tải thư viện...</div>;  
  
    return (  
        <div className="library-page">  
            <h1>Thư viện thẻ bài</h1>  
            <div className="library-grid">  
                {libraryCards.map(card => (  
                    <div key={card.id} className="library-card">  
                        <img src={card.image} alt={card.title} />  
                        <div className="card-info">  
                            <h3>{card.title}</h3>  
                            <p>{card.description}</p>  
                            <span className={`rarity ${card.rarity.toLowerCase()}`}>  
                                {card.rarity}  
                            </span>  
                        </div>  
                    </div>  
                ))}  
            </div>  
        </div>  
    );  
}  
  
export default LibraryPage;