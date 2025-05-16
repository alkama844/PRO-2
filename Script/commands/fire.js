module.exports.config = {
    name: "Fire",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "nafij",
    description: "Friend-er upor light roast with jokes!",
    commandCategory: "group",
    usages: "@mention",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = async function({ api, event }) {
    const mention = Object.keys(event.mentions)[0];
    if (!mention) return api.sendMessage("Bhai, karo ke mention korte hobe roasting er jonno!", event.threadID);

    const name = event.mentions[mention];
    const arraytag = [{ id: mention, tag: name }];

    const send = (msg, delay) => {
        setTimeout(() => {
            api.sendMessage({ body: msg, mentions: arraytag }, event.threadID);
        }, delay);
    };

    send(`Oi ${name}, tomar smartness dekhe mirror-o shorom pai!`, 1000);
    send(`${name} er brain er speed — Windows XP er moto... hang-e thake!`, 3000);
    send(`${name} jokhon mathay plan ney, Google-o confused hoye jai.`, 5000);
    send(`Tui etto single je, Google search korleo "relationship not found" dey!`, 7000);
    send(`${name} jokhon chinta kore, duniya e load shedding hoye jai.`, 9000);
    send(`Eto joke koros je, Raju Srivastav-o retire korte chaisilo!`, 11000);
    send(`${name} er logic — calculator-o error dey!`, 13000);
    send(`Aro roast chai? Wait kor, bot-er CPU gorom hoite se!`, 15000);
};