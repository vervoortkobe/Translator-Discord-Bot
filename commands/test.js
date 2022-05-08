const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

    const spinPic = new Discord.MessageAttachment(`https://tsunami-api.glitch.me/?accesstoken=dF41Ap7xq5s3&event=leave&background=2&text=Bye&username=${message.author.username}&discriminator=${message.author.discriminator}&membercount=${message.guild.memberCount}&avatar=${message.author.displayAvatarURL().split(".webp")[0] + ".png"}`, "join.png");

    const spinEmbed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setTitle(`🔄 | ${client.user.username} Spin`)
    .attachFiles(spinPic)
    .setImage('attachment://join.png')
    .setFooter(`© ${client.user.username} was made by Tsunami#6271`)
    .setTimestamp()
    message.channel.send(spinEmbed);
  }

  module.exports.help = {
    name: "test"
}