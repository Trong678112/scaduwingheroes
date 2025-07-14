// src/pages/GuidePage.jsx  
import React, { useState } from 'react';  
import './GuidePage.css';  
  
function GuidePage() {  
    const [showPDF, setShowPDF] = useState(false);  
    const [currentPage, setCurrentPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(10);  
    const [zoom, setZoom] = useState(100);  
    const [isFullscreen, setIsFullscreen] = useState(false);  
  
    // Các function điều khiển PDF  
    const nextPage = () => {  
        if (currentPage < totalPages) {  
            setCurrentPage(currentPage + 1);  
        }  
    };  
  
    const prevPage = () => {  
        if (currentPage > 1) {  
            setCurrentPage(currentPage - 1);  
        }  
    };  
  
    const handleZoomIn = () => {  
        if (zoom < 200) setZoom(zoom + 25);  
    };  
  
    const handleZoomOut = () => {  
        if (zoom > 50) setZoom(zoom - 25);  
    };  
  
    const resetZoom = () => {  
        setZoom(100);  
    };  
  
    const handlePageInput = (e) => {  
        const page = parseInt(e.target.value);  
        if (page >= 1 && page <= totalPages) {  
            setCurrentPage(page);  
        }  
    };  
  
    const toggleFullscreen = () => {  
        setIsFullscreen(!isFullscreen);  
    };  
  
    const goToFirstPage = () => {  
        setCurrentPage(1);  
    };  
  
    const goToLastPage = () => {  
        setCurrentPage(totalPages);  
    };  
  
    // Nếu chưa click vào ô hướng dẫn, hiển thị menu chính  
    if (!showPDF) {  
        return (  
            <div className="guide-menu">  
                <h1>📚 Trung tâm hướng dẫn</h1>  
                <div className="guide-cards">  
                    <div   
                        className="guide-card active"  
                        onClick={() => setShowPDF(true)}  
                    >  
                        <div className="card-icon">🎴</div>  
                        <h3>Hướng dẫn chơi bộ bài trò chơi từ vựng</h3>  
                        <p>Ngữ thành ngôn hợp</p>  
                        <span className="card-status">Có sẵn</span>  
                    </div>  
                      
                    <div className="guide-card coming-soon">  
                        <div className="card-icon">🚧</div>  
                        <h3>Hướng dẫn nâng cao</h3>  
                        <p>Các tính năng mới</p>  
                        <span className="card-status">Coming Soon</span>  
                    </div>  
                </div>  
            </div>  
        );  
    }  
  
    // Nếu đã click, hiển thị PDF viewer (không có nút download)  
    return (  
        <div className={`pdf-viewer ${isFullscreen ? 'fullscreen' : ''}`}>  
            {/* Header với nút quay lại */}  
            <div className="pdf-header">  
                <div className="header-left">  
                    <button   
                        className="back-btn"  
                        onClick={() => setShowPDF(false)}  
                        title="Quay lại menu"  
                    >  
                        ← Quay lại  
                    </button>  
                    <div className="header-info">  
                        <h1>📖 Hướng dẫn cách chơi</h1>  
                        <span className="document-info">Scaduwing Heroes</span>  
                    </div>  
                </div>  
                  
                {/* Controls (đã loại bỏ nút download) */}  
                <div className="pdf-controls">  
                    <div className="page-controls">  
                        <button   
                            onClick={goToFirstPage}   
                            disabled={currentPage <= 1}  
                            className="control-btn"  
                            title="Trang đầu"  
                        >  
                            ⏮  
                        </button>  
                        <button   
                            onClick={prevPage}   
                            disabled={currentPage <= 1}  
                            className="control-btn"  
                            title="Trang trước"  
                        >  
                            ◀  
                        </button>  
                          
                        <div className="page-input-group">  
                            <input   
                                type="number"   
                                value={currentPage}  
                                onChange={handlePageInput}  
                                min="1"   
                                max={totalPages}  
                                className="page-input"  
                            />  
                            <span className="page-total">/ {totalPages}</span>  
                        </div>  
                          
                        <button   
                            onClick={nextPage}   
                            disabled={currentPage >= totalPages}  
                            className="control-btn"  
                            title="Trang sau"  
                        >  
                            ▶  
                        </button>  
                        <button   
                            onClick={goToLastPage}   
                            disabled={currentPage >= totalPages}  
                            className="control-btn"  
                            title="Trang cuối"  
                        >  
                            ⏭  
                        </button>  
                    </div>  
                      
                    <div className="zoom-controls">  
                        <button   
                            onClick={handleZoomOut}   
                            className="control-btn"  
                            title="Thu nhỏ"  
                        >  
                            −  
                        </button>  
                        <button   
                            onClick={resetZoom}   
                            className="zoom-display"  
                            title="Reset zoom"  
                        >  
                            {zoom}%  
                        </button>  
                        <button   
                            onClick={handleZoomIn}   
                            className="control-btn"  
                            title="Phóng to"  
                        >  
                            +  
                        </button>  
                    </div>  
  
                    <div className="view-controls">  
                        <button   
                            onClick={toggleFullscreen}   
                            className="control-btn"  
                            title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}  
                        >  
                            {isFullscreen ? '⛶' : '⛶'}  
                        </button>  
                        {/* Đã loại bỏ nút download */}  
                    </div>  
                </div>  
            </div>  
  
            {/* PDF Content */}  
            <div className="pdf-content">  
                <div className="pdf-container">  
                    <iframe   
                        key={`${currentPage}-${zoom}`}  
                        src={`/guide.pdf#page=${currentPage}&zoom=${zoom}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}  
                        className="pdf-frame"  
                        title={`Trang ${currentPage}`}  
                    />  
                </div>  
            </div>  
  
            {/* Status Bar */}  
            <div className="pdf-status">  
                <div className="status-left">  
                    <span>Trang {currentPage} / {totalPages}</span>  
                    <span className="separator">•</span>  
                    <span>Zoom: {zoom}%</span>  
                </div>  
                <div className="status-right">  
                    <span>&copy; {new Date().getFullYear()} T2N Team</span>  
                </div>  
            </div>  
        </div>  
    );  
}  
  
export default GuidePage;