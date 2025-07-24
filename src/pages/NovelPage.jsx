import React, { useState } from 'react';  
import { useParams } from 'react-router-dom';  
import { Document, Page, pdfjs } from 'react-pdf';  
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';  
import 'react-pdf/dist/esm/Page/TextLayer.css';  
import './NovelPage.css';  
  
// Configure PDF.js worker  
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;  
  
function NovelPage() {  
    const { novelId } = useParams();  
    const [showPDF, setShowPDF] = useState(false);  
    const [numPages, setNumPages] = useState(null);  
    const [pageNumber, setPageNumber] = useState(1);  
    const [scale, setScale] = useState(1.0);  
  
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
  
    if (!showPDF) {  
        return (  
            <div className="guide-menu">  
                <h1>📚 Tiểu Thuyết Ánh Sáng / Light Novel</h1>  
                <div className="guide-cards">  
                    <div   
                        className="guide-card active"  
                        onClick={() => setShowPDF(true)}  
                    >  
                        <div className="card-icon">📖</div>  
                        <h3>Thế Giới Ngôn Thuật</h3>  
                        <p>Tác giả : Pleiades</p>  
                        <span className="card-status">Xem</span>  
                    </div>  
                </div>  
            </div>  
        );  
    }  
  
    return (  
        <div className="pdf-viewer">  
            <div className="pdf-header">  
                <div className="header-left">  
                    <button   
                        className="back-btn"  
                        onClick={() => setShowPDF(false)}  
                    >  
                        ← Quay lại  
                    </button>  
                    <div className="header-info">  
                        <h1>📖 Thế Giới Ngôn Thuật</h1>  
                        <span className="document-info">Light Novel Fantasy</span>  
                    </div>  
                </div>  
                  
                <div className="pdf-controls">  
                    <div className="page-controls">  
                        <button   
                            onClick={() => setPageNumber(1)}  
                            disabled={pageNumber <= 1}  
                            className="control-btn"  
                        >  
                            ⏮  
                        </button>  
                        <button   
                            onClick={prevPage}  
                            disabled={pageNumber <= 1}  
                            className="control-btn"  
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
                        >  
                            ▶  
                        </button>  
                        <button   
                            onClick={() => setPageNumber(numPages)}  
                            disabled={pageNumber >= numPages}  
                            className="control-btn"  
                        >  
                            ⏭  
                        </button>  
                    </div>  
                      
                    <div className="zoom-controls">  
                        <button onClick={zoomOut} className="control-btn">−</button>  
                        <button onClick={() => setScale(1.0)} className="zoom-display">  
                            {Math.round(scale * 100)}%  
                        </button>  
                        <button onClick={zoomIn} className="control-btn">+</button>  
                    </div>  
                </div>  
            </div>  
  
            <div className="pdf-content">  
                <div className="pdf-container">  
                    <Document  
                        file={`/novels/${novelId}.pdf`}  
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
  
export default NovelPage;