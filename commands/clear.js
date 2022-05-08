const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`❌ | I couldn't delete those messages, because you do not have the correct permissions (MANAGE_MESSAGES) to do this!`);

    if (!args[0]) return message.channel.send(`❌ | Pls define the number of messages to delete!`);

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => { });

            message.channel.send(`☑️ | **${message.author} deleted ${amount - 1} messages**!`).then(msg => msg.delete({ timeout: 3000 }));

    } else {
        return message.channel.send(`❌ | Pls define the amount of messages to delete!`)
        .catch(err => message.channel.send(`❌ | Error: There went something wrong! (**${err}**)`));
    }
  }

  module.exports.help = {
    name: "clear"
}