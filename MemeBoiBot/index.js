const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const ytdl = require('ytdl-core');
const prefix = "m!"
const version = "0.1.0"
const dnesov = "dnesov.js#9358"
const superagent = require("superagent");
var commandsList = fs.readFileSync("./commands.txt", "utf8")

const fortunes = [
    "Yes",
    "Definitely yes!",
    "Of course!",
    "Vsauce says yes",
    "Probably",
    "Maybe",
    "No",
    "I don't think so",
    "idk",
    "never",
    "We will see...",
    "Haha, that sounds so funny! :D",
    "I'm not sure",
    "Lemme ask Vsauce..."
]
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus("dnd")
  bot.user.setGame("MemeBoi | use m!help for help")
});

bot.on('message', message => {
    if(message.author.equals(bot.user)) return;

    if(message.author.dmChannel) return;

    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ")

    switch (args[0]) {
        case "ping":
        message.channel.send("Pong!");
        break;

        case "botinfo":
        message.channel.send("*Hello :wave: ur running ``Meme Boi "+version+"`` written by dnesov. Have fun!*");
        break;

        case "8ball":
        if(args.length > 2) {
            message.channel.send("My prediction is:``` "+fortunes[Math.round(Math.random()*(fortunes.length - 1))]+"```")
        } else {
            message.channel.send("***OOF*** not enough info to predict!")
        }
        break;

        case "setgame":
        if((args.length > 1) && (message.author.tag == dnesov)) {
            args.shift()
            bot.user.setGame(args.join(" "))
            message.channel.send("Now playing ``"+ args.join(" ")+"``")
        } else {
            message.channel.send("Only bot author can use that.")
        }
        break;
        
        case "help":
            message.author.send(commandsList)
        break;

        case "prefix":
        message.channel.send("Current prefix is: ``"+ prefix+"``")
        break;
        
        case "vs":
        if (args.length === 3) {
            message.channel.send(args[1]+" VS "+ args[2])
            message.channel.send("I think that **"+ args[Math.round(Math.random()) + 1]+ "** is better")
        } else {
            message.channel.send("Not enough arguments!")
        }
        break;

        case "report":
        if (args.length > 2) {
            args.shift()
            message.channel.send("Temporary disabled.")
        } else {
            //message.channel.send("***OOF*** not enough arguments or permissions! ``report [user tag] [reason]``")
        }
        break;

        case "contact":
        if (args.length > 1) {
            args.shift()
            bot.channels.get("468387710202281986").send("<@283551477748727809> A contact message by **"+ message.author.tag+"**: "+args.join(" "))
            message.author.send("Your contact message was succesfully delivered.")
        }   
        break;

        case "clear":
        if (message.member.hasPermission("MANAGE_MESSAGES") && args[1]) {
            message.channel.send("***LOOKS LIKE IT'S SWEEPIN' TIME!***")
            message.channel.bulkDelete(Math.min(args[1], 100)).then(() => {
                message.channel.send("**Done** :ok_hand: i've cleared "+args[1]+" messages!")
            });
        } else {
            message.channel.send("***OOF*** i don't know how many i should delete!")
        }
        break;

        case "stats":
        message.channel.send("**RUNNING ON:** " + bot.guilds.size+" servers.\n"+"**CHANNEL COUNT:** "+bot.channels.size+" channels.")
        break;

        default:
        message.channel.send("***OOF!*** this command does not exist!")
    }  
});

bot.login('NDY4MTM5NTc5MTU3Nzc0MzM4.Di01OA.7pBQY_LL7mLdwcFK62blItftGaw');