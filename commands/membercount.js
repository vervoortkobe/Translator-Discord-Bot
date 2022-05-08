const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
  
    let onlineCount = message.guild.members.cache.filter(member => member.presence.status === 'online').size;
    let idleCount = message.guild.members.cache.filter(member => member.presence.status === 'idle').size;
    let dndCount = message.guild.members.cache.filter(member => member.presence.status === 'dnd').size;
    let offlineCount = message.guild.members.cache.filter(member => member.presence.status === 'offline').size;

    const membercountEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`📊 | ${client.user.username} Membercount`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`**Membercount of** \`${message.guild.name}\``)
    .addField(`Total Count`, `\`${message.guild.memberCount}\` Members`, true)
    .addField(`Human Count`, `\`${message.guild.memberCount - message.guild.members.cache.filter(member => member.user.bot).size}\` Humans`, true)
    .addField(`Bot Count`, `\`${message.guild.members.cache.filter(member => member.user.bot).size}\` Bots`, true)
    .addField(`Online | Idle | DND | Offline`, `\`${onlineCount}\` | \`${idleCount}\` | \`${dndCount}\` | \`${offlineCount}\``, true)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(membercountEmbed)
    .then(message.react("📊"));
  }

  module.exports.help = {
    name: "membercount"
}