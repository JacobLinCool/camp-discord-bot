import fetch from "node-fetch";
import he from "he";
import WebSocket from "ws";
import { CommandInteraction, MessageEmbed } from "discord.js";
import scoreboard from "./scoreboard";
import add_score from "./add-score";

let ws: WebSocket | null = null;
const bang_chats: string[] = [];
const game_gaming_status: any = {};
const subscribers = new Map<string, { interaction: CommandInteraction; expires: number }>();

export async function commands(interaction: CommandInteraction) {
    try {
        const { commandName: command } = interaction;

        if (command === "debug") {
            await interaction.deferReply({ ephemeral: true });
            const error = interaction.options.getString("error_message");

            if (!error) {
                await interaction.editReply("什麼錯誤？");
                return;
            }

            const results = await fetch(
                `https://api.stackexchange.com/2.3/search?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=relevance&intitle=${encodeURIComponent(
                    error
                )}&filter=default`
            ).then((res) => res.json());

            if (results.items.length) {
                const embeds = results.items
                    .map((item) =>
                        new MessageEmbed()
                            .setColor("#0099ff")
                            .setTitle(he.unescape(item.title))
                            .setURL(item.link)
                            .setDescription(
                                "與 " + item.tags.map((tag) => `**${tag}**`).join(", ") + " 相關"
                            )
                    )
                    .slice(0, 4);

                await interaction.editReply({ embeds: embeds });
            } else {
                await interaction.editReply("沒有解法 QQ");
            }
        } else if (command === "bang") {
            await interaction.deferReply();

            if (ws === null) {
                init_ws();
            }

            interaction.editReply(
                [
                    "開始轉播 Bang 遊戲實況！",
                    "你也可以前往 https://bang.jacoblin.cool/ 觀看喔",
                    "> 使用 _**/bang-stop**_ 可以停止轉播",
                ].join("\n")
            );

            subscribers.set(interaction.channelId, {
                interaction,
                expires: Date.now() + 1000 * 60 * 15,
            });
        } else if (command === "bang-stop") {
            await interaction.deferReply();

            subscribers.delete(interaction.channelId);

            interaction.editReply("我的轉播到此結束！");
        } else if (command === "scoreboard") {
            scoreboard(interaction);
        } else if (command === "add-score") {
            add_score(interaction);
        }
    } catch (e) {
        console.error(e);
    }
}

function init_ws() {
    ws = new WebSocket(`wss://bang-ws.jacoblin.cool/`, "bang-gaming");

    ws.on("close", () => {
        ws = null;
        for (const [channel_id, { interaction }] of subscribers) {
            try {
                interaction.channel?.send("我的轉播到此結束！");
            } catch (e) {
                console.error(e);
            }
        }
        subscribers.clear();
        bang_chats.splice(0, bang_chats.length);
        for (const key in game_gaming_status) {
            delete game_gaming_status[key];
        }
    });

    ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());

        if (msg.payload.game) {
            Object.assign(game_gaming_status, msg.payload.game);
        }

        if (ws && msg.type === "chat") {
            if (msg.payload.message.includes("join the game as a player.")) {
                for (const [channel_id, { interaction, expires }] of subscribers) {
                    try {
                        if (Date.now() > expires) {
                            subscribers.delete(channel_id);
                        } else {
                            interaction.channel?.send("現在沒有遊戲進行中！");
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
                ws.close();
                return;
            }

            bang_chats.push(msg.payload.message);
            if (bang_chats.length > 10) {
                bang_chats.shift();
            }

            const result = bang_response();
            for (const [channel_id, { interaction, expires }] of subscribers) {
                try {
                    if (Date.now() > expires) {
                        subscribers.delete(channel_id);
                    } else {
                        interaction.editReply(result);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }

        if (ws && msg.type === "end") {
            const result = bang_response();
            for (const [channel_id, { interaction, expires }] of subscribers) {
                try {
                    if (Date.now() > expires) {
                        subscribers.delete(channel_id);
                    } else {
                        interaction.editReply(result);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
    });
}

function bang_response() {
    return [
        "開始轉播 Bang 遊戲實況！",
        "你也可以前往 https://bang.jacoblin.cool/ 觀看喔",
        "> 使用 _**/bang-stop**_ 可以停止轉播",
        "----------",
        `**場上狀態** (回合 ${game_gaming_status.turn || 0})`,
        game_gaming_status.players
            ?.map(
                (player) =>
                    (player.dead ? "~~" : "") +
                    `**${player.name}** | [${
                        player.role ? "**" + RoleType[player.role] + "**" : "Hidden"
                    }] (${CharacterType[player.character].replace("_", " ")}) HP: ${player.hp}` +
                    (player.dead ? "~~" : "")
            )
            .join("\n"),
        "----------",
        "**即時動態**",
        "```",
        bang_chats.join("\n"),
        "```",
    ].join("\n");
}

enum RoleType {
    ROLE_LOW_BOUND,
    Sheriff,
    Deputy,
    Criminal,
    Traitor,
    ROLE_HIGH_BOUND,
}

enum CharacterType {
    CHARACTER_LOW_BOUND,
    Bart_Cassidy,
    Black_Jack,
    Calamity_Janet,
    El_Gringo,
    Jesse_Jones,
    Jourdonnais,
    Kit_Carlson,
    Lucky_Duke,
    Paul_Regret,
    Pedro_Ramirez,
    Rose_Doolan,
    Sid_Ketchum,
    Slab_the_Killer,
    Suzy_Lafayette,
    Vulture_Sam,
    Willy_the_Kid,
    CHARACTER_HIGH_BOUND,
}
