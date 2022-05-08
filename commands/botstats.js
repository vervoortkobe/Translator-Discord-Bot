const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

    const botstatsEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`🤖 | ${client.user.username} Botstats`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Hey, I'm ${client.user.username}! Here you can find my stats:`)
    .addField(`Servers`, `Serving \`${client.guilds.cache.size}\` servers!`, true)
    .addField(`Users`, `Serving \`${client.users.cache.size}\` users!`, true)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(botstatsEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "botstats"
}