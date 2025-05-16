const fs = require("fs");

module.exports.config = {
	name: "gali",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "prov2", 
	description: "Detects Bangla & Banglish slang (no prefix needed)",
	commandCategory: "no prefix",
	usages: "bad word",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	const { threadID, messageID, body } = event;
	if (!body) return;

	const slangs = [
		"boka", "haraamzada", "fuck", "chudi", "chod", "madarchod", "boner baccha",
		"tor maa", "tor bon", "bhod", "maa ke", "gandu", "lund", "banchod", "bokachoda",
		"gandu", "jhatu", "choda", "bitch", "mc", "bc", "behenchod", "chut", "jhogra",
		"magi", "tor bou", "🖕"
	];

	const lowerBody = body.toLowerCase();
	if (slangs.some(word => lowerBody.includes(word))) {
		const msg = {
			body: "⚠️ ভাই/আপু, গালি কেন দিচ্ছেন? একটু ভদ্রভাবে কথা বলুন।"
		};
		api.sendMessage(msg, threadID, messageID);
	}
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
	// No need to implement this since it's a no-prefix listener
};