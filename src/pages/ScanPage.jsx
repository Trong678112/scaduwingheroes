// src/pages/ScanPage.jsx  
import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { Html5QrcodeScanner } from 'html5-qrcode';  
import './ScanPage.css';  
  
function ScanPage() {  
    const navigate = useNavigate();  
    const [isScanning, setIsScanning] = useState(false);  
    const [scanStatus, setScanStatus] = useState('');  
  
    useEffect(() => {  
        let scanner;  
        setIsScanning(true);  
        setScanStatus('Đang khởi tạo camera...');  
  
        function onScanSuccess(decodedText) {  
            console.log(`Kết quả quét: ${decodedText}`);  
            setScanStatus('Quét thành công! Đang chuyển hướng...');  
              
            // Dừng việc quét sau khi thành công  
            scanner.clear();  
            setIsScanning(false);  
  
            try {  
                const url = new URL(decodedText);  
                const path = url.pathname;  
  
                if (path.startsWith('/card/')) {  
                    navigate(path);  
                } else {  
                    setScanStatus('Mã QR không hợp lệ!');  
                    setTimeout(() => {  
                        setScanStatus('Sẵn sàng quét mã QR');  
                        restartScanner();  
                    }, 2000);  
                }  
            } catch (error) {  
                console.error("URL không hợp lệ trong mã QR", error);  
                setScanStatus('Mã QR không chứa URL hợp lệ!');  
                setTimeout(() => {  
                    setScanStatus('Sẵn sàng quét mã QR');  
                    restartScanner();  
                }, 2000);  
            }  
        }  
  
        function onScanError() {  
            // Bỏ qua lỗi quét thông thường  
        }  
  
        function restartScanner() {  
            if (scanner) {  
                scanner.clear().then(() => {  
                    initScanner();  
                });  
            } else {  
                initScanner();  
            }  
        }  
  
        function initScanner() {  
            scanner = new Html5QrcodeScanner(  
                'qr-reader',  
                {  
                    fps: 10,  
                    qrbox: { width: 280, height: 280 }, // Tăng kích thước khung quét  
                    videoConstraints: {  
                        facingMode: { ideal: "environment" } // Camera sau  
                    },  
                    showTorchButtonIfSupported: true,  
                    showZoomSliderIfSupported: false,  
                    defaultZoomValueIfSupported: 2,  
                    rememberLastUsedCamera: true  
                },  
                false  
            );  
  
            scanner.render(onScanSuccess, onScanError);  
            setScanStatus('Sẵn sàng quét mã QR');  
        }  
  
        initScanner();  
  
        return () => {  
            if (scanner) {  
                scanner.clear().catch(error => {  
                    console.error("Lỗi khi dọn dẹp scanner.", error);  
                });  
            }  
        };  
    }, [navigate]);  
  
    const handleManualRestart = () => {  
        setScanStatus('Đang khởi động lại camera...');  
        setIsScanning(true);  
        window.location.reload(); // Restart toàn bộ component  
    };  
  
    return (  
        <div className="scan-page-container">  
            <div className="scan-header">  
                <h1 className="scan-title">📱 Quét Mã QR</h1>  
                <p className="scan-subtitle">Đặt mã QR của thẻ bài vào trong khung vuông bên dưới</p>  
                <div className="scan-status">  
                    <span className={`status-text ${isScanning ? 'scanning' : 'ready'}`}>  
                        {scanStatus}  
                    </span>  
                </div>  
            </div>  
  
            <div className="qr-scanner-wrapper">  
                <div className="scanner-frame">  
                    <div id="qr-reader"></div>  
                    <div className="scanner-overlay">  
                        <div className="scan-corners">  
                            <div className="corner top-left"></div>  
                            <div className="corner top-right"></div>  
                            <div className="corner bottom-left"></div>  
                            <div className="corner bottom-right"></div>  
                        </div>  
                    </div>  
                </div>  
            </div>  
  
            <div className="scan-controls">  
                <button   
                    className="control-button restart-btn"  
                    onClick={handleManualRestart}  
                    title="Khởi động lại camera"  
                >  
                    🔄 Khởi động lại  
                </button>  
                <button   
                    className="control-button back-btn"  
                    onClick={() => navigate('/')}  
                    title="Quay về trang chủ"  
                >  
                    🏠 Trang chủ  
                </button>  
            </div>  
  
            <div className="scan-instructions">  
                <div className="instruction-item">  
                    <span className="instruction-icon">📷</span>  
                    <span>Cho phép truy cập camera khi được yêu cầu</span>  
                </div>  
                <div className="instruction-item">  
                    <span className="instruction-icon">🎯</span>  
                    <span>Đặt mã QR vào giữa khung vuông</span>  
                </div>  
                <div className="instruction-item">  
                    <span className="instruction-icon">💡</span>  
                    <span>Đảm bảo ánh sáng đủ và mã QR rõ nét</span>  
                </div>  
            </div>  
        </div>  
    );  
}  
  
export default ScanPage;