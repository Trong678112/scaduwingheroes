// src/pages/GuidePage.jsx  
import React, { useState } from 'react';  
import './GuidePage.css';  
  
function GuidePage() {  
    const [currentPage, setCurrentPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(10);  
    const [zoom, setZoom] = useState(100);  
    const [isFullscreen, setIsFullscreen] = useState(false);  
  
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
  
    return (  
        <div className={`pdf-viewer ${isFullscreen ? 'fullscreen' : ''}`}>  
            {/* Header */}  
            <div className="pdf-header">  
                <div className="header-left">  
                    <h1>📖 Hướng dẫn cách chơi</h1>  
                    <span className="document-info">Scaduwing Heroes</span>  
                </div>  
                  
                {/* Controls */}  
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
                        <a   
                            href="/guide.pdf"   
                            download  
                            className="control-btn download-btn"  
                            title="Tải xuống"  
                        >  
                            ⬇  
                        </a>  
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