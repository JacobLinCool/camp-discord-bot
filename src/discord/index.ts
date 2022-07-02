import { Client, Intents } from "discord.js";
import { commands } from "../discord/commands";
import { progress } from "../storage";
import { hello_world } from "../discord/hello-world";
import { Logger } from "../logger";
import fs from "node:fs";

export function discord() {
    const logger = new Logger({
        name: "Discord",
        file: fs.createWriteStream("log.txt", { flags: "a+" }),
    });

    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_VOICE_STATES,
        ],
    });

    client.once("ready", () => {
        logger.info("Ready!");
    });

    client.on("messageCreate", (message) => {
        if (
            message.author.bot === true ||
            message.content === "" ||
            !client.user ||
            !message.member
        ) {
            return;
        }

        if (message.mentions.users.has(client.user.id)) {
            const langs = Object.keys(hello_world);
            const lang = langs[Math.floor(Math.random() * langs.length)];
            message.reply(
                [
                    `Hello World, ${message.author.username}!`,
                    `\`\`\`${lang}`,
                    hello_world[lang],
                    `\`\`\``,
                ].join("\n")
            );
            return;
        }

        const results = commands.search(message.content.toLowerCase().trim());
        logger.info({
            channel: message.guild?.channels.cache.get(message.channel.id)?.name,
            sender: `${message.member.displayName} (${message.member.roles.cache
                .map((r) => r.name)
                .join(", ")})`,
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

    return client;
}

// link: https://discord.com/api/oauth2/authorize?client_id=992315692240085012&permissions=8&scope=bot%20applications.commands
