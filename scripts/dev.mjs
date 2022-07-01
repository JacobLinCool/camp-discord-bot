import { spawn } from "node:child_process";
import chokidar from "chokidar";

let child = start();

chokidar.watch("./src").on("change", () => {
    if (child) {
        child.kill();
    }
});

function start() {
    return spawn("pnpm start", { stdio: "inherit", shell: true }).once("exit", () => {
        console.log("Server Restarted");
        child = start();
    });
}
