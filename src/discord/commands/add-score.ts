import { scoreboard } from "../../storage";
import { CommandInteraction } from "discord.js";

export default async function (interaction: CommandInteraction) {
    if (!interaction.member?.roles || Array.isArray(interaction.member?.roles)) {
        return interaction.reply("無法確認權限");
    }

    const roles = new Set(interaction.member?.roles.cache.map((role) => role.name));

    if (roles.has("admin") || roles.has("先鋒部隊") || roles.has("鑑識調查科科員")) {
        const team = interaction.options.getString("team");
        const type = interaction.options.getString("type");
        const score = interaction.options.getInteger("score");

        if (!team || !type || !score) {
            return interaction.reply("請輸入隊伍名稱、給分類別及分數");
        }

        if (!scoreboard[team]) {
            return interaction.reply("找不到這個隊伍");
        }

        if (scoreboard[team][type] === undefined) {
            return interaction.reply("找不到這個給分類別");
        }

        scoreboard[team][type] += score;
        return interaction.reply(`在 \`${type}\` 活動中給予 ${team} ${score} 分`);
    }

    return interaction.reply("你沒有權限喔！");
}
