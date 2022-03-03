/* 
DO NOT EDIT BELOW DUMB ASS.
*/


//Import all liberaries
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const superagent = require('superagent');
const Config = require('./config.js')
const hook = new Webhook(Config.Webhook)
print = console.log
let version = 1.1

//Main Function
async function Main() {

    //Get Newest version from my Website
    const { body } = await superagent
        .get("https://hypnoticsiege.net/api/xlogging/version.json");
    print(`[xLogging] You are running Version: ${version} | Newest Version: ${body.version}`)

    //If declared version is less that newest version
    if (version < body.version) {

        const embed = new MessageBuilder()
            .setColor('#00ff00')
            .setTitle(`Server Started`)
            .setAuthor(`❌ Out of Date!`)
            .setDescription(`:white_check_mark: Server Started Successfully!`)
            .addField(`Resource Version:`, version)
            .addField(`Newest Version:`, body.version)
            .setURL('https://hypnoticsiege.net')
            .setFooter('Started')
            .setTimestamp();
        hook.setUsername(Config.ServerName);
        print("❌ Out of Date, Update Here: https://github.com/hypnoticsiege/xlogging")
        hook.send(embed)
    }
    //If up to date q 
    else {
        print(`xLogging is Up to Date!`)
        const embed = new MessageBuilder()
            .setColor('#00ff00')
            .setTitle(`Server Started`)
            .setAuthor(`✔️ Up to Date`)
            .setDescription(`:white_check_mark: Server Started Successfully!`)
            .setURL('https://hypnoticsiege.net')
            .setFooter('Started')
            .setTimestamp();
        hook.setUsername(Config.ServerName);
        hook.send(embed)
    }

    on('playerConnecting', (name) => {
        const player = global.source;

        setTimeout(() => {
            //Set all Identifiers
            let steamIdentifier = null;
            let discord = null;
            let license = null;

            for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
                const identifier = GetPlayerIdentifier(player, i);

                //Get Steam ID
                if (identifier.includes('steam:')) {
                    steamIdentifier = identifier.substring(6)
                }

                //Get Discord ID
                if (identifier.includes('discord:')) {
                    discord = identifier.substring(8)
                }

                //Get Game License
                if (identifier.includes('license:')) {
                    license = identifier.substring(8)
                }
            }

            const embed = new MessageBuilder()
                .setColor('#00ff00')
                .setTitle(`Player Join`)
                .addField('Player Name:', name)
                .addField(`Steam Hex:`, steamIdentifier)
                .addField(`Discord ID:`, discord)
                .addField(`Discord Name:`, `<@${discord}>`)
                .addField(`Game License:`, license)
                .setFooter('Joined')
                .setTimestamp();
            hook.setUsername(Config.ServerName);
            hook.send(embed);
        }, 0)
    })

    on("playerDropped", (reason) => {
        const player = global.source;
        print(`${GetPlayerName(player)} Disconnected (Reason: ${reason})`)

        //Set all Identifiers
        let steamIdentifier = null;
        let discord = null;
        let license = null;

        for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
            const identifier = GetPlayerIdentifier(player, i);

            //Get Steam ID
            if (identifier.includes('steam:')) {
                steamIdentifier = identifier.substring(6)
            }

            //Get Discord ID
            if (identifier.includes('discord:')) {
                discord = identifier.substring(8)
            }

            //Get Game License
            if (identifier.includes('license:')) {
                license = identifier.substring(8)
            }
        }

        const embed = new MessageBuilder()
            .setColor('#FF0000')
            .setTitle(`Player Left`)
            .setDescription(`${GetPlayerName(player)} left | Reason: ${reason}`)
            .addField('Player Name:', `${GetPlayerName(player)}`)
            .addField(`Steam Hex:`, steamIdentifier)
            .addField(`Discord ID:`, discord)
            .addField(`Discord Name:`, `<@${discord}>`)
            .addField(`Game License:`, license)
            .setFooter('Left')
            .setTimestamp();
        hook.setUsername(Config.ServerName);
        hook.send(embed);
    });
}

Main()