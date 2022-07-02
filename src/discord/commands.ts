import { Message } from "discord.js";
import Fuse from "fuse.js";
import { progress } from "../storage";

type Respond = string | ((message: Message) => void);

export const commands = new Fuse(
    [
        /** Preparations */
        { cmd: ["嗨", "你好", "妳好", "hello"], res: hello },
        { cmd: ["準備好了", "let's go"], res: prepared },
        { cmd: ["我們到了"], res: nowhere },
        /** Challenges */
        { cmd: ["觀星台", "我們到了觀星台"], res: 觀星台 },
        { cmd: ["ophiuchus"], res: 觀星台_answer },
        { cmd: ["一袋米要扛幾樓", "我們到了一袋米要扛幾樓"], res: 一袋米要扛幾樓 },
        { cmd: ["2739"], res: 一袋米要扛幾樓_answer },
        { cmd: ["我的老天鵝湖畔", "我們到了我的老天鵝湖畔"], res: 我的老天鵝湖畔 },
        { cmd: ["4619"], res: 我的老天鵝湖畔_answer },
        { cmd: ["櫻木花道", "我們到了櫻木花道"], res: 櫻木花道 },
        { cmd: ["45"], res: 櫻木花道_answer },
        { cmd: ["薛丁格實驗室", "我們到了薛丁格實驗室"], res: 薛丁格實驗室 },
        { cmd: ["program"], res: 薛丁格實驗室_answer },
        {
            cmd: ["math 實驗室", "math實驗室", "我們到了 math 實驗室", "我們到了math實驗室"],
            res: Math實驗室,
        },
        { cmd: ["use"], res: Math實驗室_answer },
        { cmd: ["快樂氰化物實驗室", "我們到了快樂氰化物實驗室"], res: 快樂氰化物實驗室 },
        { cmd: ["linux command", "linuxcommand"], res: 快樂氰化物實驗室_answer },
        { cmd: ["光視覺實驗室", "我們到了光視覺實驗室"], res: 光視覺實驗室 },
        { cmd: ["debug"], res: 光視覺實驗室_answer },
        /** Advanced Challenges */
        { cmd: ["歐洲公園", "我們到了歐洲公園"], res: 歐洲公園 },
        { cmd: ["527806"], res: 歐洲公園_answer },
        { cmd: ["誠樓", "我們到了誠樓"], res: 誠樓 },
        { cmd: ["ntnucsie"], res: 誠樓_answer },
        /** Final Challenge */
        { cmd: ["圖書館", "library", "我們到了圖書館"], res: 圖書館 },
        /** Utils */
        { cmd: ["任務進度"], res: 任務進度 },
        { cmd: ["全域統計"], res: global_stat },
        { cmd: ["清除全域統計"], res: reset_global_stat },
    ] as { cmd: string[]; res: Respond }[],
    {
        threshold: 0.0,
        keys: ["cmd"],
    }
);

function hello(message: Message): void {
    message.reply(
        [
            `${message.author.username} 你好，我是先鋒調查隊隊員**小花**！\n`,
            `在這次調查中，我會協助你們破解一些線索。`,
            `如果你們輸入了重要線索，我們先鋒隊將會回應你我們調查到的東西。`,
            `如果在解謎中有困難，可以先嘗試詢問你們身旁精明的小隊長喔！`,
            `並且請記住一件事，**多善用網路查找資料**，有時候會對你們解謎有幫助。\n`,
            `如果你準備好了，麻煩再跟我說一聲。`,
            `~ 輸入「**準備好了**」開始調查。 ~`,
        ].join("\n")
    );
}

function prepared(message: Message): void {
    message.reply(
        [
            `開始調查！`,
            `**附圖 MAP** 是我們鑑識調查科之前所查到的蟒蛇手下據點的資料`,
            `希望小隊員們你們能前去調查這些地方，看是否能找到一些有用的線索\n`,
            `在到達地點後，請小隊員們在調查附近是否有「地點名稱」並彙報，好讓我們先鋒隊員能得知你們的位置`,
            ``,
            `~ 到達地點後搜尋附近地點，並輸入**地點名稱** ~`,
        ].join("\n")
    );
    message.reply({ content: "**附圖 MAP**", files: ["./assets/map.jpg"] });
}

function nowhere(message: Message): void {
    message.reply([`抱歉，這邊訊號不太清楚`, `請再說一次你們到了哪裡？`].join("\n"));
}

function 觀星台(message: Message): void {
    message.reply(
        [
            `原來你們到觀星台了！`,
            `據我們調查，這名蟒蛇手下十分喜歡觀星，並且我們也在他桌上發現了 **附圖 Astrological** 這張紙條`,
            `並且我們還發現附近有一個由**英文字母**鎖上的保險櫃，或許附近有一些有用的線索可以幫助我們打開保險櫃？`,
            ``,
            `~ 找出保險櫃密碼 ~`,
        ].join("\n")
    );
    message.reply({ content: "**附圖 Astrological**", files: ["./assets/astrological.jpg"] });
}

function 觀星台_answer(message: Message): void {
    if (!progress[message.channelId]["觀星台"]) {
        message.reply("你在哪個地點？");
        return;
    }

    message.reply({
        content: [
            `保險櫃打開了！裡面似乎有個錄音帶？`,
            `斷斷續續的，不知道有甚麼用，先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q1.mp3"],
    });

    pretasks_done_1(message);
}

function 一袋米要扛幾樓(message: Message): void {
    message.reply(
        [
            `這棟大樓的名字還真奇怪...`,
            `據說這名蟒蛇手下十分喜愛閱讀新詩，更是洪萬達老師的忠實粉絲`,
            `在他的書桌上我們找到了這張小紙條，上面寫了幾行小字：`,
            `\`\`\`(2, 6) (28, 27) (21, 21) (16, 14) =  _ _ _ _\`\`\``,
            `但書桌的抽屜似乎上鎖了，需要一個**四位數密碼**，哪裡會有線索呢...`,
            ``,
            `~ 找到抽屜密碼 ~`,
        ].join("\n")
    );
}

function 一袋米要扛幾樓_answer(message: Message): void {
    if (!progress[message.channelId]["一袋米要扛幾樓"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `保險櫃打開了！裡面似乎有個錄音帶？`,
            `斷斷續續的，不知道有甚麼用，先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q2.mp3"],
    });

    pretasks_done_1(message);
}

function 我的老天鵝湖畔(message: Message): void {
    message.reply({
        content: [
            `我的老天鵝，不得不佩服為這邊起名的人的品味...`,
            `我們在地上撿到了一台錄音機，裡面錄了一些不知有甚麼用的音階 @@`,
            ``,
            `附近也有一個被深鎖的大門，或許找找附近會有甚麼線索？`,
            ``,
            `~ 找到大門密碼 ~`,
        ].join("\n"),
        files: ["./assets/C-1.mp3", "./assets/C-2.mp3", "./assets/C-3.mp3", "./assets/C-4.mp3"],
    });
}

function 我的老天鵝湖畔_answer(message: Message): void {
    if (!progress[message.channelId]["我的老天鵝湖畔"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `保險櫃打開了！裡面似乎有個錄音帶？`,
            `斷斷續續的，不知道有甚麼用，先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q3.mp3"],
    });

    pretasks_done_1(message);
}

function 櫻木花道(message: Message): void {
    message.reply({
        content: [
            `蟒蛇手下據點的名字真的都很有創意呢...`,
            `我們發現了一棵樹的背後刻著一些圖案（**附圖 Umbrella**）`,
            `並且我們在附近的土發現有翻動過的痕跡，找到了一個小寶盒，似乎需要輸入密碼，觀察看看四周有沒有能幫助我們找到密碼的線索吧？或許**陽傘**上有一些線索？`,
            ``,
            `~ 找到小寶盒的密碼 ~`,
        ].join("\n"),
    });
    message.reply({ content: "**附圖 Umbrella**", files: ["./assets/umbrella.jpg"] });
}

function 櫻木花道_answer(message: Message): void {
    if (!progress[message.channelId]["櫻木花道"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `保險櫃打開了！裡面似乎有個錄音帶？`,
            `斷斷續續的，不知道有甚麼用，先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q4.mp3"],
    });

    pretasks_done_1(message);
}

function 薛丁格實驗室(message: Message): void {
    message.reply(
        [
            `走廊上寫著一些不明所以的文字，真令人感到奇怪`,
            `可惡，實驗室似乎上鎖了，需要輸入 **7 位英文字母**才行進去`,
            `不知道附近會不會有密碼呢？`,
            `~ 找到實驗室的開門密碼 ~`,
        ].join("\n")
    );
}

function 薛丁格實驗室_answer(message: Message): void {
    if (!progress[message.channelId]["薛丁格實驗室"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `實驗室大門能打開了！裡面似乎有張小紙條？`,
            `光這一張紙條好像沒什麼用？先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q5.jpg"],
    });

    pretasks_done_2(message);
}

function Math實驗室(message: Message): void {
    message.reply(
        [
            `數學阿...真是一聽到就讓人頭疼呢...`,
            `疑？微積分課本裡好像放了甚麼？（**附圖 Calculus**）`,
            `旁邊鎖著的書櫃好像有東西？但書櫃被鎖住了...需要**三位英文字母**`,
            `書櫃上還寫著，「因數分解，數字換英文」，真是令人摸不著頭戲`,
            `~ 打開書櫃 ~`,
        ].join("\n")
    );
    message.reply({ content: "**附圖 Calculus**", files: ["./assets/calculus.jpg"] });
}

function Math實驗室_answer(message: Message): void {
    if (!progress[message.channelId]["math 實驗室"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `書櫃打開了！裡面似乎有張小紙條？`,
            `光這一張紙條好像沒什麼用？先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q6.jpg"],
    });

    pretasks_done_2(message);
}

function 快樂氰化物實驗室(message: Message): void {
    message.reply(
        [
            `這個實驗室的名字真是讓人不知道該快樂還是恐懼呢...`,
            ``,
            `地板上好像有個小地窖，好像是拿來存放藥品的？但被一個大鎖給鎖住了，需要 **12 位英文密碼**，還寫著「作業系統　命令」，這是甚麼意思呢？`,
            ``,
            `實驗室的牆壁上似乎黏著甚麼東西？調查一下吧，或許有我們想要的東西。疑這拼圖的形狀長得好像某個東西，我記得化學課好像看過...？`,
            ``,
            `~ 找到地窖大鎖密碼 ~`,
        ].join("\n")
    );
}

function 快樂氰化物實驗室_answer(message: Message): void {
    if (!progress[message.channelId]["快樂氰化物實驗室"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `地窖大鎖能打開了！裡面似乎有張小紙條？`,
            `光這一張紙條好像沒什麼用？先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q7.jpg"],
    });

    pretasks_done_2(message);
}

function 光視覺實驗室(message: Message): void {
    message.reply(
        [
            `這邊顏色好多真是令人眼花撩亂@@`,
            ``,
            `不過在玻璃窗上似乎刻著一些小字？`,
            `\`\`\``,
            `(255,   0,   0)`,
            `(  0, 255,   0)`,
            `(  0,   0, 255)`,
            `(128,   0, 128)`,
            `(255, 128,   0)`,
            `\`\`\``,
            `「光的三原色，帶你洞悉世界的一切」`,
            ``,
            `大門有密碼鎖打不開，需要五位的英文密碼才能打開，但在大門旁好像貼著甚麼東西，過去看看吧？`,
            `~ 找尋大門密碼鎖密碼 ~`,
        ].join("\n")
    );
}

function 光視覺實驗室_answer(message: Message): void {
    if (!progress[message.channelId]["光視覺實驗室"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `實驗室大門能打開了！裡面似乎有張小紙條？`,
            `光這一張紙條好像沒什麼用？先去下一個地點吧！`,
            `_**此為重要線索，請保存好證據**_`,
        ].join("\n"),
        files: ["./assets/Q8.jpg"],
    });

    pretasks_done_2(message);
}

function 歐洲公園(message: Message): void {
    if (!check_pretasks(message.channelId).slice(0, 4).every(Boolean)) {
        message.reply("WTF, how did you get here?");
        return;
    }

    message.reply({
        content: [
            `這個公園真是漂亮呢！`,
            `咦？四周好像圍了一圈數字呢？`,
            `然後樹上同時也貼了兩張小紙條`,
            `把其中一張紙條先填上附近的數字？`,
            `附近同樣有一個小寶盒，嘗試解開它吧`,
            `~ 解開小寶盒 ~`,
            `\`\`\``,
            `1 9 12 3 6 14`,
            `16 8 7 5 `,
            `7 3 8 5`,
            `13 1 4 14 15 11 13`,
            `13 15 2 6 13`,
            `11 13 10 12 6 10`,
            `\`\`\``,
        ].join("\n"),
        files: ["./assets/circle.jpg"],
    });
}

function 歐洲公園_answer(message: Message): void {
    if (!progress[message.channelId]["歐洲公園"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `小寶盒解開了！`,
            `裡面有一張小紙條`,
            `\`\`\`Ｌ_Ｂ_Ａ_Ｙ\`\`\``,
            `感覺還需要一些字母才能湊成字呢 @@`,
            `先去另一個地點看看吧`,
        ].join("\n"),
    });
}

function 誠樓(message: Message): void {
    if (!check_pretasks(message.channelId).slice(4, 8).every(Boolean)) {
        message.reply("WTF, how did you get here?");
        return;
    }

    message.reply({
        content: [
            `總算到誠樓了，我們同樣也在這邊發現了一張紙條`,
            `旁邊放著一個九宮格版，無聊時說不定可以先來投球一下（X`,
            `不對，還是先認真辦案吧`,
            `這邊同樣也有個小寶盒，也被上鎖了，事著打開看看吧！`,
            `~ 解開小寶盒 ~`,
        ].join("\n"),
        files: ["./assets/house.jpg"],
    });
}

function 誠樓_answer(message: Message): void {
    if (!progress[message.channelId]["誠樓"]) {
        message.reply("你在哪個地點？");
        return;
    }
    message.reply({
        content: [
            `小寶盒解開了！`,
            `裡面有一張小紙條`,
            `\`\`\`_Ｉ_Ｒ_Ｒ_\`\`\``,
            `感覺還需要一些字母才能湊成字呢 @@`,
            `先去另一個地點看看吧`,
        ].join("\n"),
    });
}

function 圖書館(message: Message): void {
    if (!progress[message.channelId]["527806"] || !progress[message.channelId]["ntnucsie"]) {
        message.reply("WTF, how did you get here?");
        return;
    }

    message.reply({
        content: [
            `圖書館嗎？！`,
            `我們快點前往那邊吧，說不定蟒蛇就在那裡！`,
            `如果遇到先鋒調查隊員，記得問問看他喔！`,
        ].join("\n"),
    });
}

function 任務進度(message: Message): void {
    const files: string[] = [];

    const done = check_pretasks(message.channelId);

    for (let i = 0; i < 4; i++) {
        if (done[i]) {
            files.push("./assets/Q" + (i + 1) + ".mp3");
        }
    }
    for (let i = 4; i < 8; i++) {
        if (done[i]) {
            files.push("./assets/Q" + (i + 1) + ".jpg");
        }
    }

    const extra =
        +!!progress[message.channelId]["527806"] + +!!progress[message.channelId]["ntnucsie"];

    message.reply({
        content: [
            `已經完成了 **${done.filter((x) => x).length + extra} / ${8 + extra}** 項任務！`,
            extra ? `（包含 ${extra} 個追加任務！）` : "",
        ].join("\n"),
        files,
    });
}

function check_pretasks(
    channel: string
): [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean] {
    return [
        !!progress[channel]["ophiuchus"],
        !!progress[channel]["2739"],
        !!progress[channel]["4619"],
        !!progress[channel]["45"],
        !!progress[channel]["program"],
        !!progress[channel]["use"],
        !!progress[channel]["linux command"],
        !!progress[channel]["debug"],
    ];
}

async function pretasks_done_1(message: Message): Promise<void> {
    if (check_pretasks(message.channelId).slice(0, 4).every(Boolean)) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        message.channel.send(
            [
                `我們總共得到了四個音檔，似乎可以**疊在一起**組成一個位置！`,
                `試試看有沒有辦法組合看看吧！`,
                `> 小提示：可以輸入「任務進度」開啟背包`,
            ].join("\n")
        );
    }
}

async function pretasks_done_2(message: Message): Promise<void> {
    if (check_pretasks(message.channelId).slice(4, 8).every(Boolean)) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        message.channel.send(
            [
                `我們總共得到了四張紙條，似乎可以**拼成一個建築**！`,
                `試試看有沒有辦法組合看看吧！`,
                `> 小提示：可以輸入「任務進度」開啟背包`,
            ].join("\n")
        );
    }
}

function global_stat(message: Message): void {
    const copy = {};
    for (const id in progress) {
        const channel = message.guild?.channels.cache.get(id);
        if (channel) {
            copy[channel.name] = progress[id];
        }
    }
    message.reply([`\`\`\`json`, JSON.stringify(copy, null, 4), `\`\`\``].join("\n"));
}

function reset_global_stat(message: Message): void {
    for (const id in progress) {
        delete progress[id];
    }

    message.reply("已重置全域任務進度");
}
