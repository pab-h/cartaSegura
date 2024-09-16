const rc4 = require("arc4");

function encrypt(key, content) {
    const cipher = rc4("arc4", key);

    return cipher.encodeString(content);
}

function decrypt(key, encryptedContent) {
    const cipher = rc4("arc4", key);

    return cipher.decodeString(encryptedContent);
}

module.exports = { encrypt, decrypt };
