var tmi = require("tmi.js");

var channel = "TTDBot";

const notifier = require('node-notifier');

var followme = "";

var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "Phycoery",
        password: "oauth:..."
    },
    channels: [channel]
}

var client = new tmi.client(options);
client.connect();

var listentoanyone = true;
var followothers = true;

client.on('connected', function(address, port) {
    //client.action("sylph96", "hi")
});

client.on("whisper", function (from, userstate, message, self) {
    if (message.startsWith("say ") && from == "#sylph96"){
        client.say(channel, message.split("say ")[1]);
        return;
    }
    if (self || message.includes("kick") || (message.includes("learn") && !(from == "#sylph96"))) return;
    if (from == "#ttdbot") client.say(channel, message);
    if (!message.includes("!socket") && (!message.includes("!spec") || message == "!specs") && from != "#ttdbot") client.whisper("ttdbot", message);
});

client.on('chat', function(channel, user, message, self){
    if (self || message.includes("xx") || message.includes("kick") || message.includes("learn") || message.includes("hire")) return;
    if (message.includes("sylph")) notifier.notify('you were mentioned');
    if ((!message.includes("!socket") && !message.includes("!spec")) || user['display-name'] == "syLph96"){
        if (message == "?dontfollowme" && followme == user['display-name']) {
            followme = "";
        } else if(user['display-name'] == followme) {
            client.whisper("ttdbot", message);
        }
        if(message.startsWith("?altars")){
            client.say(channel, "http://www.streamdefense.com/altars/");
        }
        else if(message.startsWith("?panic")){
            client.say(channel, "@ArchonTheWizard @ArchonTheWizard @ArchonTheWizard panicBasket panicBasket panicBasket panicBasket panicBasket panicBasket");
        }
        else if(message.startsWith("?classes")){
            client.say(channel, "http://www.streamdefense.com/classes/");
        }
        else if(message.startsWith("?essence")){
            client.say(channel, "https://docs.google.com/spreadsheets/d/16I4alWO2cqC2BzFbw_TGASTH_QcdRfM0jfHNen8bl1I/edit#gid=0");
        }
        else if(message.startsWith("?gems")){
            client.say(channel, "http://www.streamdefense.com/gems");
        }
        else if(message.startsWith("?classdata")){
            client.say(channel, "https://docs.google.com/spreadsheets/d/1-8EfwrWsItJKr7wEfs4PuoLaO1hpE3JdUsCU9u66qTw/edit#gid=0");
        }
        else if(message.startsWith("?trapper")){
            client.say(channel, "http://www.streamdefense.com/trapper/");
        }
        else if(message.startsWith("?howtoplay")){
            client.say(channel, "http://www.streamdefense.com/how-to-play/");
        }
        else if(message.startsWith("?rebirth")){
            client.say(channel, "When a player visits the Rebirth Altar, their experience will be drained, taking them back to level 1.  However, for the rest of the game, they will receive 5% of the experience drained after every wave.  Players can revisit the altar as often as they'd like - increasing how much experience they earn at the end of each wave.");
        }
        else if(message.startsWith("?wisdom")){
            client.say(channel, "The Altar of Wisdom is very powerful, but can only be used ONCE per player (per game).  Upon visiting the altar, the player's level will increase dramatically.  Their level will be increased by 50% + 10.  Therefore: A level 1 visiting the altar would become level 12.  A level 25 visiting the altar would become level 48. To balance this dramatic increase in levels, the experience required to level-up is doubled (on this map only).");
        }
        else if(message.startsWith("?challenge")){
            client.say(channel, "Only one player can enter the Challenge Altar at a time.  Upon entering, a small wave of enemies will spawn and walk towards the tower.  If the player can defeat all the enemies before they reach the tower, they will be rewarded with a large sum of XP.");
        }
        else if(message.startsWith("?lava")){
            client.say(channel, "When a player visits the Lava Altar their power will be drained very quickly. While their power is drained, the path will turn into lava, dealing damage to all enemies on the screen. If one or more of the crystals is glowing red, the player also has a chance to summon lava elementals. If the large crystal at the top of the map is glowing red, you might summon the big golem instead of an elemental.");
        }
        else if(message.startsWith("?controller")) {
            client.say(channel, "http://www.streamdefense.com/stream-defense-controller/");
        }
        else if(message.startsWith("?highpriest")) {
            client.say(channel, "http://www.streamdefense.com/highpriest/");
        }
        else if(message.startsWith("?commands")){
            client.say(channel, "?howtoplay ?progression ?bounty ?altars (?lava ?rebirth ?wisdom ?challenge) ?classes ?highpriest ?trapper ?essence ?gems ?classdata ?expstats ?controller");
        }
        else if(message.includes("p!") && !message.includes("!p!")) {
            if(listentoanyone || user.mod) client.whisper("TTDBot", "!" + message.split("p!")[1]);
        }
        else if(message == "?followme" && followothers) {
            followme = user['display-name'];
        }
        else if(message == "?listentoanyone" && user.mod) {
            listentoanyone = true;
        }
        else if(message == "?dontlistentoothers" && user.mod) {
            listentoanyone = false;
        }
        else if(message == "?followothers" && user.mod) {
            followothers = true;
        }
        else if(message == "?dontfollowothers" && user.mod) {
            followothers = false;
            followme = "";
        }
        else if(message == "BOSS INCOMING! Type !fill to move to the closest tower!" && user.mod) {
            notifier.notify('boss coming');
        }
        else if(message.includes("NEXT WAVE #1:") && user.mod) {
            notifier.notify('new game started');
        }
        else if(message.includes("?idiots")) {
            client.say(channel, "guuuuys... I CANT EEEEBEN BrokeBack NotLikeThis FailFish BrokeBack NotLikeThis FailFish BrokeBack NotLikeThis FailFish");
        }
        else if(message.startsWith("?progression")) {
            client.say(channel, "http://www.streamdefense.com/huge-class-progression-update-details/");
        }
        else if(message.startsWith("?bounty")) {
            client.say(channel, "http://www.streamdefense.com/bounties/");
        }
        else if(message.startsWith("?expstats")) {
            client.say(channel, "https://docs.google.com/spreadsheets/d/1f6oyKASgX48UNNSbk2vtNG2MqmTPWgWQFAftBV7ufmw/edit?usp=sharing");
        }
    }
});