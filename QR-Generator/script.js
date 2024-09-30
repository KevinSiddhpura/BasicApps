function handleInputs() {
    const type = document.getElementById('qr-type').value;

    document.getElementById('url-input').style.display = 'none';
    document.getElementById('contact-input').style.display = 'none';
    document.getElementById('location-input').style.display = 'none';

    if (type === 'url') {
        document.getElementById('url-input').style.display = 'block';
    } else if (type === 'contact') {
        document.getElementById('contact-input').style.display = 'block';
    } else if (type === 'location') {
        document.getElementById('location-input').style.display = 'block';
    }
}

function generateQRCode() {
    alert('QR Code generated successfully! \n You can code this now :) \nGood luck!');
}