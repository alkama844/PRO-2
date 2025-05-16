module.exports.config = {
	name: "marry",
	version: "2.0.0",
	hasPermssion: 0,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "Get married",
	commandCategory: "Love",
	usages: "[tag or reply]",
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
	const path = resolve(__dirname, 'cache/canvas', 'marrywi.png');
	if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });
	if (!existsSync(path)) await downloadFile("https://i.imgur.com/4ATHG80.png", path);
};

async function makeImage({ one, two }) {
	const fs = global.nodemodule["fs-extra"];
	const path = global.nodemodule["path"];
	const axios = global.nodemodule["axios"];
	const jimp = global.nodemodule["jimp"];
	const __root = path.resolve(__dirname, "cache", "canvas");

	let marryImg = await jimp.read(__root + "/marrywi.png");
	let pathImg = __root + `/marry_${one}_${two}.png`;
	let avatarOne = __root + `/avt_${one}.png`;
	let avatarTwo = __root + `/avt_${two}.png`;

	let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

	let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
	fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

	let circleOne = await jimp.read(await circle(avatarOne));
	let circleTwo = await jimp.read(await circle(avatarTwo));
	marryImg.resize(432, 280).composite(circleOne.resize(60, 60), 200, 23).composite(circleTwo.resize(60, 60), 136, 40);

	let raw = await marryImg.getBufferAsync("image/png");

	fs.writeFileSync(pathImg, raw);
	fs.unlinkSync(avatarOne);
	fs.unlinkSync(avatarTwo);

	return pathImg;
}

async function circle(image) {
	const jimp = require("jimp");
	image = await jimp.read(image);
	image.circle();
	return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api }) {
	const fs = global.nodemodule["fs-extra"];
	const { threadID, messageID, senderID, messageReply, mentions } = event;

	let one = senderID;
	let two = null;

	if (Object.keys(mentions).length > 0) {
		two = Object.keys(mentions)[0];
	} else if (messageReply) {
		two = messageReply.senderID;
	}

	if (!two) return api.sendMessage("Please tag or reply to someone you want to marry.", threadID, messageID);

	return makeImage({ one, two }).then(path =>
		api.sendMessage({
			body: "Bae, please give me a chance to be with you for the rest of my life.\nI love you so much 💟💟",
			attachment: fs.createReadStream(path)
		}, threadID, () => fs.unlinkSync(path), messageID)
	);
};