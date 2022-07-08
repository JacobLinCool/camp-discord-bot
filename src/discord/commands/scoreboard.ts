import { scoreboard } from "../../storage";
import { CommandInteraction } from "discord.js";

const channels = {
    "990541679935229974": "第一小隊",
    "990541741465677884": "第二小隊",
    "990541794116780102": "第三小隊",
    "990541835791372288": "第四小隊",
    "990541906859687946": "第五小隊",
    "990541977177161748": "第六小隊",
    "990542021024432180": "第七小隊",
    "990542073574879262": "第八小隊",
};

const manager_channels = ["990592597946937385", "992513184445497404"];

export default async function (interaction: CommandInteraction) {
    if (!interaction.member?.roles || Array.isArray(interaction.member?.roles)) {
        return interaction.reply("無法確認權限");
    }

    const roles = new Set(interaction.member?.roles.cache.map((role) => role.name));

    if (channels[interaction.channelId]) {
        await interaction.deferReply();
        const team = channels[interaction.channelId];

        let text = "";
        text += `**${team}** (${Object.values(scoreboard[team]).reduce(
            (acc, curr) => acc + curr,
            0
        )})\n\`\`\`\n`;
        for (const type in scoreboard[team]) {
            text += `${type}: ${scoreboard[team][type]}\n`;
        }
        text += "```\n";

        await interaction.editReply(text);
        return;
    }

    if (roles.has("admin") || roles.has("先鋒部隊") || roles.has("鑑識調查科科員")) {
        await interaction.deferReply();
        let text = "";
        for (const team in scoreboard) {
            text += `**${team}** (${Object.values(scoreboard[team]).reduce(
                (acc, curr) => acc + curr,
                0
            )})\n\`\`\`\n`;
            for (const type in scoreboard[team]) {
                text += `${type}: ${scoreboard[team][type]}\n`;
            }
            text += "```\n";
        }
        await interaction.editReply(text);
        return;
    }

    await interaction.reply({ content: "權限無效！", ephemeral: true });
}
