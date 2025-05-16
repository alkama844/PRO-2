module.exports.config = {
    name: "propose",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "NAFIJ PRO",
    description: "NAFIJPRO😐🐥",
    commandCategory: "fun",
    usages: "propose",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    const pickupLines = [
        "Tumi ki calculator? Tomar chokh dekhlei amar matha ghure jai!",
        "Tumi ki charger? Tomake chara ami charge hoy na!",
        "Tumi jodi chocolate ho, ami sugar patient hoyeo khai!",
        "Tumi ki traffic signal? Tomake dekhe amar sob thame jai!",
        "Tumi ki WiFi? Tomar ashe-pashe gelei signal strong lage.",
        "Tumi ki Google? Tomar moddhei amar sob question er answer.",
        "Tumi ki ekta song? Tomake shune amar mood fresh hoy.",
        "Tumi ki fan? Tomar kotha sunei mon thanda hoye jai.",
        "Tumi ki light? Tomar hashi amar raat ke roshni kore.",
        "Tumi jodi ekta dream ho, ami everyday ghumate chai.",
        "Tumi ki umbrella? Tomar satha thaklei ami safe.",
        "Tumi ki ekta charger? Battery low holei tomar dorkar hoy!",
        "Tumi ki clock? Tomake chara time slow lage.",
        "Tumi ki GPS? Ami tomake follow korei right destination e ashbo.",
        "Tumi ki ekta note? Tomake miss korlei mon kharap lage.",
        "Tumi ki ekta drawing? Tomar moto shundor kichu ami dekhi nai.",
        "Tumi ki mirror? Tomay dekhei nijeke valo lage.",
        "Tumi ki ekta movie? Tomake ami repeat e dekhte pari.",
        "Tumi ki rainbow? Tomar vitor sob color ache.",
        "Tumi ki coffee? Tomar sathe din shuru korte bhalo lage.",
        "Tumi ki ekta password? Tomar kotha chara ami login korte pari na.",
        "Tumi ki ekta camera? Tomar samne amar smile automatic chole ase.",
        "Tumi ki ekta song? Ami tomar replay chai every time.",
        "Tumi ki ekta keyboard? Tomar chara amar feelings type hoy na.",
        "Tumi ki ekta cloud? Tomar satha thaklei ami float kori.",
        "Tumi ki ekta churi? Tomar chokh amar mon churi koreche.",
        "Tumi ki ekta magnet? Ami automatically tomar dike aschi.",
        "Tumi ki ekta sunrise? Tomay dekhei amar din ta bright hoy.",
        "Tumi ki ekta pen? Tomar chara amar golpo adhoora.",
        "Tumi ki ekta chocolate? Tomay khelei life mishti lage.",
        "Tumi ki ekta pillow? Tomar kache gelei shanti lage.",
        "Tumi ki ekta flower? Tomar presence e sob kichu blooming lage.",
        "Tumi ki ekta rocket? Tomay dekhlei amar heart launch kore.",
        "Tumi ki ekta smile emoji? Tomar kotha mone porlei hasi ashe.",
        "Tumi ki ekta puzzle? Tomar chara ami incomplete.",
        "Tumi ki ekta heart beat? Tomar jonnoi ami bachi.",
        "Tumi ki ekta candle? Tomar aloye amar raat jagche.",
        "Tumi ki ekta note? Tomar namer melody amar mon e bajche.",
        "Tumi ki ekta moon? Tomar alo te amar mon porishkar hoy.",
        "Tumi ki ekta sunrise? Everyday tomar moto shuru korte chai.",
        "Tumi ki ekta hug? Tomar kache gelei stress dure jay.",
        "Tumi ki ekta mobile? Tomar satha kono moment miss korte chai na.",
        "Tumi ki ekta dream girl? Tomar kotha amar shopno te ashe.",
        "Tumi ki ekta rain? Tomar satha bheje porlei moja lage.",
        "Tumi ki ekta smile? Tomay dekhei amar stress chole jai.",
        "Tumi ki ekta light? Tomar chhaya te ami shanti pai.",
        "Tumi ki ekta melody? Tomay shunei ghum ashe.",
        "Tumi ki ekta diary? Tomar vitor ami sob rakhte chai.",
        "Tumi ki ekta stethoscope? Tomar satha amar heart beat fast hoy!",
        "Tumi ki ekta ice cream? Tomar moto mishti keu nai!"
    ];

    for (let i = 0; i < pickupLines.length; i++) {
        setTimeout(() => {
            api.sendMessage(pickupLines[i], event.threadID);
        }, i * 1000); // 1 second interval
    }
};