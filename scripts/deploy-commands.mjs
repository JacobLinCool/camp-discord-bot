import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";

config();

const commands = [
    new SlashCommandBuilder()
        .setName("debug")
        .setDescription("給我錯誤訊息，我會試著找找解法！")
        .addStringOption((option) =>
            option.setName("error_message").setDescription("Error Message").setRequired(true)
        ),
    new SlashCommandBuilder().setName("bang").setDescription("即時播報 Bang 遊戲實況！"),
    new SlashCommandBuilder().setName("bang-stop").setDescription("停止播報 Bang 遊戲實況！"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
