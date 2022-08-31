const Gpio = require('onoff').Gpio;
const Client = require('./client');

const client = new Client();
const pushButton = new Gpio(17, 'in', 'rising');

client.on('ready', async () => {
    console.log('Client is ready');
    
    pushButton.watch(onPress);
});

client.on('error', console.error);

function onPress(err, _value) {
    if (err) return console.error(err);
    client.toggleLight();
};