const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {

    message.channel.messages.fetch()
    .then(messages => {
      var text;
      for (let [key, value] of messages) {
        const date = new Date(value.createdTimestamp);
        let dateString = `${date.getDate()}/${date.getMonth()} ${date.getHours()}h ${date.getMinutes()}m`;
        text += `${dateString} | [${value.guild.name}] #${value.channel.name} >> ${value.author.tag}: ${value.content}\n`
      }

      fs.writeFile("transcript.txt", text, (err) => {
        if(err) console.log(err);
      });
    });
  }

  module.exports.help = {
    name: "test2"
}