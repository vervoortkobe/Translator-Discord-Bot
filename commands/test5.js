const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
 
    const embed = new Discord.MessageEmbed()
    .setTitle("Help 1")
    .setDescription("help1 test")
    message.channel.send(embed)
    .then(m => {
      m.react("◀️");
      m.react("▶️")
    });
  }

  module.exports.help = {
    name: "test5"
}