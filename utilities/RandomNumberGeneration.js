const crypto = require('crypto');

const generateRandomString = (len) => {
    const token = crypto.randomBytes(len).toString("hex")
    return token
}

module.exports = generateRandomString