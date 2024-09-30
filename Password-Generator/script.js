document.querySelector('.gen-password').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('cb-uc').checked;
    const includeLowercase = document.getElementById('cb-lc').checked;
    const includeSpecialChars = document.getElementById('cb-sc').checked;

    if (!includeUppercase && !includeLowercase && !includeSpecialChars) {
        alert('Please select at least one character set');
        return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charSet = '';
    if (includeUppercase) charSet += uppercaseChars;
    if (includeLowercase) charSet += lowercaseChars;
    if (includeSpecialChars) charSet += specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    document.getElementById('password').value = password;
});

document.querySelector('.copy-password').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
});