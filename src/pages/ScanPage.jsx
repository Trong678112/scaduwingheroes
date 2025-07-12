import React, { useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';  
import { Html5QrcodeScanner } from 'html5-qrcode';  
import './ScanPage.css';  
  
function ScanPage() {  
  const navigate = useNavigate();  
  
  useEffect(() => {  
    let scanner;  
  
    function onScanSuccess(decodedText) {  
      console.log(`Scan result: ${decodedText}`);  
        
      // Dừng việc quét sau khi thành công  
      scanner.clear();  
  
      try {  
        // decodedText là URL đầy đủ, ví dụ: "http://localhost:5173/card/en-002"  
        const url = new URL(decodedText);  
        // Lấy phần đường dẫn của URL, ví dụ: "/card/en-002"  
        const path = url.pathname;  
  
        // Kiểm tra xem có phải là đường dẫn thẻ bài hợp lệ không  
        if (path.startsWith('/card/')) {  
          navigate(path); // Chuyển hướng đến trang thẻ bài  
        } else {  
            alert('Mã QR không hợp lệ!');  
        }  
      } catch (error) {  
        console.error("Invalid URL in QR Code", error);  
        alert('Mã QR không chứa một URL hợp lệ!');  
      }  
    }  
  
    function onScanError() {  
      // Bỏ qua lỗi, không cần làm gì cả  
    }  
  
    // Khởi tạo máy quét với camera constraints  
    scanner = new Html5QrcodeScanner(  
      'qr-reader',  
      {   
        fps: 10,  
        qrbox: { width: 250, height: 250 },  
        // Cấu hình camera tự động - ưu tiên camera sau trên mobile  
        videoConstraints: {  
          facingMode: { ideal: "environment" }  
        },  
        // Tắt camera selection UI  
        showTorchButtonIfSupported: true,  
        showZoomSliderIfSupported: false,  
        defaultZoomValueIfSupported: 2  
      },  
      false // verbose = false  
    );  
  
    // Bắt đầu render máy quét  
    scanner.render(onScanSuccess, onScanError);  
  
    // Hàm dọn dẹp: sẽ chạy khi component bị hủy (rời khỏi trang)  
    return () => {  
      if (scanner) {  
        scanner.clear().catch(error => {  
          console.error("Failed to clear html5-qrcode-scanner.", error);  
        });  
      }  
    };  
  }, [navigate]);  
  
  return (  
    <div className="scan-page-container">  
      <div className="scan-header">  
        <h1 className="scan-title">Quét Mã QR</h1>  
        <p className="scan-subtitle">Đặt mã QR của thẻ vào trong khung hình</p>  
      </div>  
      <div className="qr-scanner-wrapper">  
        <div id="qr-reader"></div>  
      </div>  
    </div>  
  );  
}  
  
export default ScanPage;