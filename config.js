const path = require('path');

module.exports = {
    auth: {
        keyFilePath: path.resolve(__dirname, 'credentials.json'),
        savedTokensPath: path.resolve(__dirname, 'tokens.json'), // where you want the tokens to be saved
    },
    conversation: {
        lang: 'en-US',
        screen: {
            isOn: true,
        },
    },
};