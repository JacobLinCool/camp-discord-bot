import fs from "node:fs";

export class Logger {
    public name: string;
    public level: number;
    public verbose: number;
    public file: fs.WriteStream | null;

    constructor({ name = "", level = 0, verbose = 3, file = null as fs.WriteStream | null } = {}) {
        this.name = name;
        this.level = level;
        this.verbose = verbose;
        this.file = file;
    }

    public info(...msg: unknown[]) {
        this.verbose >= 3 &&
            console.log(" ".repeat(this.level * 4) + `\x1b[94m[${this.name}]\x1b[m`, ...msg);

        this.file &&
            this.file.write(
                `${new Date().toISOString()} [INFO] [${this.name}] ${msg
                    .map((m) => (typeof m === "string" ? m : JSON.stringify(m)))
                    .join(" ")}\n`
            );
    }

    public warn(...msg: unknown[]) {
        this.verbose >= 2 &&
            console.log(" ".repeat(this.level * 4) + `\x1b[93m[${this.name}]\x1b[m`, ...msg);

        this.file &&
            this.file.write(
                `${new Date().toISOString()} [WARN] [${this.name}] ${msg
                    .map((m) => (typeof m === "string" ? m : JSON.stringify(m)))
                    .join(" ")}\n`
            );
    }

    public error(...msg: unknown[]) {
        this.verbose >= 1 &&
            console.log(" ".repeat(this.level * 4) + `\x1b[91m[${this.name}]\x1b[m`, ...msg);

        this.file &&
            this.file.write(
                `${new Date().toISOString()} [ERRO] [${this.name}] ${msg
                    .map((m) => (typeof m === "string" ? m : JSON.stringify(m)))
                    .join(" ")}\n`
            );
    }

    public sub(name = "") {
        return new Logger({ name, level: this.level + 1, verbose: this.verbose, file: this.file });
    }
}

export default Logger;
