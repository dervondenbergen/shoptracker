#!/usr/bin/env node

require("dotenv").config({ path: __dirname + '/.env' });

const jq = require('node-jq');
const cheerio = require('cheerio');
const got = require('got');
const fs = require('fs');

const config = require('./config');

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

try {
    var availabletimeout = JSON.parse(fs.readFileSync(__dirname + '/availability.json', {encoding: 'utf-8'}));
} catch (e) {
    var availabletimeout = {};
}

const saveAvailability = () => {
    fs.writeFileSync(__dirname + '/availability.json', JSON.stringify(availabletimeout, null, 2))
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

                    var data = null;

                    if (file.type === 'json') {

                        data = await jq.run(selector.selector, response.body, { input: 'string', output: 'json' });

                    } else if (file.type === 'html') {

                        const $ = cheerio.load(response.body);

                        const elements = $(selector.selector);

                        data = selector.method(elements, $);

                    }

                    if (data !== null) {

                        const requiredData = selector.test;

                        const available = data == requiredData;

                        console.log('    ', `${selector.name}`, available);

                        if (available) {
                            const availabilityname = `${site.name}/${product.name}/${selector.name}`
                            const lastPost = availabletimeout[availabilityname];
                            if (lastPost && selector.timeout) {
                                const timeSinceLastPost = Date.now() - lastPost;
                                const timeoutInMs = selector.timeout * 60 * 1000;

                                if (timeoutInMs > timeSinceLastPost) {
                                    console.log('    ', '- Already posted on Discord')
                                    availabletimeout[availabilityname] = Date.now();
                                    continue;
                                }
                            }
                            allavailable.push(`**${product.name}** — ${selector.name}: ${site.link}`)
                        }

                    }

                }

            } catch (error) {
                serverLog('Getting Information failed: ' + error, true, {type: 'error', tag: 'ERROR'});
                console.log(error);
            }

        }

    }

    if (allavailable.length > 0) {
        serverLog(allavailable.join('\n'), true)
    }
        saveAvailability();
    
})();

process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    serverLog('Some unhandled Rejection:\n' + reason.toString(), true, {type: 'error', tag: 'ERROR'});
});