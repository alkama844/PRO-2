const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
    name: "help3",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "NAFIJ PRO",
    description: "FREE SET-UP MESSENGER",
    commandCategory: "system",
    usages: "[Name module]",
    cooldowns: 5,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.languages = {
    "en": {
        "moduleInfo": "╭──────•◈•──────╮\n |        𝗜𝘀𝗹𝗮𝗺𝗶𝗰 𝗰𝗵𝗮𝘁 𝗯𝗼𝘁\n |●𝗡𝗮𝗺𝗲: •—» %1 «—•\n |●𝗨𝘀𝗮𝗴𝗲: %3\n |●𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: %2\n |●𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n |●𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5s\n |●𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n |𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆: %7\n╰──────•◈•──────╯",
        "helpList": '[ There are %1 commands. Use: "%2help nameCommand" to see usage! ]',
        "user": "Everyone",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
    }
};

module.exports.handleEvent = async ({ api, event, getText }) => {
    const { commands } = global.client;
    const { threadID, messageID, body } = event;
    if (!body || !body.toLowerCase().startsWith("help")) return;

    const args = body.split(/\s+/);
    if (args.length < 2) return;
    const cmdName = args[1].toLowerCase();
    if (!commands.has(cmdName)) return;

    const command = commands.get(cmdName);
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const prefix = threadSetting.PREFIX || global.config.PREFIX;

    return api.sendMessage(getText("moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${command.config.usages || ""}`,
        command.config.commandCategory,
        command.config.cooldowns,
        getText("user"),
        command.config.credits
    ), threadID, messageID);
};

module.exports.run = async ({ api, event, args, getText }) => {
    const { threadID, messageID } = event;
    const { commands } = global.client;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
    const prefix = threadSetting.PREFIX || global.config.PREFIX;

    const imgLink = "https://i.postimg.cc/d03CpP09/file-000000009230622f91a4907f4ea479b8.png";
    const imgPath = `${__dirname}/cache/helpimage.png`;

    if (args[0] === "all") {
        const group = [];
        for (const [, commandConfig] of commands) {
            const cat = commandConfig.config.commandCategory.toLowerCase();
            const existingGroup = group.find(g => g.group === cat);
            if (existingGroup) {
                existingGroup.cmds.push(commandConfig.config.name);
            } else {
                group.push({ group: cat, cmds: [commandConfig.config.name] });
            }
        }

        let msg = "";
        group.forEach(g => {
            msg += `❄️ ${g.group.charAt(0).toUpperCase() + g.group.slice(1)}\n${g.cmds.join(' • ')}\n\n`;
        });

        request(imgLink).pipe(fs.createWriteStream(imgPath)).on("close", () => {
            api.sendMessage({
                body: `✿🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃✿\n\n${msg}✿══════════════✿\n│𝗨𝘀𝗲 ${prefix}help [Name?]\n│𝗨𝘀𝗲 ${prefix}help [Page?]\n│𝗢𝗪𝗡𝗘𝗥 : NAFIJ PRO\n│𝗧𝗢𝗧𝗔𝗟 : ${commands.size}\n————————————`,
                attachment: fs.createReadStream(imgPath)
            }, threadID, (err, info) => {
                fs.unlinkSync(imgPath);
                if (!autoUnsend) return;
                setTimeout(() => api.unsendMessage(info.messageID), delayUnsend * 1000);
            }, messageID);
        });
        return;
    }

    if (!args[0] || isNaN(args[0])) {
        const page = 1;
        const perPage = 15;
        const cmdList = Array.from(commands.keys()).sort();
        const maxPage = Math.ceil(cmdList.length / perPage);
        const listPage = cmdList.slice(0, perPage);

        request(imgLink).pipe(fs.createWriteStream(imgPath)).on("close", () => {
            const commandList = listPage.map(cmd => `•—»[ ${cmd} ]«—•`).join("\n");
            const body = `╭──────•◈•──────╮\n |        𝗜𝘀𝗹𝗮𝗺𝗶𝗰𝗸 𝗰𝗵𝗮𝘁 𝗯𝗼𝘁 \n |   🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃       \n╰──────•◈•──────╯\n\n${commandList}\n╭──────•◈•──────╮\n│𝗨𝘀𝗲 ${prefix}help [Name?]\n│𝗨𝘀𝗲 ${prefix}help [Page?]\n│𝗢𝗪𝗡𝗘𝗥 : NAFIJ PRO\n│𝗧𝗢𝗧𝗔𝗟 : [${cmdList.length}]\n│📛🄿🄰🄶🄴📛 : [${page}/${maxPage}]\n╰──────•◈•──────╯`;

            api.sendMessage({ body, attachment: fs.createReadStream(imgPath) }, threadID, () => {
                fs.unlinkSync(imgPath);
            }, messageID);
        });
        return;
    }

    const cmdName = args[0].toLowerCase();
    const command = commands.get(cmdName);
    if (!command) return api.sendMessage(`Command "${cmdName}" not found.`, threadID, messageID);

    const info = getText("moduleInfo",
        command.config.name,
        command.config.description,
        `${command.config.usages || ""}`,
        command.config.commandCategory,
        command.config.cooldowns,
        getText("user"),
        command.config.credits
    );

    request(imgLink).pipe(fs.createWriteStream(imgPath)).on("close", () => {
        api.sendMessage({ body: info, attachment: fs.createReadStream(imgPath) }, threadID, () => {
            fs.unlinkSync(imgPath);
        }, messageID);
    });
};