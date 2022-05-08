const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

    message.channel.messages.fetch("802982954396680213")
    .then(m => {
      console.log(m.embeds[0].description)
    }).catch(err => console.log(err));
  }

  module.exports.help = {
    name: "test1"
}