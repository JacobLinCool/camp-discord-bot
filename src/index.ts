import { config } from "dotenv";
import { Client, Intents } from "discord.js";
import { commands } from "./commands";
import { progress } from "./progress";

config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

client.once("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    if (message.author.bot === true || message.content === "" || !client.user) {
        return;
    }

    const results = commands.search(message.content.toLowerCase().trim());
    console.log({
        channel: message.guild?.channels.cache.get(message.channel.id)?.name,
        received: message.content,
    });

    if (results.length > 0) {
        if (!progress[message.channelId]) {
            progress[message.channelId] = {};
        }

        if (!progress[message.channelId][results[0].item.cmd[0]]) {
            progress[message.channelId][results[0].item.cmd[0]] = 0;
        }
        progress[message.channelId][results[0].item.cmd[0]]++;

        if (typeof results[0].item.res === "string") {
            message.reply(results[0].item.res);
        } else {
            results[0].item.res(message);
        }
    }
});

client.login(process.env.BOT_TOKEN);

// link: https://discord.com/api/oauth2/authorize?client_id=992315692240085012&permissions=8&scope=bot%20applications.commands
