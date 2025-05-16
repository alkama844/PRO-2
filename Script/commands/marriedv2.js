module.exports.config = {
    name: "marriedv2",
    version: "3.1.1",
    hasPermssion: 0,
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "Married couple photo with tag or reply",
    commandCategory: "img",
    usages: "[@mention or reply]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async () => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'marriedv02.png');
    if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.ibb.co/mc9KNm1/1619885987-21-pibig-info-p-anime-romantika-svadba-anime-krasivo-24.jpg", path);
};

async function makeImage({ one, two }) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"];
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    const background = await jimp.read(__root + "/marriedv02.png");
    const outputPath = __root + `/marriedv2_${one}_${two}.png`;
    const avatarOne = __root + `/avt_${one}.png`;
    const avatarTwo = __root + `/avt_${two}.png`;

    const getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

    const getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

    const circleOne = await jimp.read(await circle(avatarOne));
    const circleTwo = await jimp.read(await circle(avatarTwo));

    background
        .composite(circleOne.resize(100, 100), 55, 48)
        .composite(circleTwo.resize(100, 100), 190, 40);

    const raw = await background.getBufferAsync("image/png");
    fs.writeFileSync(outputPath, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);

    return outputPath;
}

async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID, mentions, messageReply } = event;

    let one = senderID;
    let two = null;

    if (Object.keys(mentions).length > 0) {
        two = Object.keys(mentions)[0];
    } else if (messageReply) {
        two = messageReply.senderID;
    }

    if (!two) return api.sendMessage("Please tag or reply to the person you want to marry.", threadID, messageID);

    return makeImage({ one, two }).then(path => {
        api.sendMessage({
            body: "Congratulations! You're now married.\nCherish each other forever!",
            attachment: fs.createReadStream(path)
        }, threadID, () => fs.unlinkSync(path), messageID);
    });
};