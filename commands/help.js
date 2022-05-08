const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
    
    if(message.author.id === `383332117188444160`) {
      
    const helpOwnerEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Here are my commands:`)
    .addField(`Moderation (1)`, `\`${prefix}clear\``)
    .addField(`Configuration (2)`, `\`${prefix}autotranslate\`, \`${prefix}prefix\``)
    .addField(`Translation (1)`, `\`translate\``)
    .addField(`Other (2)`, `\`${prefix}membercount\`, \`${prefix}ping\``)
    .addField(`About (2)`, `\`${prefix}botstats\`, \`${prefix}invite\``)
    .addField(`Owner (2)`, `\`${prefix}createinv\`, \`${prefix}serverlist\``)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(helpOwnerEmbed)
    .then(message.react("🤖"));
      
  } else {
    
    const helpEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(`🤖 | ${client.user.username} Help`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Here are my commands:`)
    .addField(`Moderation (1)`, `\`${prefix}clear\``)
    .addField(`Configuration (2)`, `\`${prefix}autotranslate\`, \`${prefix}prefix\``)
    .addField(`Translation (1)`, `\`translate\``)
    .addField(`Other (2)`, `\`${prefix}membercount\`, \`${prefix}ping\``)
    .addField(`About (2)`, `\`${prefix}botstats\`, \`${prefix}invite\``)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(helpEmbed)
    .then(message.react("🤖"));
    }
  }

  module.exports.help = {
    name: "help"
}