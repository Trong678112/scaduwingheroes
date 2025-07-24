import React, { useState, useEffect, useCallback } from 'react';  
import { useParams } from 'react-router-dom';  
import './CardPage.css';  
  
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;  
const mic = SpeechRecognition ? new SpeechRecognition() : null;  
  
if (mic) {  
    mic.continuous = false;  
    mic.interimResults = false;  
}  
  
// Hàm tiện ích để chuyển đổi Katakana sang Hiragana  
const katakanaToHiragana = (str) => {  
    if (!str) return '';  
    return str.replace(/[\\u30a1-\\u30f6]/g, function (match) {  
        const chr = match.charCodeAt(0) - 0x60;  
        return String.fromCharCode(chr);  
    });  
};  
  
function CardPage() {  
    const { cardId } = useParams();  
    const [card, setCard] = useState(null);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const [voices, setVoices] = useState([]);  
  
    const [activeWordForRecording, setActiveWordForRecording] = useState(null);  
    const [isRecording, setIsRecording] = useState(false);  
    const [transcriptions, setTranscriptions] = useState({});  
    const [feedbacks, setFeedbacks] = useState({});  
  
    // Load available voices - đặc biệt quan trọng cho iOS  
    useEffect(() => {  
        const loadVoices = () => {  
            const availableVoices = speechSynthesis.getVoices();  
            setVoices(availableVoices);  
        };  
  
        // Load voices immediately  
        loadVoices();  
          
        // iOS Safari cần event listener để load voices  
        if (speechSynthesis.onvoiceschanged !== undefined) {  
            speechSynthesis.onvoiceschanged = loadVoices;  
        }  
  
        return () => {  
            if (speechSynthesis.onvoiceschanged !== undefined) {  
                speechSynthesis.onvoiceschanged = null;  
            }  
        };  
    }, []);  
  
    // *** CẢI TIẾN LOGIC KIỂM TRA PHÁT ÂM - KHẮC PHỤC VẤN ĐỀ CHỮ HOA/THƯỜNG ***  
    const checkPronunciation = useCallback((wordObject, transcript) => {  
        // Chuẩn hóa về lowercase để so sánh không phân biệt chữ hoa/thường  
        const cleanedTranscript = transcript.replace(/[.,!?。]/g, '').trim().toLowerCase();  
        const userHiragana = katakanaToHiragana(cleanedTranscript);  
          
        // Lấy từ gốc và làm sạch, chuyển về lowercase  
        const originalWord = wordObject.word.replace(/[.,!?。]/g, '').trim().toLowerCase();  
          
        // Lấy từ Kanji (nếu có) và làm sạch, chuyển về lowercase  
        const kanjiWord = wordObject.kanji ? wordObject.kanji.replace(/[.,!?。]/g, '').trim().toLowerCase() : null;  
  
        // So sánh kết quả của người dùng với cả Hiragana và Kanji (case-insensitive)  
        if (originalWord === cleanedTranscript || (kanjiWord && kanjiWord === cleanedTranscript) || originalWord === userHiragana) {  
            setFeedbacks(prev => ({ ...prev, [wordObject.word]: '🎉 Chính xác!' }));  
        } else {  
            setFeedbacks(prev => ({ ...prev, [wordObject.word]: '🤔 Chưa đúng. Thử lại!' }));  
        }  
    }, []);  
  
    // *** SỬA ĐỔI: NGĂN CHẶN NHẬN DẠNG TIẾNG VIỆT ***  
    useEffect(() => {  
        fetch('/database.json')  
            .then((res) => {  
                if (!res.ok) {  
                    throw new Error(`HTTP error! status: ${res.status}`);  
                }  
                return res.json();  
            })  
            .then((data) => {  
                const foundCard = data.cards.find((c) => c.id === cardId);  
                if (foundCard) {  
                    setCard(foundCard);  
                    if (mic) {  
                        // *** QUAN TRỌNG: Chỉ cho phép tiếng Anh hoặc tiếng Nhật ***  
                        if (foundCard.language === 'japanese') {  
                            mic.lang = 'ja-JP';  
                        } else {  
                            // Mặc định luôn là tiếng Anh, KHÔNG cho phép tiếng Việt  
                            mic.lang = 'en-US';  
                        }  
                    }  
                } else {  
                    setError('Không tìm thấy bộ thẻ này!');  
                }  
                setLoading(false);  
            })  
            .catch((err) => {  
                console.error("Lỗi khi tải dữ liệu thẻ:", err);  
                setError('Không thể tải được dữ liệu thẻ. Vui lòng kiểm tra lại đường dẫn hoặc tệp database.json.');  
                setLoading(false);  
            });  
    }, [cardId]);  
  
    useEffect(() => {  
        if (!mic) return;  
  
        const handleResult = (event) => {  
            if (!activeWordForRecording) return;  
            const transcript = event.results[0][0].transcript;  
            setTranscriptions(prev => ({ ...prev, [activeWordForRecording.word]: transcript }));  
            checkPronunciation(activeWordForRecording, transcript);  
        };  
  
        mic.onstart = () => setIsRecording(true);  
        mic.onend = () => {  
            setIsRecording(false);  
            setActiveWordForRecording(null);  
        };  
        mic.onerror = (event) => console.error('Lỗi nhận dạng giọng nói:', event.error);  
        mic.onresult = handleResult;  
  
        return () => {  
            mic.onstart = null;  
            mic.onend = null;  
            mic.onerror = null;  
            mic.onresult = null;  
        };  
    }, [activeWordForRecording, checkPronunciation]);  
  
    // *** CẢI TIẾN HÀM PHÁT ÂM CHO iOS VÀ ANDROID ***  
    const handleSpeak = (wordToSpeak, phonetic) => {  
        if (!('speechSynthesis' in window) || !card) return;  
          
        let textToSpeak = wordToSpeak;  
        let targetLang = 'en-US';  
          
        // Xử lý text và ngôn ngữ  
        if (card.language === 'japanese') {  
            textToSpeak = phonetic || katakanaToHiragana(wordToSpeak);  
            targetLang = 'ja-JP';  
        }  
  
        const utterance = new SpeechSynthesisUtterance(textToSpeak);  
          
        // *** QUAN TRỌNG: Chọn voice phù hợp cho iOS ***  
        if (voices.length > 0) {  
            let selectedVoice = null;  
              
            if (card.language === 'english') {  
                // Ưu tiên voice tiếng Anh cho iOS  
                selectedVoice = voices.find(voice =>   
                    voice.lang.startsWith('en') &&   
                    (voice.name.includes('Samantha') || voice.name.includes('Alex') || voice.default)  
                ) || voices.find(voice => voice.lang.startsWith('en'));  
            } else {  
                // Voice tiếng Nhật  
                selectedVoice = voices.find(voice =>   
                    voice.lang.startsWith('ja')  
                );  
            }  
              
            if (selectedVoice) {  
                utterance.voice = selectedVoice;  
            }  
        }  
          
        // Thiết lập các thuộc tính  
        utterance.lang = targetLang;  
        utterance.rate = 0.9;  
        utterance.pitch = 1;  
        utterance.volume = 1;  
          
        // Đảm bảo dừng speech trước đó (quan trọng cho iOS)  
        speechSynthesis.cancel();  
          
        // Delay nhỏ cho iOS Safari  
        setTimeout(() => {  
            speechSynthesis.speak(utterance);  
        }, 100);  
    };  
  
    // *** SỬA ĐỔI: THÊM VALIDATION NGÔN NGỮ TRƯỚC KHI GHI ÂM ***  
    const handleToggleRecording = (wordObject) => {  
        if (!mic) {  
            alert("Trình duyệt không hỗ trợ nhận dạng giọng nói.");  
            return;  
        }  
  
        // *** QUAN TRỌNG: Đảm bảo ngôn ngữ được set đúng trước khi bắt đầu ghi âm ***  
        if (card && card.language === 'japanese') {  
            mic.lang = 'ja-JP';  
        } else {  
            // Force English, KHÔNG cho phép tiếng Việt  
            mic.lang = 'en-US';  
        }  
  
        if (isRecording) {  
            mic.stop();  
        } else {  
            setTranscriptions(prev => ({ ...prev, [wordObject.word]: '' }));  
            setFeedbacks(prev => ({ ...prev, [wordObject.word]: '' }));  
            setActiveWordForRecording(wordObject);  
            try {  
                mic.start();  
            } catch (error) {  
                console.error("Lỗi khi bắt đầu ghi âm:", error);  
            }  
        }  
    };  
  
    if (loading) return <div className="loading-container">Đang tải bộ thẻ...</div>;  
    if (error) return <div className="error-container">{error}</div>;  
    if (!card) return <div className="error-container">Không có dữ liệu thẻ.</div>;  
  
    return (  
        <div className="card-page-container">  
            <div className="card-header">  
                <img className="Logo-h" src="/logo.jpg" alt="Scaduwing Heroes Logo" />   
                <h1>{card.theme}</h1>  
                <p>Bộ thẻ: {card.language === 'english' ? 'Tiếng Anh' : 'Tiếng Nhật'}</p>  
            </div>  
            <div className="vocab-list">  
                {card.vocabulary.map((item) => (  
                    <div className="vocab-item" key={item.word}>  
                        <div className="vocab-main">  
                            <div className="vocab-text">  
                                <span className="vocab-word">{item.word}{item.kanji && ` (${item.kanji})`}</span>  
                                <span className="vocab-phonetic">{item.phonetic}</span>  
                            </div>  
                            <span className="vocab-meaning">{item.meaning}</span>  
                        </div>  
                        <div className="vocab-actions">  
                            <button onClick={() => handleSpeak(item.word, item.phonetic)} className="speak-button" aria-label="Nghe phát âm">  
                                <img src="/Speaker.jpg" alt="Nghe phát âm" className="button-icon" />  
                            </button>  
                            <button  
                                onClick={() => handleToggleRecording(item)}  
                                className={`record-button ${isRecording && activeWordForRecording?.word === item.word ? 'recording' : ''}`}  
                                disabled={isRecording && activeWordForRecording?.word !== item.word}  
                                aria-label="Ghi âm và kiểm tra"  
                            >  
                                <img src="/Mic.jpg" alt="Ghi âm" className="button-icon" />  
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
  
            <footer className="card-page-footer">  
                <p>&copy; {new Date().getFullYear()} T2N team. All rights reserved.</p>  
            </footer>  
        </div>  
    );  
}  
  
export default CardPage;