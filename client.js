const GoogleAssistant = require('google-assistant');
const config = require('./config')
const { EventEmitter } = require('events')

module.exports = class Client extends EventEmitter {
    
    constructor() {
        super();
        this.assistant = new GoogleAssistant(config.auth);
        this.assistant.on('ready', () => this.emit('ready'));
        this.assistant.on('error', (err) => this.emit('error', err));
    }

    ask = (query) => new Promise((resolve, reject) => {
        config.conversation.textQuery = query;
        this.assistant.start(config.conversation, (conversation) => conversation
            .on('error', reject)
            .on('data', (data) => {
                if (!data?.screenOut?.data) return;
                const html = data.screenOut.data.toString();
                const response = html.match(/<div class="show_text_content">([^<]+)<\/div>/)[1];
                resolve(response);
            })
        )
    });

    turnLightOff = this.ask.bind(this, 'Turn the light off.');
    turnLightOn = this.ask.bind(this, 'Turn the light on.');

    async isLightOn() {
        const response = await this.ask("Is the light on?");
        return response.endsWith('on.')
    }

    async toggleLight() {
        const isLightOn = await this.isLightOn();
        if (isLightOn) await this.turnLightOff();
        else await this.turnLightOn();
    }
    
}