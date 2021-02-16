#!/usr/bin/env node

require("dotenv").config({ path: __dirname + '/.env' });

const jq = require('node-jq');
const got = require('got');

const config = require('./config.json');

const logToDiscord = (options) => {
    const notificationHook = process.env.NOTIFICATION_CHANNEL;
    const notification = got.post(notificationHook, {
        json: {
            username: options.username,
            content: options.content,
        }
    });
}

const getType = (type) => {
    //colors https://www.techjunkie.com/discord-change-text-color/
    const types = {
        success: 'css',
        error: 'arm',
        info: 'yaml'
    }
    
    return types[type];
}

const serverLog = (message, mention, serverTag) => {
    // content = `**${process.env.BOT_NAME}**: ${message}`;
    content = `${message}`;
    console.log(message);
    if (mention) {
        content += ' @everyone'
    }
    if (serverTag) {
        console.dir(serverTag)
        const { type, tag } = serverTag;
        const typeValue = getType(type);
        content = `\`\`\`${typeValue}\n${tag}\`\`\`` + content;
    }
    logToDiscord({
        username: process.env.NOTIFICATION_NAME,
        content: content
    })
}

(async () => {

    const allavailable = [];

    for (product of config) {
        console.log(product.name);

        for (site of product.sites) {

            console.log('  ', `${site.name} (${site.link})`);

            const file = site.file;

            try {

            	const response = await got(file.url);

                for (selector of file.selectors) {
                    
                    const data = await jq.run(selector.selector, response.body, { input: 'string', output: 'json' });

                    const requiredData = selector.test;

                    const available = data == requiredData;

                    console.log('    ', `${selector.name} verfügbar`, available);

                    if (available) {
                        allavailable.push(`**${product.name}** — ${selector.name} verfügbar: ${site.link}`)
                    }

                }

            } catch (error) {
                serverLog('Fetching Data failed: ' + error, true, {type: 'error', tag: 'ERROR'});
                console.log(error);
            }

        }

    }

    if (allavailable.length > 0) {
        serverLog(allavailable.join('\n'), true)
    }
    
})();

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    serverLog('Some unhandled Rejection:\n' + reason.toString(), true, {type: 'error', tag: 'ERROR'});
});