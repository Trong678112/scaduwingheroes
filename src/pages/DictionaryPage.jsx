import React, { useState, useRef } from 'react';  
import './DictionaryPage.css';  
  
function DictionaryPage() {  
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedWord, setSelectedWord] = useState(null);  
  const [loading, setLoading] = useState(false);  
  const [searchHistory, setSearchHistory] = useState([]);  
  const searchInputRef = useRef(null);  
  
  const handleSearch = async (term) => {  
    if (!term.trim()) return;  
      
    setLoading(true);  
      
    try {  
      // Lấy thông tin từ Free Dictionary API  
      const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);  
        
      let wordData = {  
        word: term,  
        phonetic: '',  
        meaning: '',  
        partOfSpeech: 'từ',  
        example: '',  
        synonyms: [],  
        antonyms: [],  
        exampleSentences: [],  
        additionalMeanings: []  
      };  
  
      if (dictResponse.ok) {  
        const dictData = await dictResponse.json();  
        const entry = dictData[0];  
          
        wordData.phonetic = entry.phonetic || entry.phonetics?.[0]?.text || '';  
        wordData.partOfSpeech = translatePartOfSpeech(entry.meanings?.[0]?.partOfSpeech) || 'từ';  
          
        // Lấy synonyms và antonyms  
        wordData.synonyms = entry.meanings?.[0]?.synonyms?.slice(0, 5) || [];  
        wordData.antonyms = entry.meanings?.[0]?.antonyms?.slice(0, 5) || [];  
          
        // Lấy nhiều example sentences từ definitions  
        wordData.exampleSentences = entry.meanings?.[0]?.definitions  
          ?.filter(def => def.example)  
          ?.map(def => def.example)  
          ?.slice(0, 3) || [];  
          
        // Lấy ví dụ từ definition đầu tiên  
        wordData.example = entry.meanings?.[0]?.definitions?.[0]?.example || '';  
          
        // Lấy tất cả nghĩa từ các meanings khác nhau  
        const allMeanings = [];  
        entry.meanings?.forEach(meaning => {  
          meaning.definitions?.slice(0, 2).forEach(def => {  
            allMeanings.push(`(${translatePartOfSpeech(meaning.partOfSpeech)}) ${def.definition}`);  
          });  
        });  
          
        // Dịch từ đơn giản trước (ưu tiên)  
        wordData.meaning = await translateToVietnamese(term);  
          
        // Dịch các nghĩa chi tiết nếu cần  
        if (allMeanings.length > 0) {  
          wordData.additionalMeanings = await Promise.all(  
            allMeanings.map(meaning => translateToVietnamese(meaning))  
          );  
        }  
      } else {  
        // Nếu không tìm thấy trong dictionary, chỉ dịch từ đó  
        wordData.meaning = await translateToVietnamese(term);  
      }  
  
      setSelectedWord(wordData);  
      addToHistory(wordData);  
        
    } catch (error) {  
      console.error('Lỗi khi tìm kiếm:', error);  
      setSelectedWord({  
        word: term,  
        phonetic: '',  
        meaning: 'Lỗi khi tìm kiếm từ này',  
        partOfSpeech: 'từ',  
        example: '',  
        synonyms: [],  
        antonyms: [],  
        exampleSentences: [],  
        additionalMeanings: []  
      });  
    }  
      
    setLoading(false);  
  };  
  
  // Function dịch sang tiếng Việt  
  const translateToVietnamese = async (text) => {  
    try {  
      const response = await fetch(  
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`  
      );  
      const data = await response.json();  
      return data[0][0][0];  
    } catch (error) {  
      console.error('Translation error:', error);  
      return 'Không thể dịch sang tiếng Việt';  
    }  
  };  
  
  const translatePartOfSpeech = (pos) => {  
    const translations = {  
      'noun': 'danh từ',  
      'verb': 'động từ',  
      'adjective': 'tính từ',  
      'adverb': 'trạng từ',  
      'pronoun': 'đại từ',  
      'preposition': 'giới từ',  
      'conjunction': 'liên từ',  
      'interjection': 'thán từ'  
    };  
    return translations[pos] || pos || 'từ';  
  };  
  
  const addToHistory = (word) => {  
    setSearchHistory(prev => {  
      const filtered = prev.filter(item => item.word !== word.word);  
      return [word, ...filtered].slice(0, 10);  
    });  
  };  
  
  const clearHistory = () => {  
    setSearchHistory([]);  
  };  
  
  const removeFromHistory = (wordToRemove) => {  
    setSearchHistory(prev => prev.filter(item => item.word !== wordToRemove));  
  };  
  
  const handleSpeak = (word) => {  
    if ('speechSynthesis' in window) {  
      const utterance = new SpeechSynthesisUtterance(word);  
      utterance.lang = 'en-US';  
      utterance.rate = 0.8;  
      utterance.pitch = 1;  
      speechSynthesis.speak(utterance);  
    }  
  };  
  
  const clearSearch = () => {  
    setSearchTerm('');  
    setSelectedWord(null);  
    searchInputRef.current?.focus();  
  };  
  
  const handleKeyPress = (e) => {  
    if (e.key === 'Enter') {  
      handleSearch(searchTerm);  
    }  
  };  
  
  const handleSynonymClick = (synonym) => {  
    setSearchTerm(synonym);  
    handleSearch(synonym);  
  };  
  
  return (  
    <div   
      className="dictionary-page"  
      style={{  
        backgroundImage: "url('/images/background.jpg')",  
        backgroundSize: 'cover',  
        backgroundPosition: 'center',  
        backgroundRepeat: 'no-repeat',  
        backgroundAttachment: 'fixed'  
      }}  
    >  
      <div className="dictionary-container">  
        <div className="dictionary-header">  
          <img className="logo-h" src="/logo.jpg" alt="Logo" />  
          <h1>Từ điển Anh-Việt</h1>  
          <p>Tra cứu từ vựng tiếng Anh với nghĩa tiếng Việt</p>  
        </div>  
  
        <div className="search-container">  
          <div className="search-input-wrapper">  
            <input  
              ref={searchInputRef}  
              type="text"  
              className="search-input"  
              placeholder="Nhập từ tiếng Anh cần tra..."  
              value={searchTerm}  
              onChange={(e) => setSearchTerm(e.target.value)}  
              onKeyPress={handleKeyPress}  
            />  
            {searchTerm && (  
              <button className="clear-button" onClick={clearSearch}>  
                ✕  
              </button>  
            )}  
            <button   
              className="search-button"   
              onClick={() => handleSearch(searchTerm)}  
              disabled={loading}  
            >  
              {loading ? '⏳' : '🔍'}  
            </button>  
          </div>  
        </div>  
  
        {loading && (  
          <div className="loading-container">  
            <div className="loading-spinner">🔄</div>  
            <p>Đang tìm kiếm và dịch...</p>  
          </div>  
        )}  
  
        {selectedWord && !loading && (  
          <div className="word-result">  
            <div className="word-header">  
              <div className="word-main">  
                <h2 className="word-title">{selectedWord.word}</h2>  
                <div className="word-details">  
                  {selectedWord.phonetic && (  
                    <span className="word-phonetic">{selectedWord.phonetic}</span>  
                  )}  
                  <span className="word-part-of-speech">({selectedWord.partOfSpeech})</span>  
                </div>  
              </div>  
              <button   
                className="speak-button"  
                onClick={() => handleSpeak(selectedWord.word)}  
                aria-label="Nghe phát âm"  
                title="Nghe phát âm"  
              >  
                <img src="/Speaker.jpg" alt="Nghe phát âm" className="speaker-icon" />  
              </button>  
            </div>  
  
            <div className="word-content">  
              <div className="word-meaning">  
                <h3>Nghĩa tiếng Việt:</h3>  
                <p className="meaning-text primary-meaning">{selectedWord.meaning}</p>  
                  
                {/* Hiển thị các nghĩa bổ sung nếu có */}  
                {selectedWord.additionalMeanings && selectedWord.additionalMeanings.length > 0 && (  
                  <div className="additional-meanings">  
                    <h4>Các nghĩa khác:</h4>  
                    <ul className="meanings-list">  
                      {selectedWord.additionalMeanings.map((meaning, index) => (  
                        <li key={index} className="meaning-item">{meaning}</li>  
                      ))}  
                    </ul>  
                  </div>  
                )}  
              </div>  
  
              {/* Mẫu câu áp dụng */}  
              {selectedWord.exampleSentences && selectedWord.exampleSentences.length > 0 && (  
                <div className="example-sentences">  
                  <h3>Mẫu câu áp dụng:</h3>  
                  <ul className="sentences-list">  
                    {selectedWord.exampleSentences.map((sentence, index) => (  
                      <li key={index} className="sentence-item">  
                        <span className="sentence-text">"{sentence}"</span>  
                        <button   
                          className="sentence-speak-btn"  
                          onClick={() => handleSpeak(sentence)}  
                          title="Nghe phát âm câu"  
                        >  
                          🔊  
                        </button>  
                      </li>  
                    ))}  
                  </ul>  
                </div>  
              )}  
  
              {selectedWord.example && (  
                <div className="word-example">  
                  <h3>Ví dụ:</h3>  
                  <p className="example-text">"{selectedWord.example}"</p>  
                </div>  
              )}  
  
              {/* Từ đồng nghĩa */}  
              {selectedWord.synonyms && selectedWord.synonyms.length > 0 && (  
                <div className="word-synonyms">  
                  <h3>Từ đồng nghĩa:</h3>  
                  <div className="synonyms-list">  
                    {selectedWord.synonyms.map((synonym, index) => (  
                      <span   
                        key={index}   
                        className="synonym-item"  
                        onClick={() => handleSynonymClick(synonym)}  
                        title={`Tra từ "${synonym}"`}  
                      >  
                        {synonym}  
                      </span>  
                    ))}  
                  </div>  
                </div>  
              )}  
  
              {/* Từ trái nghĩa */}  
              {selectedWord.antonyms && selectedWord.antonyms.length > 0 && (  
                <div className="word-antonyms">  
                  <h3>Từ trái nghĩa:</h3>  
                  <div className="antonyms-list">  
                    {selectedWord.antonyms.map((antonym, index) => (  
                      <span   
                        key={index}   
                        className="antonym-item"  
                        onClick={() => handleSynonymClick(antonym)}  
                        title={`Tra từ "${antonym}"`}  
                      >  
                        {antonym}  
                      </span>  
                    ))}  
                  </div>  
                </div>  
              )}  
            </div>  
          </div>  
        )}  
  
        {/* Lịch sử tìm kiếm với nút xóa */}  
        {searchHistory.length > 0 && !selectedWord && (  
          <div className="search-history">  
            <div className="history-header">  
              <h3>Lịch sử tìm kiếm</h3>  
              <button className="clear-history-btn" onClick={clearHistory}>  
                🗑️ Xóa tất cả  
              </button>  
            </div>  
            <div className="history-items">  
              {searchHistory.map((item, index) => (  
                <div key={index} className="history-item">  
                  <div   
                    className="history-content"  
                    onClick={() => {  
                      setSearchTerm(item.word);  
                      setSelectedWord(item);  
                    }}  
                  >  
                    <span className="history-word">{item.word}</span>  
                    <span className="history-meaning">{item.meaning}</span>  
                  </div>  
                  <button   
                    className="remove-history-btn"  
                    onClick={(e) => {  
                      e.stopPropagation();  
                      removeFromHistory(item.word);  
                    }}  
                    title="Xóa khỏi lịch sử"  
                  >  
                    ✕  
                  </button>  
                </div>  
              ))}  
            </div>  
          </div>  
        )}  
      </div>  
    </div>  
  );  
}  
  
export default DictionaryPage;