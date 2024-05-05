// Generate random keys
const SIZE = 26; // Modulus (alphabet size)

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

function modInverse(a, m) {
    return gcd(a, m) === 1 ? m - ((m / a) | 0) * (a % m) : 0;
}

function generateKeys() {
    const a = Math.floor(Math.random() * (SIZE - 1)) + 1;
    const b = Math.floor(Math.random() * SIZE);
    return [a, b];
}

function affineEncrypt(plainText) {
    const [a, b] = generateKeys();
    let cipherText = "";

    for (let i = 0; i < plainText.length; i++) {
        let charCode = plainText.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // A-Z
            cipherText += String.fromCharCode(((a * charCode + b) % SIZE) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // a-z
            cipherText += String.fromCharCode(((a * charCode + b) % SIZE) + 97);
        }
    }

    return `${a}|${b}|${cipherText}`;
}

function affineDecrypt(cipherText) {
    const [a, b] = generateKeys();
    let plainText = "";

    for (let i = 0; i < cipherText.length; i++) {
        let charCode = cipherText.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // A-Z
            plainText += String.fromCharCode(
                ((modInverse(a, SIZE) * (charCode - 65 - b)) % SIZE) + 65
            );
        } else if (charCode >= 97 && charCode <= 122) {
            // a-z
            plainText += String.fromCharCode(
                ((modInverse(a, SIZE) * (charCode - 97 - b)) % SIZE) + 97
            );
        }
    }

    return plainText;
}

module.exports = { affineEncrypt, affineDecrypt };
