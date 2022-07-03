import fs from "node:fs";
import Express from "express";
import Logger from "../logger";
import { progress } from "../storage";

export function server() {
    const logger = new Logger({ name: "Server" });

    const app = Express();

    app.get("/", (req, res) => {
        res.send("Alive!");
    });

    app.get("/stat", (req, res) => {
        res.header("Content-Type", "application/json");
        res.header("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(progress, null, 4));
    });

    app.get("/log", (req, res) => {
        res.header("Content-Type", "text/html");
        res.header("Access-Control-Allow-Origin", "*");
        res.send("<pre><code>" + fs.readFileSync("log.txt", "utf8") + "</code></pre>");
    });

    app.listen(3000, () => {
        logger.info("Server is listening on port 3000");
    });

    return app;
}
