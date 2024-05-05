// Generate random keys
const SIZE = 26; // Modulus (alphabet size)

function gcd(a, b) {
    // https://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor
    if (b === 0) return a;
    else return gcd(b, a % b);
}

function modInverse(a, m) {
    // https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/
    a = a % m;

    for (let x = 1; x < m; x++) {
        if ((a * x) % m == 1) return x;
    }

    return 1;
}

function checkPrime(n) {
    // https://stackoverflow.com/a/55435283
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    let i = 5;

    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
        i += 6;
    }

    return true;
}

function generateKeys() {
    let a = Math.floor(Math.random() * SIZE);
    while (!checkPrime(a) || gcd(a, SIZE) !== 1) {
        a = Math.floor(Math.random() * SIZE);
    }

    let b = Math.floor(Math.random() * SIZE);
    return [a, b];
}

function affineEncrypt(plainText) {
    const [a, b] = generateKeys();

    let cipherText = "";

    for (let i = 0; i < plainText.length; i++) {
        let charCode = plainText.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // A-Z
            cipherText += String.fromCharCode(
                ((a * (charCode - 65) + b) % SIZE) + 65
            );
        } else if (charCode >= 97 && charCode <= 122) {
            // a-z
            cipherText += String.fromCharCode(
                ((a * (charCode - 97) + b) % SIZE) + 97
            );
        } else {
            cipherText += plainText[i];
        }
    }

    return `${a}-|-${b}-|-${cipherText}`;
}

function affineDecrypt(cipherText) {
    let plainText = "";

    const [a, b, text] = cipherText.split("-|-");

    let a_inv = modInverse(a, SIZE);

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // A-Z
            plainText += String.fromCharCode(
                ((a_inv * (charCode - 65 - b + SIZE)) % SIZE) + 65
            );
        } else if (charCode >= 97 && charCode <= 122) {
            // a-z
            plainText += String.fromCharCode(
                ((a_inv * (charCode - 97 - b + SIZE)) % SIZE) + 97
            );
        } else {
            plainText += text[i];
        }
    }

    return plainText;
}

module.exports = { affineEncrypt, affineDecrypt };
