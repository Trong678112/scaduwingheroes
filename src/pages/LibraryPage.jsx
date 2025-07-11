// src/pages/LibraryPage.jsx  
import React, { useState } from 'react';  
import './LibraryPage.css';  
  
function LibraryPage() {  
    const [selectedCard, setSelectedCard] = useState(null);  
      
    // Tạo động 12 thẻ bài từ lib-001 đến lib-012  
    const cardLibrary = Array.from({ length: 12 }, (_, index) => {  
        const cardNumber = String(index + 1).padStart(3, '0');  
        return {  
            id: `lib-${cardNumber}`,  
            title: `Thẻ Bài ${cardNumber}`,  
            image: `/public/images/cards/lib-${cardNumber}.jpg`,  
            description: `Thẻ bài học tập số ${index + 1}`  
        };  
    });  
  
    const handleCardClick = (card) => {  
        setSelectedCard(card);  
    };  
  
    const closeModal = () => {  
        setSelectedCard(null);  
    };  
  
    return (  
        <div className="library-page">  
            <div className="library-header">  
                <h2>Thư Viện Thẻ Bài</h2>  
                <p>Bộ sưu tập 12 thẻ bài học tập</p>  
            </div>  
              
            <div className="card-grid">  
                {cardLibrary.map(card => (  
                    <div   
                        key={card.id}  
                        className="library-card"  
                        onClick={() => handleCardClick(card)}  
                    >  
                        <img src={card.image} alt={card.title} />  
                        <div className="card-info">  
                            <h3>{card.title}</h3>  
                            <p>{card.description}</p>  
                        </div>  
                    </div>  
                ))}  
            </div>  
  
            {/* Modal hiển thị ảnh lớn ở giữa màn hình */}  
            {selectedCard && (  
                <div className="modal-overlay" onClick={closeModal}>  
                    <div className="modal-content" onClick={e => e.stopPropagation()}>  
                        <button className="close-button" onClick={closeModal}>×</button>  
                        <img src={selectedCard.image} alt={selectedCard.title} />  
                        <div className="modal-info">  
                            <h3>{selectedCard.title}</h3>  
                            <p>{selectedCard.description}</p>  
                        </div>  
                    </div>  
                </div>  
            )}  
        </div>  
    );  
}  
  
export default LibraryPage;