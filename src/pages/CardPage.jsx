import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CardPage.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = SpeechRecognition ? new SpeechRecognition() : null;

if (mic) {
    mic.continuous = false;
    mic.interimResults = false;
}

function CardPage() {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeWordForRecording, setActiveWordForRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [transcriptions, setTranscriptions] = useState({});
    const [feedbacks, setFeedbacks] = useState({});

    useEffect(() => {
        fetch('/database.json')
            .then((res) => res.json())
            .then((data) => {
                const foundCard = data.cards.find((c) => c.id === cardId);
                if (foundCard) {
                    setCard(foundCard);
                    if (mic) {
                        mic.lang = foundCard.language === 'english' ? 'en-US' : 'ja-JP';
                    }
                } else {
                    setError('Không tìm thấy bộ thẻ này!');
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [cardId]);

    useEffect(() => {
        if (!mic) return;

        mic.onstart = () => setIsRecording(true);
        mic.onend = () => {
            setIsRecording(false);
            setActiveWordForRecording(null);
        };
        mic.onerror = (event) => console.error('Speech recognition error', event.error);
        mic.onresult = (event) => {
            if (!activeWordForRecording) return;

            const transcript = event.results[0][0].transcript;
            setTranscriptions(prev => ({ ...prev, [activeWordForRecording.word]: transcript }));
            checkPronunciation(activeWordForRecording, transcript);
        };

        const checkPronunciation = (wordObject, transcript) => {
            const originalWord = wordObject.word.toLowerCase().trim();
            const userWord = transcript.toLowerCase().trim().replace(/[.,!?]/g, '');

            if (originalWord === userWord) {
                setFeedbacks(prev => ({ ...prev, [wordObject.word]: '🎉 Chính xác!' }));
            } else {
                setFeedbacks(prev => ({ ...prev, [wordObject.word]: '🤔 Chưa đúng. Thử lại!' }));
            }
        };
    }, [activeWordForRecording]);

    const handleSpeak = (wordToSpeak) => {
        if (!('speechSynthesis' in window)) return;
        const utterance = new SpeechSynthesisUtterance(wordToSpeak);
        utterance.lang = card.language === 'english' ? 'en-US' : 'ja-JP';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleToggleRecording = (wordObject) => {
        if (!mic) return;
        if (isRecording) {
            mic.stop();
        } else {
            setTranscriptions(prev => ({ ...prev, [wordObject.word]: '' }));
            setFeedbacks(prev => ({ ...prev, [wordObject.word]: '' }));
            setActiveWordForRecording(wordObject);
            mic.start();
        }
    };

    if (loading) return <div className="loading-container">Đang tải bộ thẻ...</div>;
    if (error) return <div className="error-container">{error}</div>;

    return (
        <div className="card-page-container">
            <div className="card-header">
                <h1>{card.theme}</h1>
                <p>Bộ thẻ: {card.language === 'english' ? 'Tiếng Anh' : 'Tiếng Nhật'}</p>
            </div>
            <div className="vocab-list">
                {card.vocabulary.map((item) => (
                    <div className="vocab-item" key={item.word}>
                        <div className="vocab-main">
                            <div className="vocab-text">
                                <span className="vocab-word">{item.word}</span>
                                <span className="vocab-phonetic">{item.phonetic}</span>
                            </div>
                            <span className="vocab-meaning">{item.meaning}</span>
                        </div>
                        <div className="vocab-actions">
                            <button onClick={() => handleSpeak(item.word)} className="speak-button">
                                <img src="../public/Speaker.jpg" alt="Nghe phát âm" className="button-icon" />
                            </button>
                            <button
                                onClick={() => handleToggleRecording(item)}
                                className={`record-button ${isRecording && activeWordForRecording?.word === item.word ? 'recording' : ''}`}
                                disabled={isRecording && activeWordForRecording?.word !== item.word}
                            >
                                <img src="../public/Mic.jpg" alt="Ghi âm" className="button-icon" />
                            </button>
                        </div>

                        {isRecording && activeWordForRecording?.word === item.word && (
                            <div className="recording-indicator">🎙️ Đang ghi âm...</div>
                        )}
                        
                        {transcriptions[item.word] && (
                            <div className="transcript">Bạn đã nói: <strong>"{transcriptions[item.word]}"</strong></div>
                        )}
                        {feedbacks[item.word] && (
                            <div className={`feedback ${feedbacks[item.word].includes('Chính xác') ? 'correct' : 'incorrect'}`}>
                                {feedbacks[item.word]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CardPage;
