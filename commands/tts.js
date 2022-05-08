const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

const discordTTS = require("discord-tts");
const ffmpeg = require("ffmpeg-static");
const opus = require("opusscript");

module.exports.run = async (client, message, args) => {

  if(!args[0]) return message.channel.send("no args");
  
    const broadcast = client.voice.createBroadcast();

    var channelId = message.member.voice.channelID;

    var channel = client.channels.cache.get(channelId);

    channel.join().then(connection => {

      broadcast.play(discordTTS.getVoiceStream(args.join(" ")));

      const dispatcher = connection.play(broadcast);

    });
  }
  
  module.exports.help = {
    name: "tts"
  }