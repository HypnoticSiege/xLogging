//Import all liberaries
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const superagent = require('superagent');

//We will end up having a config.js but this is the Webhook config
const hook = new Webhook('https://discord.com/api/webhooks/862549915556511765/HQInF0ujweXWhmN551yc9OBz0h6XgLg5RnGTJjPlvHWLT8rSJLfePAelBSaXVcDoTkOO')

//Declare Version for version checker
let version = 1.1

//Main Function
async function Main() {

    //Get Newest version from my Website
    const { body } = await superagent
        .get("https://hypnoticsiege.codes/api/version.json");
    console.log(`[xLogging] You are running Version: ${version} | Newest Version: ${body.version}`)

    //If declared version is less that newest version
    if (version < body.version) {
        console.log(`xLogging is Out of Date! Please update for stability at https://github.com/hypnoticsiege/xlogging`)
        const embed = new MessageBuilder()
            .setColor('#00ff00')
            .setTitle(`Server Started`)
            .setAuthor(`❌ Out of Date!`)
            .setDescription(`:white_check_mark: Server Started Successfully!`)
            .addField(`Resource Version:`, version)
            .addField(`Newest Version:`, body.version)
            .setURL('https://hypnoticsiege.codes')
            .setFooter('Started at')
            .setTimestamp();
        hook.send(embed)
    }
    //If up to date  
    else {
        console.log(`xLogging is Up to Date!`)
        const embed = new MessageBuilder()
            .setColor('#00ff00')
            .setTitle(`Server Started`)
            .setAuthor(`✔️ Up to Date`)
            .setDescription(`:white_check_mark: Server Started Successfully!`)
            .setURL('https://hypnoticsiege.codes')
            .setFooter('Started at')
            .setTimestamp();
        hook.send(embed)
    }
}

Main()