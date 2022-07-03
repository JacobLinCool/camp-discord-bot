import { Message } from "discord.js";
import Fuse from "fuse.js";
import * as RPG from "./rpg";

type Respond = string | ((message: Message) => void);

export const messages = new Fuse(
    [
        /** Preparations */
        { cmd: ["嗨", "你好", "妳好", "hello"], res: RPG.hello },
        { cmd: ["準備好了", "let's go"], res: RPG.prepared },
        { cmd: ["我們到了"], res: RPG.nowhere },
        /** Challenges */
        { cmd: ["觀星台", "我們到了觀星台"], res: RPG.觀星台 },
        { cmd: ["ophiuchus"], res: RPG.觀星台_answer },
        { cmd: ["一袋米要扛幾樓", "我們到了一袋米要扛幾樓"], res: RPG.一袋米要扛幾樓 },
        { cmd: ["2739"], res: RPG.一袋米要扛幾樓_answer },
        { cmd: ["我的老天鵝湖畔", "我們到了我的老天鵝湖畔"], res: RPG.我的老天鵝湖畔 },
        { cmd: ["4619"], res: RPG.我的老天鵝湖畔_answer },
        { cmd: ["櫻木花道", "我們到了櫻木花道"], res: RPG.櫻木花道 },
        { cmd: ["45"], res: RPG.櫻木花道_answer },
        { cmd: ["薛丁格實驗室", "我們到了薛丁格實驗室"], res: RPG.薛丁格實驗室 },
        { cmd: ["program"], res: RPG.薛丁格實驗室_answer },
        {
            cmd: ["math 實驗室", "math實驗室", "我們到了 math 實驗室", "我們到了math實驗室"],
            res: RPG.Math實驗室,
        },
        { cmd: ["use"], res: RPG.Math實驗室_answer },
        { cmd: ["快樂氰化物實驗室", "我們到了快樂氰化物實驗室"], res: RPG.快樂氰化物實驗室 },
        { cmd: ["linux command", "linuxcommand"], res: RPG.快樂氰化物實驗室_answer },
        { cmd: ["光視覺實驗室", "我們到了光視覺實驗室"], res: RPG.光視覺實驗室 },
        { cmd: ["debug"], res: RPG.光視覺實驗室_answer },
        /** Advanced Challenges */
        { cmd: ["歐洲公園", "我們到了歐洲公園"], res: RPG.歐洲公園 },
        { cmd: ["527806"], res: RPG.歐洲公園_answer },
        { cmd: ["誠樓", "我們到了誠樓"], res: RPG.誠樓 },
        { cmd: ["ntnucsie"], res: RPG.誠樓_answer },
        /** Final Challenge */
        { cmd: ["圖書館", "library", "我們到了圖書館"], res: RPG.圖書館 },
        /** Utils */
        { cmd: ["任務進度"], res: RPG.任務進度 },
        { cmd: ["全域統計"], res: RPG.global_stat },
        { cmd: ["清除全域統計"], res: RPG.reset_global_stat },
    ] as { cmd: string[]; res: Respond }[],
    {
        threshold: 0.0,
        keys: ["cmd"],
    }
);
