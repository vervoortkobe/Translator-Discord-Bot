const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args) => {
  
    message.react("🏓");
    const m = await message.channel.send("> ⚙️ | Calculating...");
    m.edit(`> 🏓 | **Pong!**\n> 🤖 | Latency: \`${m.createdTimestamp - message.createdTimestamp}\`ms,\n> 🖥️ | Discord API: \`${Math.round(client.ws.ping)}\`ms!`);
  }

  module.exports.help = {
    name: "ping"
}