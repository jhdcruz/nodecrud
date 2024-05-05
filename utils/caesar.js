function generateShiftKey() {
    return Math.floor(Math.random() * 25) + 1;
}
function caesarEncrypt(text) {
    const shift = generateShiftKey();
    const cipher = text
        .split("")
        .map((char) => {
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) {
                // Uppercase letters
                return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            } else if (charCode >= 97 && charCode <= 122) {
                // Lowercase letters
                return String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
            } else {
                // Non-alphabetic characters
                return char;
            }
        })
        .join("");

    return `${cipher}~|~${shift}`;
}

function caesarDecrypt(text) {
    const [enc, shift] = text.split("~|~");
    const cipher = enc
        .split("")
        .map((char) => {
            const charCode = char.charCodeAt(0);
            if (charCode >= 65 && charCode <= 90) {
                // Uppercase letters
                return String.fromCharCode(
                    ((charCode - 65 - shift + 26) % 26) + 65
                );
            } else if (charCode >= 97 && charCode <= 122) {
                // Lowercase letters
                return String.fromCharCode(
                    ((charCode - 97 - shift + 26) % 26) + 97
                );
            } else {
                // Non-alphabetic characters
                return char;
            }
        })
        .join("")
        .trim();

    return cipher;
}

module.exports = { caesarEncrypt, caesarDecrypt };
