import { config } from "dotenv";
import { Client } from "discord.js";

config();

const client = new Client({
    intents: [],
});

client.once("ready", async () => {
    client.user?.setActivity({
        name: "Ubuntu",
        type: "PLAYING",
        // url: "https://bang.jacoblin.cool",
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Done!");
    process.exit(0);
});

client.login(process.env.BOT_TOKEN);

// link: https://discord.com/api/oauth2/authorize?client_id=992315692240085012&permissions=8&scope=bot%20applications.commands
