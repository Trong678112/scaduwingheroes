import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

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

    // Khởi tạo máy quét
    scanner = new Html5QrcodeScanner(
      'qr-reader', // id của thẻ div bên dưới
      { 
        fps: 10, // Khung hình/giây
        qrbox: { width: 250, height: 250 } // Kích thước khung quét
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
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Quét Mã QR Trên Thẻ Bài</h1>
      <div id="qr-reader" style={{ width: '500px', margin: '0 auto' }}></div>
      <p>Đặt mã QR của thẻ vào trong khung hình</p>
    </div>
  );
}

export default ScanPage;