const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.channel.send(`❌ | Please connect to a voice channel first!`);
    
    if (!message.guild.voiceConnection) {
      let connection = await message.member.voice.channel.join();
      let dispatcher = await connection.play("http://stream.trap.fm:6002/", { filter: "audioonly" });

      const trapfmEmbed = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`:white_check_mark::headphones: | Now streaming TrapFM!`)
      .setDescription(`Streaming in ${message.member.voice.channel}\nYou can get a live playlist [here](http://trap.fm/tracklist/)!`)
      .setFooter(`mp3`)
      .setTimestamp()
      message.channel.send(trapfmEmbed);
    } else {
      message.channel.send(`:x: | I'm already streaming radio!`);
     }
  }

  module.exports.help = {
    name: "music"
}