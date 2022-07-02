import fs from "node:fs";
import Express from "express";
import Logger from "../logger";
import { progress } from "../storage";

export function server() {
    const logger = new Logger({ name: "Server" });

    const app = Express();

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.get("/stat", (req, res) => {
        res.send(JSON.stringify(progress, null, 4));
        res.header("Content-Type", "application/json");
        res.header("Access-Control-Allow-Origin", "*");
    });

    app.get("/log", (req, res) => {
        res.send(fs.readFileSync("log.txt", "utf8"));
        res.header("Content-Type", "text/plain");
        res.header("Access-Control-Allow-Origin", "*");
    });

    app.listen(3000, () => {
        logger.info("Server is listening on port 3000");
    });

    return app;
}
