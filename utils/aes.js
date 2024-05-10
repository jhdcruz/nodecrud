/**
 * Attribution: https://dev.to/jobizil/encrypt-and-decrypt-data-in-nodejs-using-aes-256-cbc-2l6d#comment-2b6fi
 */

const crypto = require("crypto");

// function generateKey() {
//     return crypto.randomBytes(32).toString("hex");
// }
const keyString =
    "be42324a2bba6b43b9121205e25dd3669b7dc56ac2d44deb636c2bf2101153a0";
const key = Buffer.from(keyString, "hex");
const ivLength = 16;

function encryptAesGcm(text) {
    let iv = crypto.randomBytes(ivLength);
    let cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key), iv);

    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let tag = cipher.getAuthTag();

    return (
        iv.toString("hex") +
        "::" +
        encrypted.toString("hex") +
        "::" +
        tag.toString("hex")
    );
}

function decryptAesGcm(text) {
    let textParts = text.split("::");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.shift(), "hex");
    let tag = Buffer.from(textParts.shift(), "hex");
    let decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key), iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

function encryptAes(text) {
    let iv = crypto.randomBytes(ivLength);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + "::" + encrypted.toString("hex");
}

function decryptAes(text) {
    let textParts = text.split("::");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join("::"), "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

module.exports = {
    encryptAes,
    decryptAes,
    encryptAesGcm,
    decryptAesGcm,
};
