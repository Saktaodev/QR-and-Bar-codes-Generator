document.getElementById('generateBtn').addEventListener('click', function() {
    const codeType = document.getElementById('codeType').value;
    const codeData = document.getElementById('codeData').value;
    const codeResult = document.getElementById('codeResult');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Limpiar el resultado anterior
    codeResult.innerHTML = '';
    downloadBtn.style.display = 'none';

    if (codeType === 'qr') {
        const size = document.getElementById('qrSize').value;
        const color = document.getElementById('qrColor').value;
        const bgColor = document.getElementById('qrBgColor').value;
        
        // Generar Código QR
        const qrCode = new QRCode(codeResult, {
            text: codeData,
            width: size,
            height: size,
            colorDark: color,
            colorLight: bgColor
        });

        setTimeout(() => {
            const qrCanvas = codeResult.querySelector('canvas');
            if (qrCanvas) {
                const qrDataUrl = qrCanvas.toDataURL('image/png');
                downloadBtn.href = qrDataUrl;
                downloadBtn.download = 'qr_code.png';
                downloadBtn.style.display = 'block';
            }
        }, 500);
    } else if (codeType === 'barcode') {
        const format = document.getElementById('barcodeFormat').value;
        const width = document.getElementById('barcodeWidth').value;
        const height = document.getElementById('barcodeHeight').value;
        
        // Generar Código de Barras
        const barcode = document.createElement('img');
        JsBarcode(barcode, codeData, {
            format: format,
            width: width,
            height: height,
            displayValue: true
        });
        codeResult.appendChild(barcode);

        setTimeout(() => {
            const barcodeImg = codeResult.querySelector('img');
            if (barcodeImg) {
                const barcodeCanvas = document.createElement('canvas');
                const ctx = barcodeCanvas.getContext('2d');
                barcodeCanvas.width = barcodeImg.width;
                barcodeCanvas.height = barcodeImg.height;
                ctx.drawImage(barcodeImg, 0, 0);
                const barcodeDataUrl = barcodeCanvas.toDataURL('image/png');
                downloadBtn.href = barcodeDataUrl;
                downloadBtn.download = 'barcode.png';
                downloadBtn.style.display = 'block';
            }
        }, 500);
    }
});

document.getElementById('codeType').addEventListener('change', function() {
    const codeType = this.value;
    const qrOptions = document.getElementById('qrOptions');
    const barcodeOptions = document.getElementById('barcodeOptions');

    if (codeType === 'qr') {
        qrOptions.style.display = 'block';
        barcodeOptions.style.display = 'none';
    } else if (codeType === 'barcode') {
        qrOptions.style.display = 'none';
        barcodeOptions.style.display = 'block';
    }
});
