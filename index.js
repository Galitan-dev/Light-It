const SIL = require('system-input')
const Client = require('./client');

const client = new Client();
const sil = new SIL();

client.on('ready', async () => {
    console.log('Client is ready');

    sil.start();
});

sil.on('ready', () => {
    console.log('System Input Listener is ready');
});

sil.on('keydown', (event) => {
    switch (event.keyCode) {
        case 57: client.turnLightOn(); break;
        case 56: client.toggleLight(); break;
    }
});

sil.on('keyup', (event) => {
    switch (event.keyCode) {
        case 57: client.turnLightOff(); break;
    }
});


client.on('error', console.error);