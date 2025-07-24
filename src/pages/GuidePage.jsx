import React, { useState } from 'react';  
import { Document, Page, pdfjs } from 'react-pdf';  
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';  
import 'react-pdf/dist/esm/Page/TextLayer.css';  
import './GuidePage.css';  
  
// Configure PDF.js worker  
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;  
  
function GuidePage() {  
    const [showPDF, setShowPDF] = useState(false);  
    const [numPages, setNumPages] = useState(null);  
    const [pageNumber, setPageNumber] = useState(1);  
    const [scale, setScale] = useState(1.0);  
    const [isFullscreen, setIsFullscreen] = useState(false);  
  
    function onDocumentLoadSuccess({ numPages }) {  
        setNumPages(numPages);  
    }  
  
    const nextPage = () => {  
        if (pageNumber < numPages) {  
            setPageNumber(pageNumber + 1);  
        }  
    };  
  
    const prevPage = () => {  
        if (pageNumber > 1) {  
            setPageNumber(pageNumber - 1);  
        }  
    };  
  
    const zoomIn = () => {  
        setScale(scale + 0.2);  
    };  
  
    const zoomOut = () => {  
        if (scale > 0.4) {  
            setScale(scale - 0.2);  
        }  
    };  
  
    const toggleFullscreen = () => {  
        setIsFullscreen(!isFullscreen);  
    };  
  
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
  
    return (  
        <div className={`pdf-viewer ${isFullscreen ? 'fullscreen' : ''}`}>  
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
                  
                <div className="pdf-controls">  
                    <div className="page-controls">  
                        <button   
                            onClick={() => setPageNumber(1)}  
                            disabled={pageNumber <= 1}  
                            className="control-btn"  
                            title="Trang đầu"  
                        >  
                            ⏮  
                        </button>  
                        <button   
                            onClick={prevPage}  
                            disabled={pageNumber <= 1}  
                            className="control-btn"  
                            title="Trang trước"  
                        >  
                            ◀  
                        </button>  
                          
                        <div className="page-input-group">  
                            <input   
                                type="number"  
                                value={pageNumber}  
                                onChange={(e) => setPageNumber(Number(e.target.value))}  
                                min="1"  
                                max={numPages}  
                                className="page-input"  
                            />  
                            <span className="page-total">/ {numPages}</span>  
                        </div>  
                          
                        <button   
                            onClick={nextPage}  
                            disabled={pageNumber >= numPages}  
                            className="control-btn"  
                            title="Trang sau"  
                        >  
                            ▶  
                        </button>  
                        <button   
                            onClick={() => setPageNumber(numPages)}  
                            disabled={pageNumber >= numPages}  
                            className="control-btn"  
                            title="Trang cuối"  
                        >  
                            ⏭  
                        </button>  
                    </div>  
                      
                    <div className="zoom-controls">  
                        <button   
                            onClick={zoomOut}  
                            className="control-btn"  
                            title="Thu nhỏ"  
                        >  
                            −  
                        </button>  
                        <button   
                            onClick={() => setScale(1.0)}  
                            className="zoom-display"  
                            title="Reset zoom"  
                        >  
                            {Math.round(scale * 100)}%  
                        </button>  
                        <button   
                            onClick={zoomIn}  
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
                            ⛶  
                        </button>  
                    </div>  
                </div>  
            </div>  
  
            <div className="pdf-content">  
                <div className="pdf-container">  
                    <Document  
                        file="/guide.pdf"  
                        onLoadSuccess={onDocumentLoadSuccess}  
                        loading={<div className="pdf-loading">Đang tải...</div>}  
                        error={<div className="pdf-error">Không thể tải PDF</div>}  
                    >  
                        <Page   
                            pageNumber={pageNumber}   
                            scale={scale}  
                            renderTextLayer={false}  
                            renderAnnotationLayer={false}  
                        />  
                    </Document>  
                </div>  
            </div>  
  
            <div className="pdf-status">  
                <div className="status-left">  
                    <span>Trang {pageNumber} / {numPages}</span>  
                    <span className="separator">•</span>  
                    <span>Zoom: {Math.round(scale * 100)}%</span>  
                </div>  
                <div className="status-right">  
                    <span>&copy; {new Date().getFullYear()} T2N Team</span>  
                </div>  
            </div>  
        </div>  
    );  
}  
  
export default GuidePage;