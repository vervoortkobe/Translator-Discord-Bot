const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
  
  const inviteEmbed = new Discord.MessageEmbed()
  .setColor()
  .setTitle(`🤖 | ${client.user.username} Invite`)
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`You can invite ${client.user.username} [here](https://rexbot.ga/translatorbot-invite)!`)
  .setFooter(`${prefix} | ${client.user.username}`)
  .setTimestamp()
  message.channel.send(inviteEmbed)
  .then(message.react("🤖"));
}

  module.exports.help = {
    name: "invite"
}