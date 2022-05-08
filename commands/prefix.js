const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.PREFIX;
const color = process.env.COLOR;

module.exports.run = async (client, message, args, prefix) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`❌ | I couldn't change my prefix, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    if(!args[0] || !args[1]) { 
      const prefixUsageEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`⚙️ | ${client.user.username} Prefix`)
      .setDescription(`Usage: **${prefix}prefix set <new prefix>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      return message.channel.send(prefixUsageEmbed);
    }

    if(args[0] === `set`) {

      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

      prefixes[message.guild.id] = {
          prefixes: args[1]
      };

      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
      });

      const prefixEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(`⚙️ | ${client.user.username} Prefix`)
      .setDescription(`✅ | My prefix has been set to: **${args[1]}**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(prefixEmbed)
      .then(message.react("⚙️"));
    }
  }

  module.exports.help = {
    name: "prefix"
}